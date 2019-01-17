import {
  createUser,
  defaultWorkspaceLabel,
  defaultWorkspaceDescription,
  validateInviteToken
} from "./index";
import * as exports from "generated/client";
import { PublicSignupsDisabledError } from "errors";
import casual from "casual";

describe("createUser", () => {
  test("throws error if not the first signup and public signups disabled", async () => {
    const opts = {
      user: casual.username,
      email: casual.email
    };

    const usersConnection = function() {
      return {
        aggregate() {
          return {
            count() {
              return 1;
            }
          };
        }
      };
    };

    jest
      .spyOn(exports.prisma, "usersConnection")
      .mockImplementation(usersConnection);

    await expect(createUser(opts)).rejects.toThrow(
      new PublicSignupsDisabledError()
    );
  });
});

describe("verifyInviteToken", () => {
  test("return nothing if nothing passed", async () => {
    const res = await validateInviteToken(undefined, casual.email);
    expect(res).toBeUndefined();
  });

  // test("return nothing if nothing passed", async () => {
  //   const res = await validateInviteToken(undefined, casual.email);

  //   jest
  //     .spyOn(exports.prisma, "inviteTokensConnection")
  //     .mockReturnValue();

  //   expect(res).toBeUndefined();
  // });
});

describe("defaultWorkspaceLabel", () => {
  test("generates workspace label with full name", () => {
    const opts = { fullName: "Elon Musk", username: "elon1" };
    const res = defaultWorkspaceLabel(opts);
    expect(res).toBe("Elon Musk's Workspace");
  });

  test("generates workspace label with username", () => {
    const opts = { username: "elon1" };
    const res = defaultWorkspaceLabel(opts);
    expect(res).toBe("elon1's Workspace");
  });

  test("generates workspace label no user information", () => {
    const opts = {};
    const res = defaultWorkspaceLabel(opts);
    expect(res).toBe("Default Workspace");
  });
});

describe("defaultWorkspaceDescription", () => {
  test("generates workspace description with full name", () => {
    const opts = { fullName: "Elon Musk", username: "elon1" };
    const res = defaultWorkspaceDescription(opts);
    expect(res).toBe("Default workspace for Elon Musk");
  });

  test("generates workspace description with email", () => {
    const opts = { username: "elon1" };
    const res = defaultWorkspaceDescription(opts);
    expect(res).toBe("Default workspace for elon1");
  });

  test("generates workspace description with username", () => {
    const opts = { email: "elon1@gmail.com" };
    const res = defaultWorkspaceDescription(opts);
    expect(res).toBe("Default workspace for elon1@gmail.com");
  });

  test("generates workspace description no user information", () => {
    const opts = {};
    const res = defaultWorkspaceDescription(opts);
    expect(res).toBe("Default Workspace");
  });
});