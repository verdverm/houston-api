import {
  propertiesArrayToObject,
  propertiesObjectToArray,
  combinePropsForUpdate,
  parseJSON
} from "./index";
import casual from "casual";

describe("propertiesObjectToArary", () => {
  test("correctly transforms object to array", () => {
    // Create a test object.
    const obj = {
      component_version: "1.10.1",
      extra_au: "5"
    };

    // Run the transformation.
    const arr = propertiesObjectToArray(obj);

    expect(arr.length).toBe(2);
    expect(arr[0]).toHaveProperty("key", "component_version");
    expect(arr[0]).toHaveProperty("value", "1.10.1");
    expect(arr[1]).toHaveProperty("key", "extra_au");
    expect(arr[1]).toHaveProperty("value", "5");
  });

  test("correctly handles an undefined properties list", () => {
    // Run the transformation.
    const arr = propertiesObjectToArray();
    expect(arr).toEqual([]);
  });
});

describe("propertiesArrayToObject", () => {
  test("correctly transforms array to object", () => {
    // Create a test array.
    const arr = [
      { key: "component_version", value: "10.0.1" },
      { key: "extra_au", value: "5" }
    ];

    // Run the transformation.
    const obj = propertiesArrayToObject(arr);

    // Test for object keys and values.
    expect(obj).toHaveProperty("component_version", "10.0.1");
    expect(obj).toHaveProperty("extra_au", 5);
  });

  test("correctly handles an undefined properties list", () => {
    // Run the transformation.
    const obj = propertiesArrayToObject();
    expect(obj).toEqual({});
  });
});

describe("combinePropsForUpdate", () => {
  test("correctly merges existing and incoming properties", () => {
    const existingProps = [
      { id: casual.uuid, key: "component_version", value: "10.0.1" },
      { id: casual.uuid, key: "extra_au", value: "5" }
    ];

    const incomingProps = [
      { key: "extra_au", value: "10" },
      { key: "alert_emails", value: "someone@somewhere.com" }
    ];

    const combinedProps = combinePropsForUpdate(existingProps, incomingProps);

    // Ensure we have both objects on result.
    expect(combinedProps).toHaveProperty("update");
    expect(combinedProps).toHaveProperty("create");

    // Ensure we have correct lengths.
    expect(combinedProps.update).toHaveLength(2);
    expect(combinedProps.create).toHaveLength(1);

    // Ensure first and only create looks good.
    expect(combinedProps.create[0]).toHaveProperty("key", "alert_emails");
    expect(combinedProps.create[0]).toHaveProperty(
      "value",
      "someone@somewhere.com"
    );

    // Ensure first update looks good.
    expect(combinedProps.update[0].where.id).toBe(existingProps[0].id);
    expect(combinedProps.update[0].data).toHaveProperty(
      "key",
      "component_version"
    );
    expect(combinedProps.update[0].data).toHaveProperty("value", "10.0.1");

    // Ensure second update looks good.
    expect(combinedProps.update[1].where.id).toBe(existingProps[1].id);
    expect(combinedProps.update[1].data).toHaveProperty("key", "extra_au");
    expect(combinedProps.update[1].data).toHaveProperty("value", "10");
  });
});

describe("parseJSON", () => {
  test("correctly parses a valid JSON object", () => {
    const str = '{"something":"somevalue"}';
    const res = parseJSON(str);
    expect(res).toHaveProperty("something", "somevalue");
  });

  test("correctly parses a valid JSON array", () => {
    const str = '["someone@somewhere.com"]';
    const res = parseJSON(str);
    expect(res).toHaveLength(1);
  });

  test("correctly returns a non JSON string", () => {
    const str = "someone@somewhere.com";
    const res = parseJSON(str);
    expect(res).toBe(str);
  });
});
