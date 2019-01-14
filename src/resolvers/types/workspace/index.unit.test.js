import { users, groups, deploymentCount } from "./index";
import casual from "casual";

describe("Workspace", () => {
  test("users returns an empty array", () => {
    const parent = { id: casual.uuid };
    const db = {
      query: { users: jest.fn() }
    };
    users(parent, {}, { db });
    expect(db.query.users.mock.calls).toHaveLength(1);
  });

  test("groups returns an empty array", () => {
    expect(groups()).toEqual([]);
  });

  test("deploymentCount returns length of deployments", () => {
    const parent = { deployments: [{ id: casual.uuid }] };
    const count = deploymentCount(parent);
    expect(count).toBe(1);
  });

  test("deploymentCount returns 0 when no deployments", () => {
    const parent = {};
    const count = deploymentCount(parent);
    expect(count).toBe(0);
  });
});
