import validateEnvironment from "./index";

describe("When valid environment variables are passed", () => {
  test("it does not throw an error", () => {
    const goodEnvs = [{ key: "GOOD_VARIABLE", value: "" }];
    expect(validateEnvironment(goodEnvs)).toBeUndefined();
  });
});

describe("When invalid environment variables are passed", () => {
  test("it throws an error", () => {
    expect(() => {
      const badEnvs = [{ key: "AIRFLOW__CORE__EXECUTOR", value: "" }];
      validateEnvironment(badEnvs);
    }).toThrow();
  });
});
