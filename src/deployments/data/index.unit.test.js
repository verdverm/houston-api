import { transformEnvironmentVariables } from "./index";

describe("transformEnvironmentVariables", () => {
  test("correctly transforms array to object", () => {
    // Create a test array.
    const arr = [
      { key: "AIRFLOW_HOME", value: "/tmp" },
      { key: "SCHEDULER_HEARTBEAT", value: "5" }
    ];

    // Run the transformation.
    const obj = transformEnvironmentVariables(arr);

    // Test for object keys and values.
    expect(obj).toHaveProperty("AIRFLOW_HOME", "/tmp");
    expect(obj).toHaveProperty("SCHEDULER_HEARTBEAT", "5");
  });
});
