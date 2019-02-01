import resolvers from "resolvers";
import casual from "casual";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";
import bcrypt from "bcryptjs";

const mutation = `
mutation resetPassword($token: String!, $pass: String!) {
  resetPassword(token: $token, password: $pass) {
    user { id }
    token {
      value
      payload {
        uuid
        iat
        exp
      }
    }
  }
}
`;

// Import our application schema
const schema = makeExecutableSchema({
  typeDefs: importSchema("src/schema.graphql"),
  resolvers
});

describe("resetPassword", () => {
  const token = casual.uuid,
    pass = casual.string;

  describe("when token is invalid", () => {
    test("should return an error", async () => {
      const q = jest.fn().mockReturnValue(null);
      const db = { query: { localCredential: q } };

      const res = await graphql(
        schema,
        mutation,
        null,
        { db },
        { token, pass }
      );

      expect(res.errors).toHaveLength(1);
      expect(res.errors[0]).toHaveProperty("extensions.code", "BAD_USER_INPUT");
      expect(res.errors[0]).toHaveProperty("message", "Invalid resetToken");
    });
  });

  describe("when token is valid", () => {
    const hash = jest.spyOn(bcrypt, "hash"),
      user = { id: 0, avatarUrl: "" },
      localCred = { id: casual.uuid, user };

    test("should change the password", async () => {
      const updateLocalCredential = jest.fn().mockReturnValue();
      const db = {
        query: {
          localCredential: jest.fn().mockReturnValue(localCred),
          user: jest.fn().mockReturnValue(user)
        },
        mutation: { updateLocalCredential: updateLocalCredential }
      };

      const cookie = jest.fn();

      const res = await graphql(
        schema,
        mutation,
        null,
        { db, res: { cookie } },
        { token, pass }
      );

      expect(res).not.toHaveProperty("errors");

      expect(hash).toHaveBeenCalledWith(pass, 10);

      expect(updateLocalCredential).toHaveBeenCalledWith({
        data: { resetToken: null, password: expect.stringMatching(/^\$2a\$/) },
        where: { id: localCred.id }
      });
      expect(cookie).toHaveBeenCalledTimes(1);

      const now = Math.floor(new Date() / 1000);
      const { iat, exp } = res.data.resetPassword.token.payload;

      // Testing exact equality can sometimes be off by a millisecond.
      // This gives us a small range to test within instead.
      expect(iat).toBeGreaterThan(now - 5);
      expect(iat).toBeLessThan(now + 5);

      expect(exp).toBeGreaterThan(now);
    });
  });
});
