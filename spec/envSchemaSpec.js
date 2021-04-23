const schema = require("../lib/env.schema.json");
const Validator = require("jsonschema").Validator;
const v = new Validator();

describe("env.json schema", () => {
    beforeEach(() => {
        const matchers = {
            toMatchSchema: (matcherUtil) => {

                return {
                    compare: (actual, expected) => {
                        let result = {};
                        result.pass = actual.errors.length == 0;
                        if (!result.pass) {
                            result.message = `Expected 0 Errors got ${actual.errors.length} \n ${JSON.stringify(actual.errors, null, 2)}`
                        }
                        return result;
                    }
                }
            },
            toFailSchema: (matcherUtil) => {

                return {
                    compare: (actual, expected) => {
                        let result = {};
                        result.pass = actual.errors.length > 0;
                        if (!result.pass) {
                            result.message = `Expected More than 0 Errors got ${actual.errors.length} \n ${JSON.stringify(actual.errors, null, 2)}`
                        }
                        return result;
                    }
                }
            }
        }

        jasmine.addMatchers(matchers);
    })

  it("empty json should be valid", () => {
    let env = {};
    let res = v.validate(env, schema);
    expect(res).toMatchSchema();
  });

  it("env with number should be valid", () => {
    let env = {
      num: 1,
    };
    let res = v.validate(env, schema);
    expect(res).toFailSchema();
  });

  it("ssm object should be valid", () => {
    let env = {
      ENV_SSM: {
          type: "ssm",
          name: "/some/ssm/path"
      },
    };
    let res = v.validate(env, schema);
    expect(res).toMatchSchema();
  });

  it("env with template object should be valid", () => {
    let env = {
      ENV_SSM: {
          type: "template",
          value: "/some/ssm/path"
      },
    };
    let res = v.validate(env, schema);
    expect(res).toMatchSchema();
  });
});
