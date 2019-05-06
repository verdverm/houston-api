import {
  hasPermission,
  hasSystemPermission,
  checkPermission,
  isServiceAccount
} from "./index";
import casual from "casual";

describe("hasPermission", () => {
  test("permits user with matching entity id", () => {
    const workspace = { id: casual.uuid, __typename: "Workspace" };

    const user = {
      id: casual.uuid,
      roleBindings: [{ role: "WORKSPACE_ADMIN", workspace }]
    };

    const hasPerm = hasPermission(
      user,
      "workspace.deployments.list",
      workspace
    );

    expect(hasPerm).toBe(true);
  });

  test("denies an undefined user", () => {
    const workspace = { workspace: casual.uuid, __typename: "Workspace" };
    const user = null;

    const hasPerm = hasPermission(
      user,
      "workspace.deployments.list",
      workspace
    );

    expect(hasPerm).toBe(false);
  });

  test("denies user without matching entity id", () => {
    const user = {
      id: casual.uuid,
      roleBindings: [
        {
          role: "WORKSPACE_ADMIN",
          workspace: { id: casual.uuid, __typename: "Workspace" }
        }
      ]
    };

    const hasPerm = hasPermission(user, "workspace.deployments.list", {
      id: casual.uuid,
      __typename: "Workspace"
    });

    expect(hasPerm).toBe(false);
  });

  test("denies user without matching permission", () => {
    const workspace = { id: casual.uuid, __typename: "Workspace" };

    const user = {
      id: casual.uuid,
      roleBindings: [{ role: "WORKSPACE_ADMIN", workspace }]
    };

    const hasPerm = hasPermission(user, "some.other.permission", workspace);

    expect(hasPerm).toBe(false);
  });

  test("cascades to workspace roles for deployments", async () => {
    const workspace = { id: casual.uuid, __typename: "Workspace" },
      deployment = {
        id: casual.uuid,
        workspace,
        __typename: "Deployment"
      };

    const user = {
      id: casual.uuid,
      // Check that even though we have a deployment permission for the the
      // deployment we've asked for that we check the workspace level
      // permission as we don't have the perm from the deployment role.
      roleBindings: [
        { role: "DEPLOYMENT_VIEWER", deployment },
        { role: "WORKSPACE_ADMIN", workspace }
      ]
    };

    const hasPerm = hasPermission(user, "deployment.config.delete", deployment);

    expect(hasPerm).toBe(false);
  });
});

describe("hasSystemPermission", () => {
  test("permits user with matching system permission", () => {
    const user = {
      id: casual.uuid,
      roleBindings: [{ role: "SYSTEM_ADMIN" }]
    };

    const hasPerm = hasSystemPermission(user, "system.monitoring.view");
    expect(hasPerm).toBe(true);
  });

  test("denies user with matching missing permission", () => {
    const user = {
      id: casual.uuid,
      roleBindings: [{ role: "WORKSPACE_ADMIN" }]
    };

    const hasPerm = hasSystemPermission(user, "system.monitoring.view");
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
      checkPermission(user, "system.monitoring.view");
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
