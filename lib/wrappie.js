const AWS = require("aws-sdk");

const { spawn } = require("child_process");

class Wrappie {
  constructor(params) {
    this.wrappieParams = params;
    this.command = params.command;
    this.envFile = params.envFile;
    this.stdout = "";
  }

  getStdout() {
    return this.stdout;
  }

  executeCommand(environment) {
    const cmdPromise = new Promise((resolve, reject) => {
      const child = spawn(
        this.wrappieParams.command,
        this.wrappieParams.commandTail,
        {
          env: environment,
        }
      );

      child.stdout.on("data", (data) => {
        this.stdout += data;
        if (!this.wrappieParams.quiet) {
          console.log(`${data}`);
        }
      });
      child.stderr.on("data", (data) => {
        this.stdout += data;
        if (!this.wrappieParams.quiet) {
          console.error(`${data}`);
        }
      });
      child.on("close", (code) => {
        resolve({ code: code, data: this.stdout });
      });
    });
    return cmdPromise;
  }

  environmentBuilder() {
    let environment = process.env;
    let keyArr = [];
    let promArr = [];

    Object.keys(this.envFile).forEach((k) => {
      switch (typeof this.envFile[k]) {
        case "string":
          environment[k] = this.envFile[k];
          break;
        case "object":
          let params = {
            Name: this.envFile[k].name,
            WithDecryption: true,
          };


          keyArr.push(k);
          promArr.push(
            this.getParameter(params)
          );
          break;
      }
    });

    return Promise.all(promArr).then((val) => {
      for (let i = 0; i < val.length; i++) {
        environment[keyArr[i]] = val[i].Parameter.Value;
      }
      return this.executeCommand(environment);
    });
  }

  getParameter(params) {
    let ssm;
    if (this.wrappieParams.endpoint) {
      let ep = new AWS.Endpoint(this.wrappieParams.endpoint);
      //console.log(ep)
      ssm = new AWS.SSM({ endpoint: ep });
    } else {
      ssm = new AWS.SSM();
    }

    return ssm
      .getParameter(params)
      .promise()
      .catch((error) => {
        console.log(params.Name);
        console.log(error);
      });
  }

  exec() {
    return this.environmentBuilder();
  }
}

module.exports = Wrappie;
