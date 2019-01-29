import { hasPermission, hasGlobalPermission, checkPermission } from "./index";
import casual from "casual";
import { ENTITY_WORKSPACE } from "constants";

describe("hasPermission", () => {
  test("permits user with matching entity id", () => {
    const workspaceId = casual.uuid;

    const user = {
      id: casual.uuid,
      roleBindings: [
        { role: "WORKSPACE_ADMIN", workspace: { id: workspaceId } }
      ]
    };

    const hasPerm = hasPermission(
      user,
      "user.workspace.get",
      ENTITY_WORKSPACE.toLowerCase(),
      workspaceId
    );

    expect(hasPerm).toBe(true);
  });

  test("denies user without matching entity id", () => {
    const user = {
      id: casual.uuid,
      roleBindings: [
        { role: "WORKSPACE_ADMIN", workspace: { id: casual.uuid } }
      ]
    };

    const hasPerm = hasPermission(
      user,
      "user.workspace.get",
      ENTITY_WORKSPACE.toLowerCase(),
      casual.uuid
    );

    expect(hasPerm).toBe(false);
  });

  test("denies user without matching permission", () => {
    const workspaceId = casual.uuid;

    const user = {
      id: casual.uuid,
      roleBindings: [
        { role: "WORKSPACE_ADMIN", workspace: { id: workspaceId } }
      ]
    };

    const hasPerm = hasPermission(
      user,
      "some.other.permission",
      ENTITY_WORKSPACE.toLowerCase(),
      workspaceId
    );

    expect(hasPerm).toBe(false);
  });
});

describe("hasGlobalPermission", () => {
  test("permits user with matching global permission", () => {
    const user = {
      id: casual.uuid,
      roleBindings: [{ role: "SYSTEM_ADMIN" }]
    };

    const hasPerm = hasGlobalPermission(user, "global.monitoring.view");
    expect(hasPerm).toBe(true);
  });

  test("denies user with matching missing permission", () => {
    const user = {
      id: casual.uuid,
      roleBindings: [{ role: "WORKSPACE_ADMIN" }]
    };

    const hasPerm = hasGlobalPermission(user, "global.monitoring.view");
    expect(hasPerm).toBe(false);
  });
});

describe("checkPermission", () => {
  test("throws if user does not have permission", () => {
    const user = {
      id: casual.uuid,
      roleBindings: [{ role: "WORKSPACE_ADMIN" }]
    };

    expect(() => {
      checkPermission(user, "global.monitoring.view");
    }).toThrow();
  });
});
