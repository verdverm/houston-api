import {
  hasPermission,
  hasSystemPermission,
  checkPermission,
  isServiceAccount
} from "./index";
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
      "workspace.deployments.get",
      ENTITY_WORKSPACE.toLowerCase(),
      workspaceId
    );

    expect(hasPerm).toBe(true);
  });

  test("denies an undefined user", () => {
    const workspaceId = casual.uuid;
    const user = null;

    const hasPerm = hasPermission(
      user,
      "workspace.deployments.get",
      ENTITY_WORKSPACE.toLowerCase(),
      workspaceId
    );

    expect(hasPerm).toBe(false);
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
      "workspace.deployments.get",
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

describe("hasSystemPermission", () => {
  test("permits user with matching system permission", () => {
    const user = {
      id: casual.uuid,
      roleBindings: [{ role: "SYSTEM_ADMIN" }]
    };

    const hasPerm = hasSystemPermission(user, "system.monitoring.get");
    expect(hasPerm).toBe(true);
  });

  test("denies user with matching missing permission", () => {
    const user = {
      id: casual.uuid,
      roleBindings: [{ role: "WORKSPACE_ADMIN" }]
    };

    const hasPerm = hasSystemPermission(user, "system.monitoring.get");
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
      checkPermission(user, "system.monitoring.get");
    }).toThrow();
  });
});

describe("isServiceAccount", () => {
  test("returns true for a valid service account", () => {
    const header = "abcdefghijklmnopqrstuvwxyz012345";
    const isServiceAcct = isServiceAccount(header);
    expect(isServiceAcct).toBe(true);
  });

  test("returns false for an invalid length", () => {
    const header = "abcdefghijklmnop";
    const isServiceAcct = isServiceAccount(header);
    expect(isServiceAcct).toBe(false);
  });

  test("returns false for a header with dots in it (jwt)", () => {
    const header =
      "abcdefghijklmnopqrstuvwxyz012345.abcdefghijklmnopqrstuvwxyz012345.abcdefghijklmnopqrstuvwxyz012345";
    const isServiceAcct = isServiceAccount(header);
    expect(isServiceAcct).toBe(false);
  });
});
