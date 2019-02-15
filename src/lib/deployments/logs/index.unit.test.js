import { createLogQuery } from "./index";

describe("createLogQuery", () => {
  test("it skips a search phrase if not specified", () => {
    const query = createLogQuery(
      "planetary-nebula-1234",
      "webserver",
      new Date(),
      new Date()
    );
    const musts = query.body.query.bool.must;
    expect(musts).toHaveLength(2);
  });

  test("it correctly merges a query if a searchPhrase is specified", () => {
    const query = createLogQuery(
      "planetary-nebula-1234",
      "webserver",
      new Date(),
      new Date(),
      "blah"
    );
    const musts = query.body.query.bool.must;
    expect(musts).toHaveLength(3);
  });
});
