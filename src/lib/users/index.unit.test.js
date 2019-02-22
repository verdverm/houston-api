import {
  createUser,
  defaultWorkspaceLabel,
  defaultWorkspaceDescription,
  validateInviteToken
} from "./index";
import { sendEmail } from "emails";
import * as exports from "generated/client";
import {
  InviteTokenNotFoundError,
  InviteTokenEmailError,
  PublicSignupsDisabledError
} from "errors";
import config from "config";
import casual from "casual";
import { USER_STATUS_PENDING, USER_STATUS_ACTIVE } from "constants";

jest.mock("emails");

describe("createUser", () => {
  const usersConnection = () => {
    return {
      aggregate() {
        return { count: () => 1 };
      }
    };
  };

  jest
    .spyOn(exports.prisma, "usersConnection")
    .mockImplementation(usersConnection);

  const prismaCreateUser = jest
    .spyOn(exports.prisma, "createUser")
    .mockImplementation(() => {
      return { id: () => 1 };
    });

  const opts = {
    user: casual.username,
    email: casual.email
  };

  beforeEach(() => {
    config.publicSignups = true;
  });

  test("throws error if not the first signup and public signups disabled", async () => {
    config.publicSignups = false;
    await expect(createUser(opts)).rejects.toThrow(
      new PublicSignupsDisabledError()
    );
    expect(prismaCreateUser).not.toHaveBeenCalled();
  });

  test("creates an pending user by default", async () => {
    const opts = {
      user: casual.username,
      email: casual.email
    };

    expect(await createUser(opts)).toBe(1);
    expect(prismaCreateUser.mock.calls[0][0].status).toBe(USER_STATUS_PENDING);
    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith(opts.email, "confirm-email", {
      token: expect.any(String),
      orbitUrl: "http://app.astronomer.io:5000",
      strict: true
    });
  });

  test("creates an active user on request", async () => {
    // I.e. for oauth user signup flow.
    let activeOpts = { ...opts, active: true };

    expect(await createUser(activeOpts)).toBe(1);
    expect(prismaCreateUser.mock.calls[0][0].status).toBe(USER_STATUS_ACTIVE);
  });
});

describe("validateInviteToken", () => {
  // Set by each test case
  let inviteRecord;
  jest
    .spyOn(exports.prisma, "inviteToken")
    .mockReturnValue({ $fragment: () => inviteRecord });

  beforeEach(() => (inviteRecord = null));

  test("return nothing if nothing passed", async () => {
    const res = await validateInviteToken(undefined, casual.email);
    expect(res).toBeUndefined();
  });

  test("throws if token is not found", async () => {
    await expect(
      validateInviteToken(casual.word, casual.email)
    ).rejects.toThrow(new InviteTokenNotFoundError());
  });

  test("throws if email does not match token email", async () => {
    inviteRecord = { email: casual.email };
    await expect(
      validateInviteToken(casual.word, casual.email)
    ).rejects.toThrow(new InviteTokenEmailError());
  });

  test("does not throw if token found and email matches", async () => {
    const email = casual.email;
    inviteRecord = { email };
    await expect(
      validateInviteToken(casual.word, email)
    ).resolves.toBeDefined();
  });
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
