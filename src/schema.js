/*
 * This schema extension is used to simply wrap some of our existing types,
 * adding the legacy UUID field. This allows clients to request `uuid` and
 * should be used along with the @uuid directive, to actually populate the
 * field from the normal ID field. It is implemented as a string, rather than in
 * a normal * graphql file because there is currently an open issue with the
 * `importSchema` function in the `graphql-import` package that does not allow
 * the `extend` syntax to work. Once that is fixed, this can be moved into the
 * preferred schema.graphql file(s).
 * Bug reference: https://github.com/prisma/graphql-import/issues/42
 */
export default `
  extend type User {
    uuid: UUID
  }

  extend type Deployment {
    uuid: UUID
  }

  extend type Workspace {
    uuid: UUID
  }
`;
