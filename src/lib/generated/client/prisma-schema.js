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

type AggregateOAuthCredential {
  count: Int!
}

type AggregateRoleBinding {
  count: Int!
}

type AggregateServiceAccount {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateWorkspace {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Deployment {
  id: ID!
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  version: String
  extraAu: Int
  airflowVersion: String
  alertEmails: [String!]!
  workspace: Workspace
  createdAt: DateTime!
  updatedAt: DateTime!
}

type DeploymentConnection {
  pageInfo: PageInfo!
  edges: [DeploymentEdge]!
  aggregate: AggregateDeployment!
}

input DeploymentCreatealertEmailsInput {
  set: [String!]
}

input DeploymentCreateInput {
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  version: String
  extraAu: Int
  airflowVersion: String
  alertEmails: DeploymentCreatealertEmailsInput
  workspace: WorkspaceCreateOneWithoutDeploymentsInput
}

input DeploymentCreateManyWithoutWorkspaceInput {
  create: [DeploymentCreateWithoutWorkspaceInput!]
  connect: [DeploymentWhereUniqueInput!]
}

input DeploymentCreateOneInput {
  create: DeploymentCreateInput
  connect: DeploymentWhereUniqueInput
}

input DeploymentCreateWithoutWorkspaceInput {
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  version: String
  extraAu: Int
  airflowVersion: String
  alertEmails: DeploymentCreatealertEmailsInput
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
  description_ASC
  description_DESC
  label_ASC
  label_DESC
  registryPassword_ASC
  registryPassword_DESC
  releaseName_ASC
  releaseName_DESC
  version_ASC
  version_DESC
  extraAu_ASC
  extraAu_DESC
  airflowVersion_ASC
  airflowVersion_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DeploymentPreviousValues {
  id: ID!
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  version: String
  extraAu: Int
  airflowVersion: String
  alertEmails: [String!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input DeploymentScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  registryPassword: String
  registryPassword_not: String
  registryPassword_in: [String!]
  registryPassword_not_in: [String!]
  registryPassword_lt: String
  registryPassword_lte: String
  registryPassword_gt: String
  registryPassword_gte: String
  registryPassword_contains: String
  registryPassword_not_contains: String
  registryPassword_starts_with: String
  registryPassword_not_starts_with: String
  registryPassword_ends_with: String
  registryPassword_not_ends_with: String
  releaseName: String
  releaseName_not: String
  releaseName_in: [String!]
  releaseName_not_in: [String!]
  releaseName_lt: String
  releaseName_lte: String
  releaseName_gt: String
  releaseName_gte: String
  releaseName_contains: String
  releaseName_not_contains: String
  releaseName_starts_with: String
  releaseName_not_starts_with: String
  releaseName_ends_with: String
  releaseName_not_ends_with: String
  version: String
  version_not: String
  version_in: [String!]
  version_not_in: [String!]
  version_lt: String
  version_lte: String
  version_gt: String
  version_gte: String
  version_contains: String
  version_not_contains: String
  version_starts_with: String
  version_not_starts_with: String
  version_ends_with: String
  version_not_ends_with: String
  extraAu: Int
  extraAu_not: Int
  extraAu_in: [Int!]
  extraAu_not_in: [Int!]
  extraAu_lt: Int
  extraAu_lte: Int
  extraAu_gt: Int
  extraAu_gte: Int
  airflowVersion: String
  airflowVersion_not: String
  airflowVersion_in: [String!]
  airflowVersion_not_in: [String!]
  airflowVersion_lt: String
  airflowVersion_lte: String
  airflowVersion_gt: String
  airflowVersion_gte: String
  airflowVersion_contains: String
  airflowVersion_not_contains: String
  airflowVersion_starts_with: String
  airflowVersion_not_starts_with: String
  airflowVersion_ends_with: String
  airflowVersion_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [DeploymentScalarWhereInput!]
  OR: [DeploymentScalarWhereInput!]
  NOT: [DeploymentScalarWhereInput!]
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

input DeploymentUpdatealertEmailsInput {
  set: [String!]
}

input DeploymentUpdateDataInput {
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  version: String
  extraAu: Int
  airflowVersion: String
  alertEmails: DeploymentUpdatealertEmailsInput
  workspace: WorkspaceUpdateOneWithoutDeploymentsInput
}

input DeploymentUpdateInput {
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  version: String
  extraAu: Int
  airflowVersion: String
  alertEmails: DeploymentUpdatealertEmailsInput
  workspace: WorkspaceUpdateOneWithoutDeploymentsInput
}

input DeploymentUpdateManyDataInput {
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  version: String
  extraAu: Int
  airflowVersion: String
  alertEmails: DeploymentUpdatealertEmailsInput
}

input DeploymentUpdateManyMutationInput {
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  version: String
  extraAu: Int
  airflowVersion: String
  alertEmails: DeploymentUpdatealertEmailsInput
}

input DeploymentUpdateManyWithoutWorkspaceInput {
  create: [DeploymentCreateWithoutWorkspaceInput!]
  delete: [DeploymentWhereUniqueInput!]
  connect: [DeploymentWhereUniqueInput!]
  disconnect: [DeploymentWhereUniqueInput!]
  update: [DeploymentUpdateWithWhereUniqueWithoutWorkspaceInput!]
  upsert: [DeploymentUpsertWithWhereUniqueWithoutWorkspaceInput!]
  deleteMany: [DeploymentScalarWhereInput!]
  updateMany: [DeploymentUpdateManyWithWhereNestedInput!]
}

input DeploymentUpdateManyWithWhereNestedInput {
  where: DeploymentScalarWhereInput!
  data: DeploymentUpdateManyDataInput!
}

input DeploymentUpdateOneInput {
  create: DeploymentCreateInput
  update: DeploymentUpdateDataInput
  upsert: DeploymentUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: DeploymentWhereUniqueInput
}

input DeploymentUpdateWithoutWorkspaceDataInput {
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  version: String
  extraAu: Int
  airflowVersion: String
  alertEmails: DeploymentUpdatealertEmailsInput
}

input DeploymentUpdateWithWhereUniqueWithoutWorkspaceInput {
  where: DeploymentWhereUniqueInput!
  data: DeploymentUpdateWithoutWorkspaceDataInput!
}

input DeploymentUpsertNestedInput {
  update: DeploymentUpdateDataInput!
  create: DeploymentCreateInput!
}

input DeploymentUpsertWithWhereUniqueWithoutWorkspaceInput {
  where: DeploymentWhereUniqueInput!
  update: DeploymentUpdateWithoutWorkspaceDataInput!
  create: DeploymentCreateWithoutWorkspaceInput!
}

input DeploymentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  registryPassword: String
  registryPassword_not: String
  registryPassword_in: [String!]
  registryPassword_not_in: [String!]
  registryPassword_lt: String
  registryPassword_lte: String
  registryPassword_gt: String
  registryPassword_gte: String
  registryPassword_contains: String
  registryPassword_not_contains: String
  registryPassword_starts_with: String
  registryPassword_not_starts_with: String
  registryPassword_ends_with: String
  registryPassword_not_ends_with: String
  releaseName: String
  releaseName_not: String
  releaseName_in: [String!]
  releaseName_not_in: [String!]
  releaseName_lt: String
  releaseName_lte: String
  releaseName_gt: String
  releaseName_gte: String
  releaseName_contains: String
  releaseName_not_contains: String
  releaseName_starts_with: String
  releaseName_not_starts_with: String
  releaseName_ends_with: String
  releaseName_not_ends_with: String
  version: String
  version_not: String
  version_in: [String!]
  version_not_in: [String!]
  version_lt: String
  version_lte: String
  version_gt: String
  version_gte: String
  version_contains: String
  version_not_contains: String
  version_starts_with: String
  version_not_starts_with: String
  version_ends_with: String
  version_not_ends_with: String
  extraAu: Int
  extraAu_not: Int
  extraAu_in: [Int!]
  extraAu_not_in: [Int!]
  extraAu_lt: Int
  extraAu_lte: Int
  extraAu_gt: Int
  extraAu_gte: Int
  airflowVersion: String
  airflowVersion_not: String
  airflowVersion_in: [String!]
  airflowVersion_not_in: [String!]
  airflowVersion_lt: String
  airflowVersion_lte: String
  airflowVersion_gt: String
  airflowVersion_gte: String
  airflowVersion_contains: String
  airflowVersion_not_contains: String
  airflowVersion_starts_with: String
  airflowVersion_not_starts_with: String
  airflowVersion_ends_with: String
  airflowVersion_not_ends_with: String
  workspace: WorkspaceWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [DeploymentWhereInput!]
  OR: [DeploymentWhereInput!]
  NOT: [DeploymentWhereInput!]
}

input DeploymentWhereUniqueInput {
  id: ID
  releaseName: String
}

type Email {
  id: ID!
  address: String
  primary: Boolean
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
  primary: Boolean
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
  primary: Boolean
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
  primary_ASC
  primary_DESC
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
  id: ID!
  address: String
  primary: Boolean
  token: String
  verified: Boolean
}

input EmailScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  primary: Boolean
  primary_not: Boolean
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
  primary: Boolean
  token: String
  user: UserUpdateOneWithoutEmailsInput
  verified: Boolean
}

input EmailUpdateManyDataInput {
  address: String
  primary: Boolean
  token: String
  verified: Boolean
}

input EmailUpdateManyMutationInput {
  address: String
  primary: Boolean
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
  primary: Boolean
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
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  primary: Boolean
  primary_not: Boolean
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
  id: ID
  address: String
  token: String
}

type InviteToken {
  id: ID!
  email: String
  token: String
  workspace: Workspace
  createdAt: DateTime!
  updatedAt: DateTime!
}

type InviteTokenConnection {
  pageInfo: PageInfo!
  edges: [InviteTokenEdge]!
  aggregate: AggregateInviteToken!
}

input InviteTokenCreateInput {
  email: String
  token: String
  workspace: WorkspaceCreateOneWithoutInvitesInput
}

input InviteTokenCreateManyInput {
  create: [InviteTokenCreateInput!]
  connect: [InviteTokenWhereUniqueInput!]
}

input InviteTokenCreateManyWithoutWorkspaceInput {
  create: [InviteTokenCreateWithoutWorkspaceInput!]
  connect: [InviteTokenWhereUniqueInput!]
}

input InviteTokenCreateWithoutWorkspaceInput {
  email: String
  token: String
}

type InviteTokenEdge {
  node: InviteToken!
  cursor: String!
}

enum InviteTokenOrderByInput {
  id_ASC
  id_DESC
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
  id: ID!
  email: String
  token: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

input InviteTokenScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
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

input InviteTokenUpdateDataInput {
  email: String
  token: String
  workspace: WorkspaceUpdateOneWithoutInvitesInput
}

input InviteTokenUpdateInput {
  email: String
  token: String
  workspace: WorkspaceUpdateOneWithoutInvitesInput
}

input InviteTokenUpdateManyDataInput {
  email: String
  token: String
}

input InviteTokenUpdateManyInput {
  create: [InviteTokenCreateInput!]
  update: [InviteTokenUpdateWithWhereUniqueNestedInput!]
  upsert: [InviteTokenUpsertWithWhereUniqueNestedInput!]
  delete: [InviteTokenWhereUniqueInput!]
  connect: [InviteTokenWhereUniqueInput!]
  disconnect: [InviteTokenWhereUniqueInput!]
  deleteMany: [InviteTokenScalarWhereInput!]
  updateMany: [InviteTokenUpdateManyWithWhereNestedInput!]
}

input InviteTokenUpdateManyMutationInput {
  email: String
  token: String
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

input InviteTokenUpdateWithoutWorkspaceDataInput {
  email: String
  token: String
}

input InviteTokenUpdateWithWhereUniqueNestedInput {
  where: InviteTokenWhereUniqueInput!
  data: InviteTokenUpdateDataInput!
}

input InviteTokenUpdateWithWhereUniqueWithoutWorkspaceInput {
  where: InviteTokenWhereUniqueInput!
  data: InviteTokenUpdateWithoutWorkspaceDataInput!
}

input InviteTokenUpsertWithWhereUniqueNestedInput {
  where: InviteTokenWhereUniqueInput!
  update: InviteTokenUpdateDataInput!
  create: InviteTokenCreateInput!
}

input InviteTokenUpsertWithWhereUniqueWithoutWorkspaceInput {
  where: InviteTokenWhereUniqueInput!
  update: InviteTokenUpdateWithoutWorkspaceDataInput!
  create: InviteTokenCreateWithoutWorkspaceInput!
}

input InviteTokenWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  workspace: WorkspaceWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [InviteTokenWhereInput!]
  OR: [InviteTokenWhereInput!]
  NOT: [InviteTokenWhereInput!]
}

input InviteTokenWhereUniqueInput {
  id: ID
}

scalar Json

type LocalCredential {
  id: ID!
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
  id: ID!
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
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  id: ID
  resetToken: String
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
  createOAuthCredential(data: OAuthCredentialCreateInput!): OAuthCredential!
  updateOAuthCredential(data: OAuthCredentialUpdateInput!, where: OAuthCredentialWhereUniqueInput!): OAuthCredential
  updateManyOAuthCredentials(data: OAuthCredentialUpdateManyMutationInput!, where: OAuthCredentialWhereInput): BatchPayload!
  upsertOAuthCredential(where: OAuthCredentialWhereUniqueInput!, create: OAuthCredentialCreateInput!, update: OAuthCredentialUpdateInput!): OAuthCredential!
  deleteOAuthCredential(where: OAuthCredentialWhereUniqueInput!): OAuthCredential
  deleteManyOAuthCredentials(where: OAuthCredentialWhereInput): BatchPayload!
  createRoleBinding(data: RoleBindingCreateInput!): RoleBinding!
  updateRoleBinding(data: RoleBindingUpdateInput!, where: RoleBindingWhereUniqueInput!): RoleBinding
  updateManyRoleBindings(data: RoleBindingUpdateManyMutationInput!, where: RoleBindingWhereInput): BatchPayload!
  upsertRoleBinding(where: RoleBindingWhereUniqueInput!, create: RoleBindingCreateInput!, update: RoleBindingUpdateInput!): RoleBinding!
  deleteRoleBinding(where: RoleBindingWhereUniqueInput!): RoleBinding
  deleteManyRoleBindings(where: RoleBindingWhereInput): BatchPayload!
  createServiceAccount(data: ServiceAccountCreateInput!): ServiceAccount!
  updateServiceAccount(data: ServiceAccountUpdateInput!, where: ServiceAccountWhereUniqueInput!): ServiceAccount
  updateManyServiceAccounts(data: ServiceAccountUpdateManyMutationInput!, where: ServiceAccountWhereInput): BatchPayload!
  upsertServiceAccount(where: ServiceAccountWhereUniqueInput!, create: ServiceAccountCreateInput!, update: ServiceAccountUpdateInput!): ServiceAccount!
  deleteServiceAccount(where: ServiceAccountWhereUniqueInput!): ServiceAccount
  deleteManyServiceAccounts(where: ServiceAccountWhereInput): BatchPayload!
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
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type OAuthCredential {
  id: ID!
  expiresAt: DateTime
  oauthProvider: String!
  oauthUserId: String!
  user: User
}

type OAuthCredentialConnection {
  pageInfo: PageInfo!
  edges: [OAuthCredentialEdge]!
  aggregate: AggregateOAuthCredential!
}

input OAuthCredentialCreateInput {
  expiresAt: DateTime
  oauthProvider: String!
  oauthUserId: String!
  user: UserCreateOneWithoutOauthCredentialsInput
}

input OAuthCredentialCreateManyWithoutUserInput {
  create: [OAuthCredentialCreateWithoutUserInput!]
  connect: [OAuthCredentialWhereUniqueInput!]
}

input OAuthCredentialCreateWithoutUserInput {
  expiresAt: DateTime
  oauthProvider: String!
  oauthUserId: String!
}

type OAuthCredentialEdge {
  node: OAuthCredential!
  cursor: String!
}

enum OAuthCredentialOrderByInput {
  id_ASC
  id_DESC
  expiresAt_ASC
  expiresAt_DESC
  oauthProvider_ASC
  oauthProvider_DESC
  oauthUserId_ASC
  oauthUserId_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type OAuthCredentialPreviousValues {
  id: ID!
  expiresAt: DateTime
  oauthProvider: String!
  oauthUserId: String!
}

input OAuthCredentialScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  expiresAt: DateTime
  expiresAt_not: DateTime
  expiresAt_in: [DateTime!]
  expiresAt_not_in: [DateTime!]
  expiresAt_lt: DateTime
  expiresAt_lte: DateTime
  expiresAt_gt: DateTime
  expiresAt_gte: DateTime
  oauthProvider: String
  oauthProvider_not: String
  oauthProvider_in: [String!]
  oauthProvider_not_in: [String!]
  oauthProvider_lt: String
  oauthProvider_lte: String
  oauthProvider_gt: String
  oauthProvider_gte: String
  oauthProvider_contains: String
  oauthProvider_not_contains: String
  oauthProvider_starts_with: String
  oauthProvider_not_starts_with: String
  oauthProvider_ends_with: String
  oauthProvider_not_ends_with: String
  oauthUserId: String
  oauthUserId_not: String
  oauthUserId_in: [String!]
  oauthUserId_not_in: [String!]
  oauthUserId_lt: String
  oauthUserId_lte: String
  oauthUserId_gt: String
  oauthUserId_gte: String
  oauthUserId_contains: String
  oauthUserId_not_contains: String
  oauthUserId_starts_with: String
  oauthUserId_not_starts_with: String
  oauthUserId_ends_with: String
  oauthUserId_not_ends_with: String
  AND: [OAuthCredentialScalarWhereInput!]
  OR: [OAuthCredentialScalarWhereInput!]
  NOT: [OAuthCredentialScalarWhereInput!]
}

type OAuthCredentialSubscriptionPayload {
  mutation: MutationType!
  node: OAuthCredential
  updatedFields: [String!]
  previousValues: OAuthCredentialPreviousValues
}

input OAuthCredentialSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OAuthCredentialWhereInput
  AND: [OAuthCredentialSubscriptionWhereInput!]
  OR: [OAuthCredentialSubscriptionWhereInput!]
  NOT: [OAuthCredentialSubscriptionWhereInput!]
}

input OAuthCredentialUpdateInput {
  expiresAt: DateTime
  oauthProvider: String
  oauthUserId: String
  user: UserUpdateOneWithoutOauthCredentialsInput
}

input OAuthCredentialUpdateManyDataInput {
  expiresAt: DateTime
  oauthProvider: String
  oauthUserId: String
}

input OAuthCredentialUpdateManyMutationInput {
  expiresAt: DateTime
  oauthProvider: String
  oauthUserId: String
}

input OAuthCredentialUpdateManyWithoutUserInput {
  create: [OAuthCredentialCreateWithoutUserInput!]
  delete: [OAuthCredentialWhereUniqueInput!]
  connect: [OAuthCredentialWhereUniqueInput!]
  disconnect: [OAuthCredentialWhereUniqueInput!]
  update: [OAuthCredentialUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [OAuthCredentialUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [OAuthCredentialScalarWhereInput!]
  updateMany: [OAuthCredentialUpdateManyWithWhereNestedInput!]
}

input OAuthCredentialUpdateManyWithWhereNestedInput {
  where: OAuthCredentialScalarWhereInput!
  data: OAuthCredentialUpdateManyDataInput!
}

input OAuthCredentialUpdateWithoutUserDataInput {
  expiresAt: DateTime
  oauthProvider: String
  oauthUserId: String
}

input OAuthCredentialUpdateWithWhereUniqueWithoutUserInput {
  where: OAuthCredentialWhereUniqueInput!
  data: OAuthCredentialUpdateWithoutUserDataInput!
}

input OAuthCredentialUpsertWithWhereUniqueWithoutUserInput {
  where: OAuthCredentialWhereUniqueInput!
  update: OAuthCredentialUpdateWithoutUserDataInput!
  create: OAuthCredentialCreateWithoutUserInput!
}

input OAuthCredentialWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  expiresAt: DateTime
  expiresAt_not: DateTime
  expiresAt_in: [DateTime!]
  expiresAt_not_in: [DateTime!]
  expiresAt_lt: DateTime
  expiresAt_lte: DateTime
  expiresAt_gt: DateTime
  expiresAt_gte: DateTime
  oauthProvider: String
  oauthProvider_not: String
  oauthProvider_in: [String!]
  oauthProvider_not_in: [String!]
  oauthProvider_lt: String
  oauthProvider_lte: String
  oauthProvider_gt: String
  oauthProvider_gte: String
  oauthProvider_contains: String
  oauthProvider_not_contains: String
  oauthProvider_starts_with: String
  oauthProvider_not_starts_with: String
  oauthProvider_ends_with: String
  oauthProvider_not_ends_with: String
  oauthUserId: String
  oauthUserId_not: String
  oauthUserId_in: [String!]
  oauthUserId_not_in: [String!]
  oauthUserId_lt: String
  oauthUserId_lte: String
  oauthUserId_gt: String
  oauthUserId_gte: String
  oauthUserId_contains: String
  oauthUserId_not_contains: String
  oauthUserId_starts_with: String
  oauthUserId_not_starts_with: String
  oauthUserId_ends_with: String
  oauthUserId_not_ends_with: String
  user: UserWhereInput
  AND: [OAuthCredentialWhereInput!]
  OR: [OAuthCredentialWhereInput!]
  NOT: [OAuthCredentialWhereInput!]
}

input OAuthCredentialWhereUniqueInput {
  id: ID
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
  oAuthCredential(where: OAuthCredentialWhereUniqueInput!): OAuthCredential
  oAuthCredentials(where: OAuthCredentialWhereInput, orderBy: OAuthCredentialOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OAuthCredential]!
  oAuthCredentialsConnection(where: OAuthCredentialWhereInput, orderBy: OAuthCredentialOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OAuthCredentialConnection!
  roleBinding(where: RoleBindingWhereUniqueInput!): RoleBinding
  roleBindings(where: RoleBindingWhereInput, orderBy: RoleBindingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RoleBinding]!
  roleBindingsConnection(where: RoleBindingWhereInput, orderBy: RoleBindingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RoleBindingConnection!
  serviceAccount(where: ServiceAccountWhereUniqueInput!): ServiceAccount
  serviceAccounts(where: ServiceAccountWhereInput, orderBy: ServiceAccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ServiceAccount]!
  serviceAccountsConnection(where: ServiceAccountWhereInput, orderBy: ServiceAccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ServiceAccountConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  workspace(where: WorkspaceWhereUniqueInput!): Workspace
  workspaces(where: WorkspaceWhereInput, orderBy: WorkspaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Workspace]!
  workspacesConnection(where: WorkspaceWhereInput, orderBy: WorkspaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WorkspaceConnection!
  node(id: ID!): Node
}

enum Role {
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
  id: ID!
  role: Role
  user: User
  serviceAccount: ServiceAccount
  workspace: Workspace
  deployment: Deployment
}

type RoleBindingConnection {
  pageInfo: PageInfo!
  edges: [RoleBindingEdge]!
  aggregate: AggregateRoleBinding!
}

input RoleBindingCreateInput {
  role: Role
  user: UserCreateOneWithoutRoleBindingsInput
  serviceAccount: ServiceAccountCreateOneWithoutRoleBindingInput
  workspace: WorkspaceCreateOneWithoutRoleBindingsInput
  deployment: DeploymentCreateOneInput
}

input RoleBindingCreateManyWithoutUserInput {
  create: [RoleBindingCreateWithoutUserInput!]
  connect: [RoleBindingWhereUniqueInput!]
}

input RoleBindingCreateManyWithoutWorkspaceInput {
  create: [RoleBindingCreateWithoutWorkspaceInput!]
  connect: [RoleBindingWhereUniqueInput!]
}

input RoleBindingCreateOneWithoutServiceAccountInput {
  create: RoleBindingCreateWithoutServiceAccountInput
  connect: RoleBindingWhereUniqueInput
}

input RoleBindingCreateWithoutServiceAccountInput {
  role: Role
  user: UserCreateOneWithoutRoleBindingsInput
  workspace: WorkspaceCreateOneWithoutRoleBindingsInput
  deployment: DeploymentCreateOneInput
}

input RoleBindingCreateWithoutUserInput {
  role: Role
  serviceAccount: ServiceAccountCreateOneWithoutRoleBindingInput
  workspace: WorkspaceCreateOneWithoutRoleBindingsInput
  deployment: DeploymentCreateOneInput
}

input RoleBindingCreateWithoutWorkspaceInput {
  role: Role
  user: UserCreateOneWithoutRoleBindingsInput
  serviceAccount: ServiceAccountCreateOneWithoutRoleBindingInput
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
  id: ID!
  role: Role
}

input RoleBindingScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  role: Role
  user: UserUpdateOneWithoutRoleBindingsInput
  serviceAccount: ServiceAccountUpdateOneWithoutRoleBindingInput
  workspace: WorkspaceUpdateOneWithoutRoleBindingsInput
  deployment: DeploymentUpdateOneInput
}

input RoleBindingUpdateManyDataInput {
  role: Role
}

input RoleBindingUpdateManyMutationInput {
  role: Role
}

input RoleBindingUpdateManyWithoutUserInput {
  create: [RoleBindingCreateWithoutUserInput!]
  delete: [RoleBindingWhereUniqueInput!]
  connect: [RoleBindingWhereUniqueInput!]
  disconnect: [RoleBindingWhereUniqueInput!]
  update: [RoleBindingUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [RoleBindingUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [RoleBindingScalarWhereInput!]
  updateMany: [RoleBindingUpdateManyWithWhereNestedInput!]
}

input RoleBindingUpdateManyWithoutWorkspaceInput {
  create: [RoleBindingCreateWithoutWorkspaceInput!]
  delete: [RoleBindingWhereUniqueInput!]
  connect: [RoleBindingWhereUniqueInput!]
  disconnect: [RoleBindingWhereUniqueInput!]
  update: [RoleBindingUpdateWithWhereUniqueWithoutWorkspaceInput!]
  upsert: [RoleBindingUpsertWithWhereUniqueWithoutWorkspaceInput!]
  deleteMany: [RoleBindingScalarWhereInput!]
  updateMany: [RoleBindingUpdateManyWithWhereNestedInput!]
}

input RoleBindingUpdateManyWithWhereNestedInput {
  where: RoleBindingScalarWhereInput!
  data: RoleBindingUpdateManyDataInput!
}

input RoleBindingUpdateOneWithoutServiceAccountInput {
  create: RoleBindingCreateWithoutServiceAccountInput
  update: RoleBindingUpdateWithoutServiceAccountDataInput
  upsert: RoleBindingUpsertWithoutServiceAccountInput
  delete: Boolean
  disconnect: Boolean
  connect: RoleBindingWhereUniqueInput
}

input RoleBindingUpdateWithoutServiceAccountDataInput {
  role: Role
  user: UserUpdateOneWithoutRoleBindingsInput
  workspace: WorkspaceUpdateOneWithoutRoleBindingsInput
  deployment: DeploymentUpdateOneInput
}

input RoleBindingUpdateWithoutUserDataInput {
  role: Role
  serviceAccount: ServiceAccountUpdateOneWithoutRoleBindingInput
  workspace: WorkspaceUpdateOneWithoutRoleBindingsInput
  deployment: DeploymentUpdateOneInput
}

input RoleBindingUpdateWithoutWorkspaceDataInput {
  role: Role
  user: UserUpdateOneWithoutRoleBindingsInput
  serviceAccount: ServiceAccountUpdateOneWithoutRoleBindingInput
  deployment: DeploymentUpdateOneInput
}

input RoleBindingUpdateWithWhereUniqueWithoutUserInput {
  where: RoleBindingWhereUniqueInput!
  data: RoleBindingUpdateWithoutUserDataInput!
}

input RoleBindingUpdateWithWhereUniqueWithoutWorkspaceInput {
  where: RoleBindingWhereUniqueInput!
  data: RoleBindingUpdateWithoutWorkspaceDataInput!
}

input RoleBindingUpsertWithoutServiceAccountInput {
  update: RoleBindingUpdateWithoutServiceAccountDataInput!
  create: RoleBindingCreateWithoutServiceAccountInput!
}

input RoleBindingUpsertWithWhereUniqueWithoutUserInput {
  where: RoleBindingWhereUniqueInput!
  update: RoleBindingUpdateWithoutUserDataInput!
  create: RoleBindingCreateWithoutUserInput!
}

input RoleBindingUpsertWithWhereUniqueWithoutWorkspaceInput {
  where: RoleBindingWhereUniqueInput!
  update: RoleBindingUpdateWithoutWorkspaceDataInput!
  create: RoleBindingCreateWithoutWorkspaceInput!
}

input RoleBindingWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  user: UserWhereInput
  serviceAccount: ServiceAccountWhereInput
  workspace: WorkspaceWhereInput
  deployment: DeploymentWhereInput
  AND: [RoleBindingWhereInput!]
  OR: [RoleBindingWhereInput!]
  NOT: [RoleBindingWhereInput!]
}

input RoleBindingWhereUniqueInput {
  id: ID
}

type ServiceAccount {
  id: ID!
  apiKey: String
  label: String
  category: String
  active: Boolean
  roleBinding: RoleBinding
  lastUsedAt: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ServiceAccountConnection {
  pageInfo: PageInfo!
  edges: [ServiceAccountEdge]!
  aggregate: AggregateServiceAccount!
}

input ServiceAccountCreateInput {
  apiKey: String
  label: String
  category: String
  active: Boolean
  roleBinding: RoleBindingCreateOneWithoutServiceAccountInput
  lastUsedAt: DateTime
}

input ServiceAccountCreateOneWithoutRoleBindingInput {
  create: ServiceAccountCreateWithoutRoleBindingInput
  connect: ServiceAccountWhereUniqueInput
}

input ServiceAccountCreateWithoutRoleBindingInput {
  apiKey: String
  label: String
  category: String
  active: Boolean
  lastUsedAt: DateTime
}

type ServiceAccountEdge {
  node: ServiceAccount!
  cursor: String!
}

enum ServiceAccountOrderByInput {
  id_ASC
  id_DESC
  apiKey_ASC
  apiKey_DESC
  label_ASC
  label_DESC
  category_ASC
  category_DESC
  active_ASC
  active_DESC
  lastUsedAt_ASC
  lastUsedAt_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ServiceAccountPreviousValues {
  id: ID!
  apiKey: String
  label: String
  category: String
  active: Boolean
  lastUsedAt: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ServiceAccountSubscriptionPayload {
  mutation: MutationType!
  node: ServiceAccount
  updatedFields: [String!]
  previousValues: ServiceAccountPreviousValues
}

input ServiceAccountSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ServiceAccountWhereInput
  AND: [ServiceAccountSubscriptionWhereInput!]
  OR: [ServiceAccountSubscriptionWhereInput!]
  NOT: [ServiceAccountSubscriptionWhereInput!]
}

input ServiceAccountUpdateInput {
  apiKey: String
  label: String
  category: String
  active: Boolean
  roleBinding: RoleBindingUpdateOneWithoutServiceAccountInput
  lastUsedAt: DateTime
}

input ServiceAccountUpdateManyMutationInput {
  apiKey: String
  label: String
  category: String
  active: Boolean
  lastUsedAt: DateTime
}

input ServiceAccountUpdateOneWithoutRoleBindingInput {
  create: ServiceAccountCreateWithoutRoleBindingInput
  update: ServiceAccountUpdateWithoutRoleBindingDataInput
  upsert: ServiceAccountUpsertWithoutRoleBindingInput
  delete: Boolean
  disconnect: Boolean
  connect: ServiceAccountWhereUniqueInput
}

input ServiceAccountUpdateWithoutRoleBindingDataInput {
  apiKey: String
  label: String
  category: String
  active: Boolean
  lastUsedAt: DateTime
}

input ServiceAccountUpsertWithoutRoleBindingInput {
  update: ServiceAccountUpdateWithoutRoleBindingDataInput!
  create: ServiceAccountCreateWithoutRoleBindingInput!
}

input ServiceAccountWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  apiKey: String
  apiKey_not: String
  apiKey_in: [String!]
  apiKey_not_in: [String!]
  apiKey_lt: String
  apiKey_lte: String
  apiKey_gt: String
  apiKey_gte: String
  apiKey_contains: String
  apiKey_not_contains: String
  apiKey_starts_with: String
  apiKey_not_starts_with: String
  apiKey_ends_with: String
  apiKey_not_ends_with: String
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
  active: Boolean
  active_not: Boolean
  roleBinding: RoleBindingWhereInput
  lastUsedAt: DateTime
  lastUsedAt_not: DateTime
  lastUsedAt_in: [DateTime!]
  lastUsedAt_not_in: [DateTime!]
  lastUsedAt_lt: DateTime
  lastUsedAt_lte: DateTime
  lastUsedAt_gt: DateTime
  lastUsedAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ServiceAccountWhereInput!]
  OR: [ServiceAccountWhereInput!]
  NOT: [ServiceAccountWhereInput!]
}

input ServiceAccountWhereUniqueInput {
  id: ID
  apiKey: String
}

type Subscription {
  deployment(where: DeploymentSubscriptionWhereInput): DeploymentSubscriptionPayload
  email(where: EmailSubscriptionWhereInput): EmailSubscriptionPayload
  inviteToken(where: InviteTokenSubscriptionWhereInput): InviteTokenSubscriptionPayload
  localCredential(where: LocalCredentialSubscriptionWhereInput): LocalCredentialSubscriptionPayload
  oAuthCredential(where: OAuthCredentialSubscriptionWhereInput): OAuthCredentialSubscriptionPayload
  roleBinding(where: RoleBindingSubscriptionWhereInput): RoleBindingSubscriptionPayload
  serviceAccount(where: ServiceAccountSubscriptionWhereInput): ServiceAccountSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  workspace(where: WorkspaceSubscriptionWhereInput): WorkspaceSubscriptionPayload
}

type User {
  id: ID!
  username: String
  status: String
  fullName: String
  avatarUrl: String
  emails(where: EmailWhereInput, orderBy: EmailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Email!]
  roleBindings(where: RoleBindingWhereInput, orderBy: RoleBindingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RoleBinding!]
  inviteTokens(where: InviteTokenWhereInput, orderBy: InviteTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [InviteToken!]
  localCredential: LocalCredential
  oauthCredentials(where: OAuthCredentialWhereInput, orderBy: OAuthCredentialOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OAuthCredential!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  username: String
  status: String
  fullName: String
  avatarUrl: String
  emails: EmailCreateManyWithoutUserInput
  roleBindings: RoleBindingCreateManyWithoutUserInput
  inviteTokens: InviteTokenCreateManyInput
  localCredential: LocalCredentialCreateOneWithoutUserInput
  oauthCredentials: OAuthCredentialCreateManyWithoutUserInput
}

input UserCreateOneWithoutEmailsInput {
  create: UserCreateWithoutEmailsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutLocalCredentialInput {
  create: UserCreateWithoutLocalCredentialInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutOauthCredentialsInput {
  create: UserCreateWithoutOauthCredentialsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutRoleBindingsInput {
  create: UserCreateWithoutRoleBindingsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutEmailsInput {
  username: String
  status: String
  fullName: String
  avatarUrl: String
  roleBindings: RoleBindingCreateManyWithoutUserInput
  inviteTokens: InviteTokenCreateManyInput
  localCredential: LocalCredentialCreateOneWithoutUserInput
  oauthCredentials: OAuthCredentialCreateManyWithoutUserInput
}

input UserCreateWithoutLocalCredentialInput {
  username: String
  status: String
  fullName: String
  avatarUrl: String
  emails: EmailCreateManyWithoutUserInput
  roleBindings: RoleBindingCreateManyWithoutUserInput
  inviteTokens: InviteTokenCreateManyInput
  oauthCredentials: OAuthCredentialCreateManyWithoutUserInput
}

input UserCreateWithoutOauthCredentialsInput {
  username: String
  status: String
  fullName: String
  avatarUrl: String
  emails: EmailCreateManyWithoutUserInput
  roleBindings: RoleBindingCreateManyWithoutUserInput
  inviteTokens: InviteTokenCreateManyInput
  localCredential: LocalCredentialCreateOneWithoutUserInput
}

input UserCreateWithoutRoleBindingsInput {
  username: String
  status: String
  fullName: String
  avatarUrl: String
  emails: EmailCreateManyWithoutUserInput
  inviteTokens: InviteTokenCreateManyInput
  localCredential: LocalCredentialCreateOneWithoutUserInput
  oauthCredentials: OAuthCredentialCreateManyWithoutUserInput
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
  status_ASC
  status_DESC
  fullName_ASC
  fullName_DESC
  avatarUrl_ASC
  avatarUrl_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  username: String
  status: String
  fullName: String
  avatarUrl: String
  createdAt: DateTime!
  updatedAt: DateTime!
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

input UserUpdateInput {
  username: String
  status: String
  fullName: String
  avatarUrl: String
  emails: EmailUpdateManyWithoutUserInput
  roleBindings: RoleBindingUpdateManyWithoutUserInput
  inviteTokens: InviteTokenUpdateManyInput
  localCredential: LocalCredentialUpdateOneWithoutUserInput
  oauthCredentials: OAuthCredentialUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  username: String
  status: String
  fullName: String
  avatarUrl: String
}

input UserUpdateOneWithoutEmailsInput {
  create: UserCreateWithoutEmailsInput
  update: UserUpdateWithoutEmailsDataInput
  upsert: UserUpsertWithoutEmailsInput
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

input UserUpdateOneWithoutOauthCredentialsInput {
  create: UserCreateWithoutOauthCredentialsInput
  update: UserUpdateWithoutOauthCredentialsDataInput
  upsert: UserUpsertWithoutOauthCredentialsInput
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
  status: String
  fullName: String
  avatarUrl: String
  roleBindings: RoleBindingUpdateManyWithoutUserInput
  inviteTokens: InviteTokenUpdateManyInput
  localCredential: LocalCredentialUpdateOneWithoutUserInput
  oauthCredentials: OAuthCredentialUpdateManyWithoutUserInput
}

input UserUpdateWithoutLocalCredentialDataInput {
  username: String
  status: String
  fullName: String
  avatarUrl: String
  emails: EmailUpdateManyWithoutUserInput
  roleBindings: RoleBindingUpdateManyWithoutUserInput
  inviteTokens: InviteTokenUpdateManyInput
  oauthCredentials: OAuthCredentialUpdateManyWithoutUserInput
}

input UserUpdateWithoutOauthCredentialsDataInput {
  username: String
  status: String
  fullName: String
  avatarUrl: String
  emails: EmailUpdateManyWithoutUserInput
  roleBindings: RoleBindingUpdateManyWithoutUserInput
  inviteTokens: InviteTokenUpdateManyInput
  localCredential: LocalCredentialUpdateOneWithoutUserInput
}

input UserUpdateWithoutRoleBindingsDataInput {
  username: String
  status: String
  fullName: String
  avatarUrl: String
  emails: EmailUpdateManyWithoutUserInput
  inviteTokens: InviteTokenUpdateManyInput
  localCredential: LocalCredentialUpdateOneWithoutUserInput
  oauthCredentials: OAuthCredentialUpdateManyWithoutUserInput
}

input UserUpsertWithoutEmailsInput {
  update: UserUpdateWithoutEmailsDataInput!
  create: UserCreateWithoutEmailsInput!
}

input UserUpsertWithoutLocalCredentialInput {
  update: UserUpdateWithoutLocalCredentialDataInput!
  create: UserCreateWithoutLocalCredentialInput!
}

input UserUpsertWithoutOauthCredentialsInput {
  update: UserUpdateWithoutOauthCredentialsDataInput!
  create: UserCreateWithoutOauthCredentialsInput!
}

input UserUpsertWithoutRoleBindingsInput {
  update: UserUpdateWithoutRoleBindingsDataInput!
  create: UserCreateWithoutRoleBindingsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  avatarUrl: String
  avatarUrl_not: String
  avatarUrl_in: [String!]
  avatarUrl_not_in: [String!]
  avatarUrl_lt: String
  avatarUrl_lte: String
  avatarUrl_gt: String
  avatarUrl_gte: String
  avatarUrl_contains: String
  avatarUrl_not_contains: String
  avatarUrl_starts_with: String
  avatarUrl_not_starts_with: String
  avatarUrl_ends_with: String
  avatarUrl_not_ends_with: String
  emails_every: EmailWhereInput
  emails_some: EmailWhereInput
  emails_none: EmailWhereInput
  roleBindings_every: RoleBindingWhereInput
  roleBindings_some: RoleBindingWhereInput
  roleBindings_none: RoleBindingWhereInput
  inviteTokens_every: InviteTokenWhereInput
  inviteTokens_some: InviteTokenWhereInput
  inviteTokens_none: InviteTokenWhereInput
  localCredential: LocalCredentialWhereInput
  oauthCredentials_every: OAuthCredentialWhereInput
  oauthCredentials_some: OAuthCredentialWhereInput
  oauthCredentials_none: OAuthCredentialWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
}

type Workspace {
  id: ID!
  active: Boolean
  deployments(where: DeploymentWhereInput, orderBy: DeploymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Deployment!]
  description: String
  invites(where: InviteTokenWhereInput, orderBy: InviteTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [InviteToken!]
  label: String
  roleBindings(where: RoleBindingWhereInput, orderBy: RoleBindingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RoleBinding!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type WorkspaceConnection {
  pageInfo: PageInfo!
  edges: [WorkspaceEdge]!
  aggregate: AggregateWorkspace!
}

input WorkspaceCreateInput {
  active: Boolean
  deployments: DeploymentCreateManyWithoutWorkspaceInput
  description: String
  invites: InviteTokenCreateManyWithoutWorkspaceInput
  label: String
  roleBindings: RoleBindingCreateManyWithoutWorkspaceInput
}

input WorkspaceCreateOneWithoutDeploymentsInput {
  create: WorkspaceCreateWithoutDeploymentsInput
  connect: WorkspaceWhereUniqueInput
}

input WorkspaceCreateOneWithoutInvitesInput {
  create: WorkspaceCreateWithoutInvitesInput
  connect: WorkspaceWhereUniqueInput
}

input WorkspaceCreateOneWithoutRoleBindingsInput {
  create: WorkspaceCreateWithoutRoleBindingsInput
  connect: WorkspaceWhereUniqueInput
}

input WorkspaceCreateWithoutDeploymentsInput {
  active: Boolean
  description: String
  invites: InviteTokenCreateManyWithoutWorkspaceInput
  label: String
  roleBindings: RoleBindingCreateManyWithoutWorkspaceInput
}

input WorkspaceCreateWithoutInvitesInput {
  active: Boolean
  deployments: DeploymentCreateManyWithoutWorkspaceInput
  description: String
  label: String
  roleBindings: RoleBindingCreateManyWithoutWorkspaceInput
}

input WorkspaceCreateWithoutRoleBindingsInput {
  active: Boolean
  deployments: DeploymentCreateManyWithoutWorkspaceInput
  description: String
  invites: InviteTokenCreateManyWithoutWorkspaceInput
  label: String
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
  id: ID!
  active: Boolean
  description: String
  label: String
  createdAt: DateTime!
  updatedAt: DateTime!
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

input WorkspaceUpdateInput {
  active: Boolean
  deployments: DeploymentUpdateManyWithoutWorkspaceInput
  description: String
  invites: InviteTokenUpdateManyWithoutWorkspaceInput
  label: String
  roleBindings: RoleBindingUpdateManyWithoutWorkspaceInput
}

input WorkspaceUpdateManyMutationInput {
  active: Boolean
  description: String
  label: String
}

input WorkspaceUpdateOneWithoutDeploymentsInput {
  create: WorkspaceCreateWithoutDeploymentsInput
  update: WorkspaceUpdateWithoutDeploymentsDataInput
  upsert: WorkspaceUpsertWithoutDeploymentsInput
  delete: Boolean
  disconnect: Boolean
  connect: WorkspaceWhereUniqueInput
}

input WorkspaceUpdateOneWithoutInvitesInput {
  create: WorkspaceCreateWithoutInvitesInput
  update: WorkspaceUpdateWithoutInvitesDataInput
  upsert: WorkspaceUpsertWithoutInvitesInput
  delete: Boolean
  disconnect: Boolean
  connect: WorkspaceWhereUniqueInput
}

input WorkspaceUpdateOneWithoutRoleBindingsInput {
  create: WorkspaceCreateWithoutRoleBindingsInput
  update: WorkspaceUpdateWithoutRoleBindingsDataInput
  upsert: WorkspaceUpsertWithoutRoleBindingsInput
  delete: Boolean
  disconnect: Boolean
  connect: WorkspaceWhereUniqueInput
}

input WorkspaceUpdateWithoutDeploymentsDataInput {
  active: Boolean
  description: String
  invites: InviteTokenUpdateManyWithoutWorkspaceInput
  label: String
  roleBindings: RoleBindingUpdateManyWithoutWorkspaceInput
}

input WorkspaceUpdateWithoutInvitesDataInput {
  active: Boolean
  deployments: DeploymentUpdateManyWithoutWorkspaceInput
  description: String
  label: String
  roleBindings: RoleBindingUpdateManyWithoutWorkspaceInput
}

input WorkspaceUpdateWithoutRoleBindingsDataInput {
  active: Boolean
  deployments: DeploymentUpdateManyWithoutWorkspaceInput
  description: String
  invites: InviteTokenUpdateManyWithoutWorkspaceInput
  label: String
}

input WorkspaceUpsertWithoutDeploymentsInput {
  update: WorkspaceUpdateWithoutDeploymentsDataInput!
  create: WorkspaceCreateWithoutDeploymentsInput!
}

input WorkspaceUpsertWithoutInvitesInput {
  update: WorkspaceUpdateWithoutInvitesDataInput!
  create: WorkspaceCreateWithoutInvitesInput!
}

input WorkspaceUpsertWithoutRoleBindingsInput {
  update: WorkspaceUpdateWithoutRoleBindingsDataInput!
  create: WorkspaceCreateWithoutRoleBindingsInput!
}

input WorkspaceWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  active: Boolean
  active_not: Boolean
  deployments_every: DeploymentWhereInput
  deployments_some: DeploymentWhereInput
  deployments_none: DeploymentWhereInput
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
  invites_every: InviteTokenWhereInput
  invites_some: InviteTokenWhereInput
  invites_none: InviteTokenWhereInput
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
  roleBindings_every: RoleBindingWhereInput
  roleBindings_some: RoleBindingWhereInput
  roleBindings_none: RoleBindingWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [WorkspaceWhereInput!]
  OR: [WorkspaceWhereInput!]
  NOT: [WorkspaceWhereInput!]
}

input WorkspaceWhereUniqueInput {
  id: ID
}
`
      }
    