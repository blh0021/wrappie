const http = require("http");
const { emitWarning } = require("process");

function testdata(p) {
  switch (p.Name) {
    case "/path/to/aws_env":
      return {
        Parameter: {
          Value: "123456",
        },
      };
      break;
    default:
      return {};
  }
}

http
  .createServer((req, res) => {
    try {
      if (req.method == "POST") {
        let body = "";

        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", () => {
          console.log(body);
          let dr = testdata(JSON.parse(body));
          res.write(JSON.stringify(dr));
          res.end();
        });
      } else {
        res.write("{}");
        emitWarning.end();
      }
    } catch (e) {}
  })
  .listen(3232);
