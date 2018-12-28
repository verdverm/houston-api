module.exports = {
        typeDefs: /* GraphQL */ `type AggregateDeployment {
  count: Int!
}

type AggregateEmail {
  count: Int!
}

type AggregateInviteToken {
  count: Int!
}

type AggregateLocalCredential {
  count: Int!
}

type AggregateRoleBinding {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateWorkspace {
  count: Int!
}

type AggregateWorkspaceProperty {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Deployment {
  id: UUID!
  config: String
}

type DeploymentConnection {
  pageInfo: PageInfo!
  edges: [DeploymentEdge]!
  aggregate: AggregateDeployment!
}

input DeploymentCreateInput {
  config: String
}

input DeploymentCreateOneInput {
  create: DeploymentCreateInput
  connect: DeploymentWhereUniqueInput
}

type DeploymentEdge {
  node: Deployment!
  cursor: String!
}

enum DeploymentOrderByInput {
  id_ASC
  id_DESC
  config_ASC
  config_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DeploymentPreviousValues {
  id: UUID!
  config: String
}

type DeploymentSubscriptionPayload {
  mutation: MutationType!
  node: Deployment
  updatedFields: [String!]
  previousValues: DeploymentPreviousValues
}

input DeploymentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DeploymentWhereInput
  AND: [DeploymentSubscriptionWhereInput!]
  OR: [DeploymentSubscriptionWhereInput!]
  NOT: [DeploymentSubscriptionWhereInput!]
}

input DeploymentUpdateDataInput {
  config: String
}

input DeploymentUpdateInput {
  config: String
}

input DeploymentUpdateManyMutationInput {
  config: String
}

input DeploymentUpdateOneInput {
  create: DeploymentCreateInput
  update: DeploymentUpdateDataInput
  upsert: DeploymentUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: DeploymentWhereUniqueInput
}

input DeploymentUpsertNestedInput {
  update: DeploymentUpdateDataInput!
  create: DeploymentCreateInput!
}

input DeploymentWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  config: String
  config_not: String
  config_in: [String!]
  config_not_in: [String!]
  config_lt: String
  config_lte: String
  config_gt: String
  config_gte: String
  config_contains: String
  config_not_contains: String
  config_starts_with: String
  config_not_starts_with: String
  config_ends_with: String
  config_not_ends_with: String
  AND: [DeploymentWhereInput!]
  OR: [DeploymentWhereInput!]
  NOT: [DeploymentWhereInput!]
}

input DeploymentWhereUniqueInput {
  id: UUID
}

type Email {
  id: UUID!
  address: String
  main: Boolean
  token: String
  user: User
  verified: Boolean
}

type EmailConnection {
  pageInfo: PageInfo!
  edges: [EmailEdge]!
  aggregate: AggregateEmail!
}

input EmailCreateInput {
  address: String
  main: Boolean
  token: String
  user: UserCreateOneWithoutEmailsInput
  verified: Boolean
}

input EmailCreateManyWithoutUserInput {
  create: [EmailCreateWithoutUserInput!]
  connect: [EmailWhereUniqueInput!]
}

input EmailCreateWithoutUserInput {
  address: String
  main: Boolean
  token: String
  verified: Boolean
}

type EmailEdge {
  node: Email!
  cursor: String!
}

enum EmailOrderByInput {
  id_ASC
  id_DESC
  address_ASC
  address_DESC
  main_ASC
  main_DESC
  token_ASC
  token_DESC
  verified_ASC
  verified_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EmailPreviousValues {
  id: UUID!
  address: String
  main: Boolean
  token: String
  verified: Boolean
}

input EmailScalarWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  address: String
  address_not: String
  address_in: [String!]
  address_not_in: [String!]
  address_lt: String
  address_lte: String
  address_gt: String
  address_gte: String
  address_contains: String
  address_not_contains: String
  address_starts_with: String
  address_not_starts_with: String
  address_ends_with: String
  address_not_ends_with: String
  main: Boolean
  main_not: Boolean
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  verified: Boolean
  verified_not: Boolean
  AND: [EmailScalarWhereInput!]
  OR: [EmailScalarWhereInput!]
  NOT: [EmailScalarWhereInput!]
}

type EmailSubscriptionPayload {
  mutation: MutationType!
  node: Email
  updatedFields: [String!]
  previousValues: EmailPreviousValues
}

input EmailSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EmailWhereInput
  AND: [EmailSubscriptionWhereInput!]
  OR: [EmailSubscriptionWhereInput!]
  NOT: [EmailSubscriptionWhereInput!]
}

input EmailUpdateInput {
  address: String
  main: Boolean
  token: String
  user: UserUpdateOneWithoutEmailsInput
  verified: Boolean
}

input EmailUpdateManyDataInput {
  address: String
  main: Boolean
  token: String
  verified: Boolean
}

input EmailUpdateManyMutationInput {
  address: String
  main: Boolean
  token: String
  verified: Boolean
}

input EmailUpdateManyWithoutUserInput {
  create: [EmailCreateWithoutUserInput!]
  delete: [EmailWhereUniqueInput!]
  connect: [EmailWhereUniqueInput!]
  disconnect: [EmailWhereUniqueInput!]
  update: [EmailUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [EmailUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [EmailScalarWhereInput!]
  updateMany: [EmailUpdateManyWithWhereNestedInput!]
}

input EmailUpdateManyWithWhereNestedInput {
  where: EmailScalarWhereInput!
  data: EmailUpdateManyDataInput!
}

input EmailUpdateWithoutUserDataInput {
  address: String
  main: Boolean
  token: String
  verified: Boolean
}

input EmailUpdateWithWhereUniqueWithoutUserInput {
  where: EmailWhereUniqueInput!
  data: EmailUpdateWithoutUserDataInput!
}

input EmailUpsertWithWhereUniqueWithoutUserInput {
  where: EmailWhereUniqueInput!
  update: EmailUpdateWithoutUserDataInput!
  create: EmailCreateWithoutUserInput!
}

input EmailWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  address: String
  address_not: String
  address_in: [String!]
  address_not_in: [String!]
  address_lt: String
  address_lte: String
  address_gt: String
  address_gte: String
  address_contains: String
  address_not_contains: String
  address_starts_with: String
  address_not_starts_with: String
  address_ends_with: String
  address_not_ends_with: String
  main: Boolean
  main_not: Boolean
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  user: UserWhereInput
  verified: Boolean
  verified_not: Boolean
  AND: [EmailWhereInput!]
  OR: [EmailWhereInput!]
  NOT: [EmailWhereInput!]
}

input EmailWhereUniqueInput {
  id: UUID
  address: String
  token: String
}

type InviteToken {
  id: UUID!
  assignments: String
  email: String
  token: String
  user: User
  workspace: Workspace
}

type InviteTokenConnection {
  pageInfo: PageInfo!
  edges: [InviteTokenEdge]!
  aggregate: AggregateInviteToken!
}

input InviteTokenCreateInput {
  assignments: String
  email: String
  token: String
  user: UserCreateOneWithoutInviteTokensInput
  workspace: WorkspaceCreateOneWithoutInviteTokensInput
}

input InviteTokenCreateManyWithoutUserInput {
  create: [InviteTokenCreateWithoutUserInput!]
  connect: [InviteTokenWhereUniqueInput!]
}

input InviteTokenCreateManyWithoutWorkspaceInput {
  create: [InviteTokenCreateWithoutWorkspaceInput!]
  connect: [InviteTokenWhereUniqueInput!]
}

input InviteTokenCreateWithoutUserInput {
  assignments: String
  email: String
  token: String
  workspace: WorkspaceCreateOneWithoutInviteTokensInput
}

input InviteTokenCreateWithoutWorkspaceInput {
  assignments: String
  email: String
  token: String
  user: UserCreateOneWithoutInviteTokensInput
}

type InviteTokenEdge {
  node: InviteToken!
  cursor: String!
}

enum InviteTokenOrderByInput {
  id_ASC
  id_DESC
  assignments_ASC
  assignments_DESC
  email_ASC
  email_DESC
  token_ASC
  token_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type InviteTokenPreviousValues {
  id: UUID!
  assignments: String
  email: String
  token: String
}

input InviteTokenScalarWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  assignments: String
  assignments_not: String
  assignments_in: [String!]
  assignments_not_in: [String!]
  assignments_lt: String
  assignments_lte: String
  assignments_gt: String
  assignments_gte: String
  assignments_contains: String
  assignments_not_contains: String
  assignments_starts_with: String
  assignments_not_starts_with: String
  assignments_ends_with: String
  assignments_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  AND: [InviteTokenScalarWhereInput!]
  OR: [InviteTokenScalarWhereInput!]
  NOT: [InviteTokenScalarWhereInput!]
}

type InviteTokenSubscriptionPayload {
  mutation: MutationType!
  node: InviteToken
  updatedFields: [String!]
  previousValues: InviteTokenPreviousValues
}

input InviteTokenSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: InviteTokenWhereInput
  AND: [InviteTokenSubscriptionWhereInput!]
  OR: [InviteTokenSubscriptionWhereInput!]
  NOT: [InviteTokenSubscriptionWhereInput!]
}

input InviteTokenUpdateInput {
  assignments: String
  email: String
  token: String
  user: UserUpdateOneWithoutInviteTokensInput
  workspace: WorkspaceUpdateOneWithoutInviteTokensInput
}

input InviteTokenUpdateManyDataInput {
  assignments: String
  email: String
  token: String
}

input InviteTokenUpdateManyMutationInput {
  assignments: String
  email: String
  token: String
}

input InviteTokenUpdateManyWithoutUserInput {
  create: [InviteTokenCreateWithoutUserInput!]
  delete: [InviteTokenWhereUniqueInput!]
  connect: [InviteTokenWhereUniqueInput!]
  disconnect: [InviteTokenWhereUniqueInput!]
  update: [InviteTokenUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [InviteTokenUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [InviteTokenScalarWhereInput!]
  updateMany: [InviteTokenUpdateManyWithWhereNestedInput!]
}

input InviteTokenUpdateManyWithoutWorkspaceInput {
  create: [InviteTokenCreateWithoutWorkspaceInput!]
  delete: [InviteTokenWhereUniqueInput!]
  connect: [InviteTokenWhereUniqueInput!]
  disconnect: [InviteTokenWhereUniqueInput!]
  update: [InviteTokenUpdateWithWhereUniqueWithoutWorkspaceInput!]
  upsert: [InviteTokenUpsertWithWhereUniqueWithoutWorkspaceInput!]
  deleteMany: [InviteTokenScalarWhereInput!]
  updateMany: [InviteTokenUpdateManyWithWhereNestedInput!]
}

input InviteTokenUpdateManyWithWhereNestedInput {
  where: InviteTokenScalarWhereInput!
  data: InviteTokenUpdateManyDataInput!
}

input InviteTokenUpdateWithoutUserDataInput {
  assignments: String
  email: String
  token: String
  workspace: WorkspaceUpdateOneWithoutInviteTokensInput
}

input InviteTokenUpdateWithoutWorkspaceDataInput {
  assignments: String
  email: String
  token: String
  user: UserUpdateOneWithoutInviteTokensInput
}

input InviteTokenUpdateWithWhereUniqueWithoutUserInput {
  where: InviteTokenWhereUniqueInput!
  data: InviteTokenUpdateWithoutUserDataInput!
}

input InviteTokenUpdateWithWhereUniqueWithoutWorkspaceInput {
  where: InviteTokenWhereUniqueInput!
  data: InviteTokenUpdateWithoutWorkspaceDataInput!
}

input InviteTokenUpsertWithWhereUniqueWithoutUserInput {
  where: InviteTokenWhereUniqueInput!
  update: InviteTokenUpdateWithoutUserDataInput!
  create: InviteTokenCreateWithoutUserInput!
}

input InviteTokenUpsertWithWhereUniqueWithoutWorkspaceInput {
  where: InviteTokenWhereUniqueInput!
  update: InviteTokenUpdateWithoutWorkspaceDataInput!
  create: InviteTokenCreateWithoutWorkspaceInput!
}

input InviteTokenWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  assignments: String
  assignments_not: String
  assignments_in: [String!]
  assignments_not_in: [String!]
  assignments_lt: String
  assignments_lte: String
  assignments_gt: String
  assignments_gte: String
  assignments_contains: String
  assignments_not_contains: String
  assignments_starts_with: String
  assignments_not_starts_with: String
  assignments_ends_with: String
  assignments_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  user: UserWhereInput
  workspace: WorkspaceWhereInput
  AND: [InviteTokenWhereInput!]
  OR: [InviteTokenWhereInput!]
  NOT: [InviteTokenWhereInput!]
}

input InviteTokenWhereUniqueInput {
  id: UUID
}

type LocalCredential {
  id: UUID!
  user: User
  password: String
  resetToken: String
}

type LocalCredentialConnection {
  pageInfo: PageInfo!
  edges: [LocalCredentialEdge]!
  aggregate: AggregateLocalCredential!
}

input LocalCredentialCreateInput {
  user: UserCreateOneWithoutLocalCredentialInput
  password: String
  resetToken: String
}

input LocalCredentialCreateOneWithoutUserInput {
  create: LocalCredentialCreateWithoutUserInput
  connect: LocalCredentialWhereUniqueInput
}

input LocalCredentialCreateWithoutUserInput {
  password: String
  resetToken: String
}

type LocalCredentialEdge {
  node: LocalCredential!
  cursor: String!
}

enum LocalCredentialOrderByInput {
  id_ASC
  id_DESC
  password_ASC
  password_DESC
  resetToken_ASC
  resetToken_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type LocalCredentialPreviousValues {
  id: UUID!
  password: String
  resetToken: String
}

type LocalCredentialSubscriptionPayload {
  mutation: MutationType!
  node: LocalCredential
  updatedFields: [String!]
  previousValues: LocalCredentialPreviousValues
}

input LocalCredentialSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: LocalCredentialWhereInput
  AND: [LocalCredentialSubscriptionWhereInput!]
  OR: [LocalCredentialSubscriptionWhereInput!]
  NOT: [LocalCredentialSubscriptionWhereInput!]
}

input LocalCredentialUpdateInput {
  user: UserUpdateOneWithoutLocalCredentialInput
  password: String
  resetToken: String
}

input LocalCredentialUpdateManyMutationInput {
  password: String
  resetToken: String
}

input LocalCredentialUpdateOneWithoutUserInput {
  create: LocalCredentialCreateWithoutUserInput
  update: LocalCredentialUpdateWithoutUserDataInput
  upsert: LocalCredentialUpsertWithoutUserInput
  delete: Boolean
  disconnect: Boolean
  connect: LocalCredentialWhereUniqueInput
}

input LocalCredentialUpdateWithoutUserDataInput {
  password: String
  resetToken: String
}

input LocalCredentialUpsertWithoutUserInput {
  update: LocalCredentialUpdateWithoutUserDataInput!
  create: LocalCredentialCreateWithoutUserInput!
}

input LocalCredentialWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  user: UserWhereInput
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  resetToken: String
  resetToken_not: String
  resetToken_in: [String!]
  resetToken_not_in: [String!]
  resetToken_lt: String
  resetToken_lte: String
  resetToken_gt: String
  resetToken_gte: String
  resetToken_contains: String
  resetToken_not_contains: String
  resetToken_starts_with: String
  resetToken_not_starts_with: String
  resetToken_ends_with: String
  resetToken_not_ends_with: String
  AND: [LocalCredentialWhereInput!]
  OR: [LocalCredentialWhereInput!]
  NOT: [LocalCredentialWhereInput!]
}

input LocalCredentialWhereUniqueInput {
  id: UUID
  password: String
}

scalar Long

type Mutation {
  createDeployment(data: DeploymentCreateInput!): Deployment!
  updateDeployment(data: DeploymentUpdateInput!, where: DeploymentWhereUniqueInput!): Deployment
  updateManyDeployments(data: DeploymentUpdateManyMutationInput!, where: DeploymentWhereInput): BatchPayload!
  upsertDeployment(where: DeploymentWhereUniqueInput!, create: DeploymentCreateInput!, update: DeploymentUpdateInput!): Deployment!
  deleteDeployment(where: DeploymentWhereUniqueInput!): Deployment
  deleteManyDeployments(where: DeploymentWhereInput): BatchPayload!
  createEmail(data: EmailCreateInput!): Email!
  updateEmail(data: EmailUpdateInput!, where: EmailWhereUniqueInput!): Email
  updateManyEmails(data: EmailUpdateManyMutationInput!, where: EmailWhereInput): BatchPayload!
  upsertEmail(where: EmailWhereUniqueInput!, create: EmailCreateInput!, update: EmailUpdateInput!): Email!
  deleteEmail(where: EmailWhereUniqueInput!): Email
  deleteManyEmails(where: EmailWhereInput): BatchPayload!
  createInviteToken(data: InviteTokenCreateInput!): InviteToken!
  updateInviteToken(data: InviteTokenUpdateInput!, where: InviteTokenWhereUniqueInput!): InviteToken
  updateManyInviteTokens(data: InviteTokenUpdateManyMutationInput!, where: InviteTokenWhereInput): BatchPayload!
  upsertInviteToken(where: InviteTokenWhereUniqueInput!, create: InviteTokenCreateInput!, update: InviteTokenUpdateInput!): InviteToken!
  deleteInviteToken(where: InviteTokenWhereUniqueInput!): InviteToken
  deleteManyInviteTokens(where: InviteTokenWhereInput): BatchPayload!
  createLocalCredential(data: LocalCredentialCreateInput!): LocalCredential!
  updateLocalCredential(data: LocalCredentialUpdateInput!, where: LocalCredentialWhereUniqueInput!): LocalCredential
  updateManyLocalCredentials(data: LocalCredentialUpdateManyMutationInput!, where: LocalCredentialWhereInput): BatchPayload!
  upsertLocalCredential(where: LocalCredentialWhereUniqueInput!, create: LocalCredentialCreateInput!, update: LocalCredentialUpdateInput!): LocalCredential!
  deleteLocalCredential(where: LocalCredentialWhereUniqueInput!): LocalCredential
  deleteManyLocalCredentials(where: LocalCredentialWhereInput): BatchPayload!
  createRoleBinding(data: RoleBindingCreateInput!): RoleBinding!
  updateRoleBinding(data: RoleBindingUpdateInput!, where: RoleBindingWhereUniqueInput!): RoleBinding
  updateManyRoleBindings(data: RoleBindingUpdateManyMutationInput!, where: RoleBindingWhereInput): BatchPayload!
  upsertRoleBinding(where: RoleBindingWhereUniqueInput!, create: RoleBindingCreateInput!, update: RoleBindingUpdateInput!): RoleBinding!
  deleteRoleBinding(where: RoleBindingWhereUniqueInput!): RoleBinding
  deleteManyRoleBindings(where: RoleBindingWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createWorkspace(data: WorkspaceCreateInput!): Workspace!
  updateWorkspace(data: WorkspaceUpdateInput!, where: WorkspaceWhereUniqueInput!): Workspace
  updateManyWorkspaces(data: WorkspaceUpdateManyMutationInput!, where: WorkspaceWhereInput): BatchPayload!
  upsertWorkspace(where: WorkspaceWhereUniqueInput!, create: WorkspaceCreateInput!, update: WorkspaceUpdateInput!): Workspace!
  deleteWorkspace(where: WorkspaceWhereUniqueInput!): Workspace
  deleteManyWorkspaces(where: WorkspaceWhereInput): BatchPayload!
  createWorkspaceProperty(data: WorkspacePropertyCreateInput!): WorkspaceProperty!
  updateWorkspaceProperty(data: WorkspacePropertyUpdateInput!, where: WorkspacePropertyWhereUniqueInput!): WorkspaceProperty
  updateManyWorkspaceProperties(data: WorkspacePropertyUpdateManyMutationInput!, where: WorkspacePropertyWhereInput): BatchPayload!
  upsertWorkspaceProperty(where: WorkspacePropertyWhereUniqueInput!, create: WorkspacePropertyCreateInput!, update: WorkspacePropertyUpdateInput!): WorkspaceProperty!
  deleteWorkspaceProperty(where: WorkspacePropertyWhereUniqueInput!): WorkspaceProperty
  deleteManyWorkspaceProperties(where: WorkspacePropertyWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  deployment(where: DeploymentWhereUniqueInput!): Deployment
  deployments(where: DeploymentWhereInput, orderBy: DeploymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Deployment]!
  deploymentsConnection(where: DeploymentWhereInput, orderBy: DeploymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DeploymentConnection!
  email(where: EmailWhereUniqueInput!): Email
  emails(where: EmailWhereInput, orderBy: EmailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Email]!
  emailsConnection(where: EmailWhereInput, orderBy: EmailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EmailConnection!
  inviteToken(where: InviteTokenWhereUniqueInput!): InviteToken
  inviteTokens(where: InviteTokenWhereInput, orderBy: InviteTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [InviteToken]!
  inviteTokensConnection(where: InviteTokenWhereInput, orderBy: InviteTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): InviteTokenConnection!
  localCredential(where: LocalCredentialWhereUniqueInput!): LocalCredential
  localCredentials(where: LocalCredentialWhereInput, orderBy: LocalCredentialOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [LocalCredential]!
  localCredentialsConnection(where: LocalCredentialWhereInput, orderBy: LocalCredentialOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LocalCredentialConnection!
  roleBinding(where: RoleBindingWhereUniqueInput!): RoleBinding
  roleBindings(where: RoleBindingWhereInput, orderBy: RoleBindingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RoleBinding]!
  roleBindingsConnection(where: RoleBindingWhereInput, orderBy: RoleBindingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RoleBindingConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  workspace(where: WorkspaceWhereUniqueInput!): Workspace
  workspaces(where: WorkspaceWhereInput, orderBy: WorkspaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Workspace]!
  workspacesConnection(where: WorkspaceWhereInput, orderBy: WorkspaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WorkspaceConnection!
  workspaceProperty(where: WorkspacePropertyWhereUniqueInput!): WorkspaceProperty
  workspaceProperties(where: WorkspacePropertyWhereInput, orderBy: WorkspacePropertyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [WorkspaceProperty]!
  workspacePropertiesConnection(where: WorkspacePropertyWhereInput, orderBy: WorkspacePropertyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WorkspacePropertyConnection!
  node(id: ID!): Node
}

enum Role {
  USER
  WORKSPACE_ADMIN
  WORKSPACE_EDITOR
  WORKSPACE_VIEWER
  DEPLOYMENT_ADMIN
  DEPLOYMENT_EDITOR
  DEPLOYMENT_VIEWER
  SYSTEM_ADMIN
  SYSTEM_EDITOR
  SYSTEM_VIEWER
}

type RoleBinding {
  id: UUID!
  subject: User
  role: Role
  workspace: Workspace
  deployment: Deployment
}

type RoleBindingConnection {
  pageInfo: PageInfo!
  edges: [RoleBindingEdge]!
  aggregate: AggregateRoleBinding!
}

input RoleBindingCreateInput {
  subject: UserCreateOneWithoutRoleBindingsInput
  role: Role
  workspace: WorkspaceCreateOneInput
  deployment: DeploymentCreateOneInput
}

input RoleBindingCreateManyWithoutSubjectInput {
  create: [RoleBindingCreateWithoutSubjectInput!]
  connect: [RoleBindingWhereUniqueInput!]
}

input RoleBindingCreateWithoutSubjectInput {
  role: Role
  workspace: WorkspaceCreateOneInput
  deployment: DeploymentCreateOneInput
}

type RoleBindingEdge {
  node: RoleBinding!
  cursor: String!
}

enum RoleBindingOrderByInput {
  id_ASC
  id_DESC
  role_ASC
  role_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type RoleBindingPreviousValues {
  id: UUID!
  role: Role
}

input RoleBindingScalarWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  AND: [RoleBindingScalarWhereInput!]
  OR: [RoleBindingScalarWhereInput!]
  NOT: [RoleBindingScalarWhereInput!]
}

type RoleBindingSubscriptionPayload {
  mutation: MutationType!
  node: RoleBinding
  updatedFields: [String!]
  previousValues: RoleBindingPreviousValues
}

input RoleBindingSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RoleBindingWhereInput
  AND: [RoleBindingSubscriptionWhereInput!]
  OR: [RoleBindingSubscriptionWhereInput!]
  NOT: [RoleBindingSubscriptionWhereInput!]
}

input RoleBindingUpdateInput {
  subject: UserUpdateOneWithoutRoleBindingsInput
  role: Role
  workspace: WorkspaceUpdateOneInput
  deployment: DeploymentUpdateOneInput
}

input RoleBindingUpdateManyDataInput {
  role: Role
}

input RoleBindingUpdateManyMutationInput {
  role: Role
}

input RoleBindingUpdateManyWithoutSubjectInput {
  create: [RoleBindingCreateWithoutSubjectInput!]
  delete: [RoleBindingWhereUniqueInput!]
  connect: [RoleBindingWhereUniqueInput!]
  disconnect: [RoleBindingWhereUniqueInput!]
  update: [RoleBindingUpdateWithWhereUniqueWithoutSubjectInput!]
  upsert: [RoleBindingUpsertWithWhereUniqueWithoutSubjectInput!]
  deleteMany: [RoleBindingScalarWhereInput!]
  updateMany: [RoleBindingUpdateManyWithWhereNestedInput!]
}

input RoleBindingUpdateManyWithWhereNestedInput {
  where: RoleBindingScalarWhereInput!
  data: RoleBindingUpdateManyDataInput!
}

input RoleBindingUpdateWithoutSubjectDataInput {
  role: Role
  workspace: WorkspaceUpdateOneInput
  deployment: DeploymentUpdateOneInput
}

input RoleBindingUpdateWithWhereUniqueWithoutSubjectInput {
  where: RoleBindingWhereUniqueInput!
  data: RoleBindingUpdateWithoutSubjectDataInput!
}

input RoleBindingUpsertWithWhereUniqueWithoutSubjectInput {
  where: RoleBindingWhereUniqueInput!
  update: RoleBindingUpdateWithoutSubjectDataInput!
  create: RoleBindingCreateWithoutSubjectInput!
}

input RoleBindingWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  subject: UserWhereInput
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  workspace: WorkspaceWhereInput
  deployment: DeploymentWhereInput
  AND: [RoleBindingWhereInput!]
  OR: [RoleBindingWhereInput!]
  NOT: [RoleBindingWhereInput!]
}

input RoleBindingWhereUniqueInput {
  id: UUID
}

type Subscription {
  deployment(where: DeploymentSubscriptionWhereInput): DeploymentSubscriptionPayload
  email(where: EmailSubscriptionWhereInput): EmailSubscriptionPayload
  inviteToken(where: InviteTokenSubscriptionWhereInput): InviteTokenSubscriptionPayload
  localCredential(where: LocalCredentialSubscriptionWhereInput): LocalCredentialSubscriptionPayload
  roleBinding(where: RoleBindingSubscriptionWhereInput): RoleBindingSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  workspace(where: WorkspaceSubscriptionWhereInput): WorkspaceSubscriptionPayload
  workspaceProperty(where: WorkspacePropertySubscriptionWhereInput): WorkspacePropertySubscriptionPayload
}

type User {
  id: UUID!
  username: String
  emails(where: EmailWhereInput, orderBy: EmailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Email!]
  fullName: String
  status: String
  inviteTokens(where: InviteTokenWhereInput, orderBy: InviteTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [InviteToken!]
  localCredential: LocalCredential
  roleBindings(where: RoleBindingWhereInput, orderBy: RoleBindingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RoleBinding!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  username: String
  emails: EmailCreateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenCreateManyWithoutUserInput
  localCredential: LocalCredentialCreateOneWithoutUserInput
  roleBindings: RoleBindingCreateManyWithoutSubjectInput
}

input UserCreateManyInput {
  create: [UserCreateInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutEmailsInput {
  create: UserCreateWithoutEmailsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutInviteTokensInput {
  create: UserCreateWithoutInviteTokensInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutLocalCredentialInput {
  create: UserCreateWithoutLocalCredentialInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutRoleBindingsInput {
  create: UserCreateWithoutRoleBindingsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutEmailsInput {
  username: String
  fullName: String
  status: String
  inviteTokens: InviteTokenCreateManyWithoutUserInput
  localCredential: LocalCredentialCreateOneWithoutUserInput
  roleBindings: RoleBindingCreateManyWithoutSubjectInput
}

input UserCreateWithoutInviteTokensInput {
  username: String
  emails: EmailCreateManyWithoutUserInput
  fullName: String
  status: String
  localCredential: LocalCredentialCreateOneWithoutUserInput
  roleBindings: RoleBindingCreateManyWithoutSubjectInput
}

input UserCreateWithoutLocalCredentialInput {
  username: String
  emails: EmailCreateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenCreateManyWithoutUserInput
  roleBindings: RoleBindingCreateManyWithoutSubjectInput
}

input UserCreateWithoutRoleBindingsInput {
  username: String
  emails: EmailCreateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenCreateManyWithoutUserInput
  localCredential: LocalCredentialCreateOneWithoutUserInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  username_ASC
  username_DESC
  fullName_ASC
  fullName_DESC
  status_ASC
  status_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: UUID!
  username: String
  fullName: String
  status: String
}

input UserScalarWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  fullName: String
  fullName_not: String
  fullName_in: [String!]
  fullName_not_in: [String!]
  fullName_lt: String
  fullName_lte: String
  fullName_gt: String
  fullName_gte: String
  fullName_contains: String
  fullName_not_contains: String
  fullName_starts_with: String
  fullName_not_starts_with: String
  fullName_ends_with: String
  fullName_not_ends_with: String
  status: String
  status_not: String
  status_in: [String!]
  status_not_in: [String!]
  status_lt: String
  status_lte: String
  status_gt: String
  status_gte: String
  status_contains: String
  status_not_contains: String
  status_starts_with: String
  status_not_starts_with: String
  status_ends_with: String
  status_not_ends_with: String
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  username: String
  emails: EmailUpdateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenUpdateManyWithoutUserInput
  localCredential: LocalCredentialUpdateOneWithoutUserInput
  roleBindings: RoleBindingUpdateManyWithoutSubjectInput
}

input UserUpdateInput {
  username: String
  emails: EmailUpdateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenUpdateManyWithoutUserInput
  localCredential: LocalCredentialUpdateOneWithoutUserInput
  roleBindings: RoleBindingUpdateManyWithoutSubjectInput
}

input UserUpdateManyDataInput {
  username: String
  fullName: String
  status: String
}

input UserUpdateManyInput {
  create: [UserCreateInput!]
  update: [UserUpdateWithWhereUniqueNestedInput!]
  upsert: [UserUpsertWithWhereUniqueNestedInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyMutationInput {
  username: String
  fullName: String
  status: String
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneWithoutEmailsInput {
  create: UserCreateWithoutEmailsInput
  update: UserUpdateWithoutEmailsDataInput
  upsert: UserUpsertWithoutEmailsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutInviteTokensInput {
  create: UserCreateWithoutInviteTokensInput
  update: UserUpdateWithoutInviteTokensDataInput
  upsert: UserUpsertWithoutInviteTokensInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutLocalCredentialInput {
  create: UserCreateWithoutLocalCredentialInput
  update: UserUpdateWithoutLocalCredentialDataInput
  upsert: UserUpsertWithoutLocalCredentialInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutRoleBindingsInput {
  create: UserCreateWithoutRoleBindingsInput
  update: UserUpdateWithoutRoleBindingsDataInput
  upsert: UserUpsertWithoutRoleBindingsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutEmailsDataInput {
  username: String
  fullName: String
  status: String
  inviteTokens: InviteTokenUpdateManyWithoutUserInput
  localCredential: LocalCredentialUpdateOneWithoutUserInput
  roleBindings: RoleBindingUpdateManyWithoutSubjectInput
}

input UserUpdateWithoutInviteTokensDataInput {
  username: String
  emails: EmailUpdateManyWithoutUserInput
  fullName: String
  status: String
  localCredential: LocalCredentialUpdateOneWithoutUserInput
  roleBindings: RoleBindingUpdateManyWithoutSubjectInput
}

input UserUpdateWithoutLocalCredentialDataInput {
  username: String
  emails: EmailUpdateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenUpdateManyWithoutUserInput
  roleBindings: RoleBindingUpdateManyWithoutSubjectInput
}

input UserUpdateWithoutRoleBindingsDataInput {
  username: String
  emails: EmailUpdateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenUpdateManyWithoutUserInput
  localCredential: LocalCredentialUpdateOneWithoutUserInput
}

input UserUpdateWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  data: UserUpdateDataInput!
}

input UserUpsertWithoutEmailsInput {
  update: UserUpdateWithoutEmailsDataInput!
  create: UserCreateWithoutEmailsInput!
}

input UserUpsertWithoutInviteTokensInput {
  update: UserUpdateWithoutInviteTokensDataInput!
  create: UserCreateWithoutInviteTokensInput!
}

input UserUpsertWithoutLocalCredentialInput {
  update: UserUpdateWithoutLocalCredentialDataInput!
  create: UserCreateWithoutLocalCredentialInput!
}

input UserUpsertWithoutRoleBindingsInput {
  update: UserUpdateWithoutRoleBindingsDataInput!
  create: UserCreateWithoutRoleBindingsInput!
}

input UserUpsertWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  emails_every: EmailWhereInput
  emails_some: EmailWhereInput
  emails_none: EmailWhereInput
  fullName: String
  fullName_not: String
  fullName_in: [String!]
  fullName_not_in: [String!]
  fullName_lt: String
  fullName_lte: String
  fullName_gt: String
  fullName_gte: String
  fullName_contains: String
  fullName_not_contains: String
  fullName_starts_with: String
  fullName_not_starts_with: String
  fullName_ends_with: String
  fullName_not_ends_with: String
  status: String
  status_not: String
  status_in: [String!]
  status_not_in: [String!]
  status_lt: String
  status_lte: String
  status_gt: String
  status_gte: String
  status_contains: String
  status_not_contains: String
  status_starts_with: String
  status_not_starts_with: String
  status_ends_with: String
  status_not_ends_with: String
  inviteTokens_every: InviteTokenWhereInput
  inviteTokens_some: InviteTokenWhereInput
  inviteTokens_none: InviteTokenWhereInput
  localCredential: LocalCredentialWhereInput
  roleBindings_every: RoleBindingWhereInput
  roleBindings_some: RoleBindingWhereInput
  roleBindings_none: RoleBindingWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: UUID
  username: String
}

scalar UUID

type Workspace {
  id: UUID!
  active: Boolean
  description: String
  inviteTokens(where: InviteTokenWhereInput, orderBy: InviteTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [InviteToken!]
  label: String
  properties(where: WorkspacePropertyWhereInput, orderBy: WorkspacePropertyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [WorkspaceProperty!]
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type WorkspaceConnection {
  pageInfo: PageInfo!
  edges: [WorkspaceEdge]!
  aggregate: AggregateWorkspace!
}

input WorkspaceCreateInput {
  active: Boolean
  description: String
  inviteTokens: InviteTokenCreateManyWithoutWorkspaceInput
  label: String
  properties: WorkspacePropertyCreateManyWithoutWorkspaceInput
  users: UserCreateManyInput
}

input WorkspaceCreateOneInput {
  create: WorkspaceCreateInput
  connect: WorkspaceWhereUniqueInput
}

input WorkspaceCreateOneWithoutInviteTokensInput {
  create: WorkspaceCreateWithoutInviteTokensInput
  connect: WorkspaceWhereUniqueInput
}

input WorkspaceCreateOneWithoutPropertiesInput {
  create: WorkspaceCreateWithoutPropertiesInput
  connect: WorkspaceWhereUniqueInput
}

input WorkspaceCreateWithoutInviteTokensInput {
  active: Boolean
  description: String
  label: String
  properties: WorkspacePropertyCreateManyWithoutWorkspaceInput
  users: UserCreateManyInput
}

input WorkspaceCreateWithoutPropertiesInput {
  active: Boolean
  description: String
  inviteTokens: InviteTokenCreateManyWithoutWorkspaceInput
  label: String
  users: UserCreateManyInput
}

type WorkspaceEdge {
  node: Workspace!
  cursor: String!
}

enum WorkspaceOrderByInput {
  id_ASC
  id_DESC
  active_ASC
  active_DESC
  description_ASC
  description_DESC
  label_ASC
  label_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type WorkspacePreviousValues {
  id: UUID!
  active: Boolean
  description: String
  label: String
}

type WorkspaceProperty {
  id: UUID!
  category: String
  key: String!
  value: String
  workspace: Workspace
}

type WorkspacePropertyConnection {
  pageInfo: PageInfo!
  edges: [WorkspacePropertyEdge]!
  aggregate: AggregateWorkspaceProperty!
}

input WorkspacePropertyCreateInput {
  category: String
  key: String!
  value: String
  workspace: WorkspaceCreateOneWithoutPropertiesInput
}

input WorkspacePropertyCreateManyWithoutWorkspaceInput {
  create: [WorkspacePropertyCreateWithoutWorkspaceInput!]
  connect: [WorkspacePropertyWhereUniqueInput!]
}

input WorkspacePropertyCreateWithoutWorkspaceInput {
  category: String
  key: String!
  value: String
}

type WorkspacePropertyEdge {
  node: WorkspaceProperty!
  cursor: String!
}

enum WorkspacePropertyOrderByInput {
  id_ASC
  id_DESC
  category_ASC
  category_DESC
  key_ASC
  key_DESC
  value_ASC
  value_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type WorkspacePropertyPreviousValues {
  id: UUID!
  category: String
  key: String!
  value: String
}

input WorkspacePropertyScalarWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  category: String
  category_not: String
  category_in: [String!]
  category_not_in: [String!]
  category_lt: String
  category_lte: String
  category_gt: String
  category_gte: String
  category_contains: String
  category_not_contains: String
  category_starts_with: String
  category_not_starts_with: String
  category_ends_with: String
  category_not_ends_with: String
  key: String
  key_not: String
  key_in: [String!]
  key_not_in: [String!]
  key_lt: String
  key_lte: String
  key_gt: String
  key_gte: String
  key_contains: String
  key_not_contains: String
  key_starts_with: String
  key_not_starts_with: String
  key_ends_with: String
  key_not_ends_with: String
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  AND: [WorkspacePropertyScalarWhereInput!]
  OR: [WorkspacePropertyScalarWhereInput!]
  NOT: [WorkspacePropertyScalarWhereInput!]
}

type WorkspacePropertySubscriptionPayload {
  mutation: MutationType!
  node: WorkspaceProperty
  updatedFields: [String!]
  previousValues: WorkspacePropertyPreviousValues
}

input WorkspacePropertySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: WorkspacePropertyWhereInput
  AND: [WorkspacePropertySubscriptionWhereInput!]
  OR: [WorkspacePropertySubscriptionWhereInput!]
  NOT: [WorkspacePropertySubscriptionWhereInput!]
}

input WorkspacePropertyUpdateInput {
  category: String
  key: String
  value: String
  workspace: WorkspaceUpdateOneWithoutPropertiesInput
}

input WorkspacePropertyUpdateManyDataInput {
  category: String
  key: String
  value: String
}

input WorkspacePropertyUpdateManyMutationInput {
  category: String
  key: String
  value: String
}

input WorkspacePropertyUpdateManyWithoutWorkspaceInput {
  create: [WorkspacePropertyCreateWithoutWorkspaceInput!]
  delete: [WorkspacePropertyWhereUniqueInput!]
  connect: [WorkspacePropertyWhereUniqueInput!]
  disconnect: [WorkspacePropertyWhereUniqueInput!]
  update: [WorkspacePropertyUpdateWithWhereUniqueWithoutWorkspaceInput!]
  upsert: [WorkspacePropertyUpsertWithWhereUniqueWithoutWorkspaceInput!]
  deleteMany: [WorkspacePropertyScalarWhereInput!]
  updateMany: [WorkspacePropertyUpdateManyWithWhereNestedInput!]
}

input WorkspacePropertyUpdateManyWithWhereNestedInput {
  where: WorkspacePropertyScalarWhereInput!
  data: WorkspacePropertyUpdateManyDataInput!
}

input WorkspacePropertyUpdateWithoutWorkspaceDataInput {
  category: String
  key: String
  value: String
}

input WorkspacePropertyUpdateWithWhereUniqueWithoutWorkspaceInput {
  where: WorkspacePropertyWhereUniqueInput!
  data: WorkspacePropertyUpdateWithoutWorkspaceDataInput!
}

input WorkspacePropertyUpsertWithWhereUniqueWithoutWorkspaceInput {
  where: WorkspacePropertyWhereUniqueInput!
  update: WorkspacePropertyUpdateWithoutWorkspaceDataInput!
  create: WorkspacePropertyCreateWithoutWorkspaceInput!
}

input WorkspacePropertyWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  category: String
  category_not: String
  category_in: [String!]
  category_not_in: [String!]
  category_lt: String
  category_lte: String
  category_gt: String
  category_gte: String
  category_contains: String
  category_not_contains: String
  category_starts_with: String
  category_not_starts_with: String
  category_ends_with: String
  category_not_ends_with: String
  key: String
  key_not: String
  key_in: [String!]
  key_not_in: [String!]
  key_lt: String
  key_lte: String
  key_gt: String
  key_gte: String
  key_contains: String
  key_not_contains: String
  key_starts_with: String
  key_not_starts_with: String
  key_ends_with: String
  key_not_ends_with: String
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  workspace: WorkspaceWhereInput
  AND: [WorkspacePropertyWhereInput!]
  OR: [WorkspacePropertyWhereInput!]
  NOT: [WorkspacePropertyWhereInput!]
}

input WorkspacePropertyWhereUniqueInput {
  id: UUID
}

type WorkspaceSubscriptionPayload {
  mutation: MutationType!
  node: Workspace
  updatedFields: [String!]
  previousValues: WorkspacePreviousValues
}

input WorkspaceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: WorkspaceWhereInput
  AND: [WorkspaceSubscriptionWhereInput!]
  OR: [WorkspaceSubscriptionWhereInput!]
  NOT: [WorkspaceSubscriptionWhereInput!]
}

input WorkspaceUpdateDataInput {
  active: Boolean
  description: String
  inviteTokens: InviteTokenUpdateManyWithoutWorkspaceInput
  label: String
  properties: WorkspacePropertyUpdateManyWithoutWorkspaceInput
  users: UserUpdateManyInput
}

input WorkspaceUpdateInput {
  active: Boolean
  description: String
  inviteTokens: InviteTokenUpdateManyWithoutWorkspaceInput
  label: String
  properties: WorkspacePropertyUpdateManyWithoutWorkspaceInput
  users: UserUpdateManyInput
}

input WorkspaceUpdateManyMutationInput {
  active: Boolean
  description: String
  label: String
}

input WorkspaceUpdateOneInput {
  create: WorkspaceCreateInput
  update: WorkspaceUpdateDataInput
  upsert: WorkspaceUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: WorkspaceWhereUniqueInput
}

input WorkspaceUpdateOneWithoutInviteTokensInput {
  create: WorkspaceCreateWithoutInviteTokensInput
  update: WorkspaceUpdateWithoutInviteTokensDataInput
  upsert: WorkspaceUpsertWithoutInviteTokensInput
  delete: Boolean
  disconnect: Boolean
  connect: WorkspaceWhereUniqueInput
}

input WorkspaceUpdateOneWithoutPropertiesInput {
  create: WorkspaceCreateWithoutPropertiesInput
  update: WorkspaceUpdateWithoutPropertiesDataInput
  upsert: WorkspaceUpsertWithoutPropertiesInput
  delete: Boolean
  disconnect: Boolean
  connect: WorkspaceWhereUniqueInput
}

input WorkspaceUpdateWithoutInviteTokensDataInput {
  active: Boolean
  description: String
  label: String
  properties: WorkspacePropertyUpdateManyWithoutWorkspaceInput
  users: UserUpdateManyInput
}

input WorkspaceUpdateWithoutPropertiesDataInput {
  active: Boolean
  description: String
  inviteTokens: InviteTokenUpdateManyWithoutWorkspaceInput
  label: String
  users: UserUpdateManyInput
}

input WorkspaceUpsertNestedInput {
  update: WorkspaceUpdateDataInput!
  create: WorkspaceCreateInput!
}

input WorkspaceUpsertWithoutInviteTokensInput {
  update: WorkspaceUpdateWithoutInviteTokensDataInput!
  create: WorkspaceCreateWithoutInviteTokensInput!
}

input WorkspaceUpsertWithoutPropertiesInput {
  update: WorkspaceUpdateWithoutPropertiesDataInput!
  create: WorkspaceCreateWithoutPropertiesInput!
}

input WorkspaceWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  active: Boolean
  active_not: Boolean
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  inviteTokens_every: InviteTokenWhereInput
  inviteTokens_some: InviteTokenWhereInput
  inviteTokens_none: InviteTokenWhereInput
  label: String
  label_not: String
  label_in: [String!]
  label_not_in: [String!]
  label_lt: String
  label_lte: String
  label_gt: String
  label_gte: String
  label_contains: String
  label_not_contains: String
  label_starts_with: String
  label_not_starts_with: String
  label_ends_with: String
  label_not_ends_with: String
  properties_every: WorkspacePropertyWhereInput
  properties_some: WorkspacePropertyWhereInput
  properties_none: WorkspacePropertyWhereInput
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
  AND: [WorkspaceWhereInput!]
  OR: [WorkspaceWhereInput!]
  NOT: [WorkspaceWhereInput!]
}

input WorkspaceWhereUniqueInput {
  id: UUID
}
`
      }
    