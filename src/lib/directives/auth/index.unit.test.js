import AuthDirective from "./index";
import { PermissionError } from "errors";
import { graphql } from "graphql";
import { makeExecutableSchema, SchemaDirectiveVisitor } from "graphql-tools";

// A minimal schema for testing against
const typeDefs = `
directive @auth(
  permission: String,
) on OBJECT | FIELD_DEFINITION

type User {
  id: ID!
}
type Query {
  self: User! @auth
  adminOnly: User! @auth(permission: "system.fake.permission")
  anon: User!

  describeWorkspace(
    workspaceUuid: ID!
  ): Boolean @auth(permission: "workspace.fake.permission")

  describeDeployment(
    deploymentUuid: ID!
  ): Boolean @auth(permission: "deployment.fake.permission")
}
`;

const resolvers = {
  Query: {
    self: () => {
      return { id: 1 };
    },
    adminOnly: () => {
      return { id: 1 };
    },
    anon: () => {
      return { id: 1 };
    },
    describeDeployment: () => true,
    describeWorkspace: () => true
  }
};

const mockCheckPerms = jest.fn();

// A Test class that uses a mock checkPermissions to ease testing
class TestingAuthDirective extends AuthDirective {
  constructor({ ...args }) {
    args.checkPermission = mockCheckPerms;
    super(args);
  }
}

let schema;

beforeAll(() => {
  schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: { auth: TestingAuthDirective }
  });
});

async function runQuery(query, ctxArgs, params = null) {
  return graphql(schema, query, null, makeContext(ctxArgs), params);
}

function makeContext({ auth = false, user = undefined }) {
  if (auth && !user) {
    user = { roleBindings: [] };
  }
  return {
    req: {
      session: { user }
    }
  };
}

test("pre-conditions", () => {
  expect(AuthDirective.prototype).toBeInstanceOf(SchemaDirectiveVisitor);
  expect(schema).toBeTruthy();
});

describe("@auth directive", () => {
  test("doesn't affect undecorated directives", async () => {
    const query = `
      query {
        anon {
          id
        }
      }
    `;
    const { data, errors } = await runQuery(query, { auth: false });

    expect(errors).toBeUndefined();
    expect(data).toHaveProperty("anon.id", "1");
  });

  describe("on query without specific permission", () => {
    let queryType;

    const query = `
      query {
        self {
          id
        }
      }
    `;

    beforeAll(() => {
      queryType = schema.getQueryType().getFields()["self"];
    });

    test("should be decorated", () => {
      expect(queryType).toHaveProperty("authDirective");
    });

    test("should be allowed with right role", async () => {
      const { data, errors } = await runQuery(query, { auth: true });

      expect(errors).toBeUndefined();
      expect(data).toHaveProperty("self.id", "1");
    });
  });

  describe("on query requring specific permission", () => {
    const query = `
      query {
        adminOnly {
          id
        }
      }
    `;

    test("should be decorated", () => {
      let queryType = schema.getQueryType().getFields()["adminOnly"];
      expect(queryType).toHaveProperty("authDirective");
    });

    test("should be allowed when we have the specific role", async () => {
      const { data, errors } = await runQuery(query, {
        user: { roleBinding: [{ role: "admin" }] }
      });

      expect(errors).toBeUndefined();
      expect(data).toHaveProperty("adminOnly.id", "1");
      expect(mockCheckPerms).toHaveBeenCalledWith(
        { roleBinding: [{ role: "admin" }] },
        "system.fake.permission",
        null,
        null
      );
    });

    test("should not be allowed as regular user", async () => {
      mockCheckPerms.mockImplementationOnce(() => throw new PermissionError());

      const { data, errors } = await runQuery(query, { auth: true });

      expect(errors).toHaveLength(1);
      expect(errors[0]).toHaveProperty("extensions.code", "FORBIDDEN");
      expect(data).toBeNull();
      expect(mockCheckPerms).toHaveBeenCalledWith(
        expect.anything(),
        "system.fake.permission",
        null,
        null
      );
    });
  });

  describe("on query requring deployment-specific permission", () => {
    const query = `
      query describeDeployment($id: ID!) {
        describeDeployment(deploymentUuid: $id)
      }
    `;

    test("should check the permissions for the specific entity", async () => {
      let vars = { id: "d-2" };
      const { errors } = await runQuery(query, { auth: true }, vars);
      expect(errors).toBeUndefined();
      expect(mockCheckPerms).toHaveBeenCalledWith(
        expect.anything(),
        "deployment.fake.permission",
        "deployment",
        vars.id
      );
    });
  });

  describe("on query requring workspace-specific permission", () => {
    const query = `
      query describeWorkspace($id: ID!) {
        describeWorkspace(workspaceUuid: $id)
      }
    `;

    test("should check the permissions for the specific entity", async () => {
      let vars = { id: "w-2" };
      const { errors } = await runQuery(query, { auth: true }, vars);
      expect(errors).toBeUndefined();
      expect(mockCheckPerms).toHaveBeenCalledWith(
        expect.anything(),
        "workspace.fake.permission",
        "workspace",
        vars.id
      );
    });
  });
});
