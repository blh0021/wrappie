const Wrappie = require("../lib/wrappie");

describe("AWS Environment Variables Simple Commands", () => {
  it("should get variable from aws ssm", () => {
    let params = {
      command: "env",
      commandTail: [],
      envFile: {
        AWS_ENV: {
          type: "ssm",
          path: "/path/to/aws_env",
        },
      },
      quiet: true,
      endpoint: "http://127.0.0.1:3232",
    };

    let ssmparams = {
      Name: params.envFile["AWS_ENV"].path,
      WithDecryption: true,
    };

    let wrappie = new Wrappie(params);

    return wrappie.getParameter(ssmparams).then((p) => {
      expect(p.Parameter.Value).toBe("123456");
    });
  });

  it("should get variable from aws ssm in environment variables", () => {
    let params = {
      command: "env",
      commandTail: [],
      envFile: {
        AWS_ENV: {
          type: "ssm",
          path: "/path/to/aws_env",
        },
      },
      quiet: true,
      endpoint: "http://127.0.0.1:3232",
    };

    let wrappie = new Wrappie(params);

    return wrappie.environmentBuilder(params).then((p) => {
      expect(p.data).toContain("AWS_ENV=123456");
      expect(p.code).toBe(0);
    });
  });
});
