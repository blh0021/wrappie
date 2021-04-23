const Wrappie = require("../lib/wrappie");

describe("Simple Commands", () => {
  it("executeCommand Should echo test should exit 0", () => {
    let d = [];

    // $ echo "test"

    let params = {
      command: "echo",
      commandTail: ['"test"'],
      envFile: {},
      quiet: true,
    };

    let wrappie = new Wrappie(params);

    return wrappie.executeCommand().then((p) => {
      expect(p.code).toBe(0);
    });
  });

  it("executeCommand Should echo test", () => {
    let d = [];

    // $ echo "test"

    let params = {
      command: "echo",
      commandTail: ['"test"'],
      envFile: {},
      quiet: true,
    };

    let wrappie = new Wrappie(params);

    return wrappie.executeCommand().then((p) => {
      expect(p.data).toContain("test");
    });
  });

  it("environmentBuilder Should echo test", () => {
    let d = [];

    // $ echo "environment builder"

    let params = {
      command: "echo",
      commandTail: ['"environment builder"'],
      envFile: {},
      quiet: true,
    };

    let wrappie = new Wrappie(params);

    return wrappie.environmentBuilder().then((p) => {
      expect(p.data).toContain("environment builder");
    });
  });
});
