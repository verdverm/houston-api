module.exports = {
        typeDefs: /* GraphQL */ `type AggregateDeployment {
  count: Int!
}

type AggregateDeploymentProperty {
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

type AggregateServiceAccount {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateUserProperty {
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

scalar DateTime

type Deployment {
  id: ID!
  config: Json
  properties(where: DeploymentPropertyWhereInput, orderBy: DeploymentPropertyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DeploymentProperty!]
  description: String
  label: String
  registryPassword: String
  releaseName: String
  status: String
  type: String
  version: String
  workspace: Workspace
  createdAt: DateTime!
  updatedAt: DateTime!
}

type DeploymentConnection {
  pageInfo: PageInfo!
  edges: [DeploymentEdge]!
  aggregate: AggregateDeployment!
}

input DeploymentCreateInput {
  config: Json
  properties: DeploymentPropertyCreateManyWithoutDeploymentInput
  description: String
  label: String
  registryPassword: String
  releaseName: String
  status: String
  type: String
  version: String
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

input DeploymentCreateOneWithoutPropertiesInput {
  create: DeploymentCreateWithoutPropertiesInput
  connect: DeploymentWhereUniqueInput
}

input DeploymentCreateWithoutPropertiesInput {
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  status: String
  type: String
  version: String
  workspace: WorkspaceCreateOneWithoutDeploymentsInput
}

input DeploymentCreateWithoutWorkspaceInput {
  config: Json
  properties: DeploymentPropertyCreateManyWithoutDeploymentInput
  description: String
  label: String
  registryPassword: String
  releaseName: String
  status: String
  type: String
  version: String
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
  status_ASC
  status_DESC
  type_ASC
  type_DESC
  version_ASC
  version_DESC
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
  status: String
  type: String
  version: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type DeploymentProperty {
  id: ID!
  category: String
  deployment: Deployment
  key: String!
  value: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type DeploymentPropertyConnection {
  pageInfo: PageInfo!
  edges: [DeploymentPropertyEdge]!
  aggregate: AggregateDeploymentProperty!
}

input DeploymentPropertyCreateInput {
  category: String
  deployment: DeploymentCreateOneWithoutPropertiesInput
  key: String!
  value: String
}

input DeploymentPropertyCreateManyWithoutDeploymentInput {
  create: [DeploymentPropertyCreateWithoutDeploymentInput!]
  connect: [DeploymentPropertyWhereUniqueInput!]
}

input DeploymentPropertyCreateWithoutDeploymentInput {
  category: String
  key: String!
  value: String
}

type DeploymentPropertyEdge {
  node: DeploymentProperty!
  cursor: String!
}

enum DeploymentPropertyOrderByInput {
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

type DeploymentPropertyPreviousValues {
  id: ID!
  category: String
  key: String!
  value: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

input DeploymentPropertyScalarWhereInput {
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
  AND: [DeploymentPropertyScalarWhereInput!]
  OR: [DeploymentPropertyScalarWhereInput!]
  NOT: [DeploymentPropertyScalarWhereInput!]
}

type DeploymentPropertySubscriptionPayload {
  mutation: MutationType!
  node: DeploymentProperty
  updatedFields: [String!]
  previousValues: DeploymentPropertyPreviousValues
}

input DeploymentPropertySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DeploymentPropertyWhereInput
  AND: [DeploymentPropertySubscriptionWhereInput!]
  OR: [DeploymentPropertySubscriptionWhereInput!]
  NOT: [DeploymentPropertySubscriptionWhereInput!]
}

input DeploymentPropertyUpdateInput {
  category: String
  deployment: DeploymentUpdateOneWithoutPropertiesInput
  key: String
  value: String
}

input DeploymentPropertyUpdateManyDataInput {
  category: String
  key: String
  value: String
}

input DeploymentPropertyUpdateManyMutationInput {
  category: String
  key: String
  value: String
}

input DeploymentPropertyUpdateManyWithoutDeploymentInput {
  create: [DeploymentPropertyCreateWithoutDeploymentInput!]
  delete: [DeploymentPropertyWhereUniqueInput!]
  connect: [DeploymentPropertyWhereUniqueInput!]
  disconnect: [DeploymentPropertyWhereUniqueInput!]
  update: [DeploymentPropertyUpdateWithWhereUniqueWithoutDeploymentInput!]
  upsert: [DeploymentPropertyUpsertWithWhereUniqueWithoutDeploymentInput!]
  deleteMany: [DeploymentPropertyScalarWhereInput!]
  updateMany: [DeploymentPropertyUpdateManyWithWhereNestedInput!]
}

input DeploymentPropertyUpdateManyWithWhereNestedInput {
  where: DeploymentPropertyScalarWhereInput!
  data: DeploymentPropertyUpdateManyDataInput!
}

input DeploymentPropertyUpdateWithoutDeploymentDataInput {
  category: String
  key: String
  value: String
}

input DeploymentPropertyUpdateWithWhereUniqueWithoutDeploymentInput {
  where: DeploymentPropertyWhereUniqueInput!
  data: DeploymentPropertyUpdateWithoutDeploymentDataInput!
}

input DeploymentPropertyUpsertWithWhereUniqueWithoutDeploymentInput {
  where: DeploymentPropertyWhereUniqueInput!
  update: DeploymentPropertyUpdateWithoutDeploymentDataInput!
  create: DeploymentPropertyCreateWithoutDeploymentInput!
}

input DeploymentPropertyWhereInput {
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
  deployment: DeploymentWhereInput
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
  AND: [DeploymentPropertyWhereInput!]
  OR: [DeploymentPropertyWhereInput!]
  NOT: [DeploymentPropertyWhereInput!]
}

input DeploymentPropertyWhereUniqueInput {
  id: ID
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
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
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

input DeploymentUpdateDataInput {
  config: Json
  properties: DeploymentPropertyUpdateManyWithoutDeploymentInput
  description: String
  label: String
  registryPassword: String
  releaseName: String
  status: String
  type: String
  version: String
  workspace: WorkspaceUpdateOneWithoutDeploymentsInput
}

input DeploymentUpdateInput {
  config: Json
  properties: DeploymentPropertyUpdateManyWithoutDeploymentInput
  description: String
  label: String
  registryPassword: String
  releaseName: String
  status: String
  type: String
  version: String
  workspace: WorkspaceUpdateOneWithoutDeploymentsInput
}

input DeploymentUpdateManyDataInput {
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  status: String
  type: String
  version: String
}

input DeploymentUpdateManyMutationInput {
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  status: String
  type: String
  version: String
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

input DeploymentUpdateOneWithoutPropertiesInput {
  create: DeploymentCreateWithoutPropertiesInput
  update: DeploymentUpdateWithoutPropertiesDataInput
  upsert: DeploymentUpsertWithoutPropertiesInput
  delete: Boolean
  disconnect: Boolean
  connect: DeploymentWhereUniqueInput
}

input DeploymentUpdateWithoutPropertiesDataInput {
  config: Json
  description: String
  label: String
  registryPassword: String
  releaseName: String
  status: String
  type: String
  version: String
  workspace: WorkspaceUpdateOneWithoutDeploymentsInput
}

input DeploymentUpdateWithoutWorkspaceDataInput {
  config: Json
  properties: DeploymentPropertyUpdateManyWithoutDeploymentInput
  description: String
  label: String
  registryPassword: String
  releaseName: String
  status: String
  type: String
  version: String
}

input DeploymentUpdateWithWhereUniqueWithoutWorkspaceInput {
  where: DeploymentWhereUniqueInput!
  data: DeploymentUpdateWithoutWorkspaceDataInput!
}

input DeploymentUpsertNestedInput {
  update: DeploymentUpdateDataInput!
  create: DeploymentCreateInput!
}

input DeploymentUpsertWithoutPropertiesInput {
  update: DeploymentUpdateWithoutPropertiesDataInput!
  create: DeploymentCreateWithoutPropertiesInput!
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
  properties_every: DeploymentPropertyWhereInput
  properties_some: DeploymentPropertyWhereInput
  properties_none: DeploymentPropertyWhereInput
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
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
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
  workspace: WorkspaceCreateOneWithoutInvitesInput
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
  workspace: WorkspaceCreateOneWithoutInvitesInput
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
  id: ID!
  assignments: String
  email: String
  token: String
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
  workspace: WorkspaceUpdateOneWithoutInvitesInput
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
  workspace: WorkspaceUpdateOneWithoutInvitesInput
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
  createDeploymentProperty(data: DeploymentPropertyCreateInput!): DeploymentProperty!
  updateDeploymentProperty(data: DeploymentPropertyUpdateInput!, where: DeploymentPropertyWhereUniqueInput!): DeploymentProperty
  updateManyDeploymentProperties(data: DeploymentPropertyUpdateManyMutationInput!, where: DeploymentPropertyWhereInput): BatchPayload!
  upsertDeploymentProperty(where: DeploymentPropertyWhereUniqueInput!, create: DeploymentPropertyCreateInput!, update: DeploymentPropertyUpdateInput!): DeploymentProperty!
  deleteDeploymentProperty(where: DeploymentPropertyWhereUniqueInput!): DeploymentProperty
  deleteManyDeploymentProperties(where: DeploymentPropertyWhereInput): BatchPayload!
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
  createUserProperty(data: UserPropertyCreateInput!): UserProperty!
  updateUserProperty(data: UserPropertyUpdateInput!, where: UserPropertyWhereUniqueInput!): UserProperty
  updateManyUserProperties(data: UserPropertyUpdateManyMutationInput!, where: UserPropertyWhereInput): BatchPayload!
  upsertUserProperty(where: UserPropertyWhereUniqueInput!, create: UserPropertyCreateInput!, update: UserPropertyUpdateInput!): UserProperty!
  deleteUserProperty(where: UserPropertyWhereUniqueInput!): UserProperty
  deleteManyUserProperties(where: UserPropertyWhereInput): BatchPayload!
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
  deploymentProperty(where: DeploymentPropertyWhereUniqueInput!): DeploymentProperty
  deploymentProperties(where: DeploymentPropertyWhereInput, orderBy: DeploymentPropertyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DeploymentProperty]!
  deploymentPropertiesConnection(where: DeploymentPropertyWhereInput, orderBy: DeploymentPropertyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DeploymentPropertyConnection!
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
  serviceAccount(where: ServiceAccountWhereUniqueInput!): ServiceAccount
  serviceAccounts(where: ServiceAccountWhereInput, orderBy: ServiceAccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ServiceAccount]!
  serviceAccountsConnection(where: ServiceAccountWhereInput, orderBy: ServiceAccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ServiceAccountConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  userProperty(where: UserPropertyWhereUniqueInput!): UserProperty
  userProperties(where: UserPropertyWhereInput, orderBy: UserPropertyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserProperty]!
  userPropertiesConnection(where: UserPropertyWhereInput, orderBy: UserPropertyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserPropertyConnection!
  workspace(where: WorkspaceWhereUniqueInput!): Workspace
  workspaces(where: WorkspaceWhereInput, orderBy: WorkspaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Workspace]!
  workspacesConnection(where: WorkspaceWhereInput, orderBy: WorkspaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WorkspaceConnection!
  workspaceProperty(where: WorkspacePropertyWhereUniqueInput!): WorkspaceProperty
  workspaceProperties(where: WorkspacePropertyWhereInput, orderBy: WorkspacePropertyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [WorkspaceProperty]!
  workspacePropertiesConnection(where: WorkspacePropertyWhereInput, orderBy: WorkspacePropertyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WorkspacePropertyConnection!
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
}

type Subscription {
  deployment(where: DeploymentSubscriptionWhereInput): DeploymentSubscriptionPayload
  deploymentProperty(where: DeploymentPropertySubscriptionWhereInput): DeploymentPropertySubscriptionPayload
  email(where: EmailSubscriptionWhereInput): EmailSubscriptionPayload
  inviteToken(where: InviteTokenSubscriptionWhereInput): InviteTokenSubscriptionPayload
  localCredential(where: LocalCredentialSubscriptionWhereInput): LocalCredentialSubscriptionPayload
  roleBinding(where: RoleBindingSubscriptionWhereInput): RoleBindingSubscriptionPayload
  serviceAccount(where: ServiceAccountSubscriptionWhereInput): ServiceAccountSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  userProperty(where: UserPropertySubscriptionWhereInput): UserPropertySubscriptionPayload
  workspace(where: WorkspaceSubscriptionWhereInput): WorkspaceSubscriptionPayload
  workspaceProperty(where: WorkspacePropertySubscriptionWhereInput): WorkspacePropertySubscriptionPayload
}

type User {
  id: ID!
  username: String
  emails(where: EmailWhereInput, orderBy: EmailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Email!]
  fullName: String
  status: String
  inviteTokens(where: InviteTokenWhereInput, orderBy: InviteTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [InviteToken!]
  localCredential: LocalCredential
  roleBindings(where: RoleBindingWhereInput, orderBy: RoleBindingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RoleBinding!]
  createdAt: DateTime!
  updatedAt: DateTime!
  profile(where: UserPropertyWhereInput, orderBy: UserPropertyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserProperty!]
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
  roleBindings: RoleBindingCreateManyWithoutUserInput
  profile: UserPropertyCreateManyWithoutUserInput
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

input UserCreateOneWithoutProfileInput {
  create: UserCreateWithoutProfileInput
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
  roleBindings: RoleBindingCreateManyWithoutUserInput
  profile: UserPropertyCreateManyWithoutUserInput
}

input UserCreateWithoutInviteTokensInput {
  username: String
  emails: EmailCreateManyWithoutUserInput
  fullName: String
  status: String
  localCredential: LocalCredentialCreateOneWithoutUserInput
  roleBindings: RoleBindingCreateManyWithoutUserInput
  profile: UserPropertyCreateManyWithoutUserInput
}

input UserCreateWithoutLocalCredentialInput {
  username: String
  emails: EmailCreateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenCreateManyWithoutUserInput
  roleBindings: RoleBindingCreateManyWithoutUserInput
  profile: UserPropertyCreateManyWithoutUserInput
}

input UserCreateWithoutProfileInput {
  username: String
  emails: EmailCreateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenCreateManyWithoutUserInput
  localCredential: LocalCredentialCreateOneWithoutUserInput
  roleBindings: RoleBindingCreateManyWithoutUserInput
}

input UserCreateWithoutRoleBindingsInput {
  username: String
  emails: EmailCreateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenCreateManyWithoutUserInput
  localCredential: LocalCredentialCreateOneWithoutUserInput
  profile: UserPropertyCreateManyWithoutUserInput
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
  id: ID!
  username: String
  fullName: String
  status: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserProperty {
  id: ID!
  category: String
  key: String!
  value: String
  user: User
}

type UserPropertyConnection {
  pageInfo: PageInfo!
  edges: [UserPropertyEdge]!
  aggregate: AggregateUserProperty!
}

input UserPropertyCreateInput {
  category: String
  key: String!
  value: String
  user: UserCreateOneWithoutProfileInput
}

input UserPropertyCreateManyWithoutUserInput {
  create: [UserPropertyCreateWithoutUserInput!]
  connect: [UserPropertyWhereUniqueInput!]
}

input UserPropertyCreateWithoutUserInput {
  category: String
  key: String!
  value: String
}

type UserPropertyEdge {
  node: UserProperty!
  cursor: String!
}

enum UserPropertyOrderByInput {
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

type UserPropertyPreviousValues {
  id: ID!
  category: String
  key: String!
  value: String
}

input UserPropertyScalarWhereInput {
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
  AND: [UserPropertyScalarWhereInput!]
  OR: [UserPropertyScalarWhereInput!]
  NOT: [UserPropertyScalarWhereInput!]
}

type UserPropertySubscriptionPayload {
  mutation: MutationType!
  node: UserProperty
  updatedFields: [String!]
  previousValues: UserPropertyPreviousValues
}

input UserPropertySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserPropertyWhereInput
  AND: [UserPropertySubscriptionWhereInput!]
  OR: [UserPropertySubscriptionWhereInput!]
  NOT: [UserPropertySubscriptionWhereInput!]
}

input UserPropertyUpdateInput {
  category: String
  key: String
  value: String
  user: UserUpdateOneWithoutProfileInput
}

input UserPropertyUpdateManyDataInput {
  category: String
  key: String
  value: String
}

input UserPropertyUpdateManyMutationInput {
  category: String
  key: String
  value: String
}

input UserPropertyUpdateManyWithoutUserInput {
  create: [UserPropertyCreateWithoutUserInput!]
  delete: [UserPropertyWhereUniqueInput!]
  connect: [UserPropertyWhereUniqueInput!]
  disconnect: [UserPropertyWhereUniqueInput!]
  update: [UserPropertyUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [UserPropertyUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [UserPropertyScalarWhereInput!]
  updateMany: [UserPropertyUpdateManyWithWhereNestedInput!]
}

input UserPropertyUpdateManyWithWhereNestedInput {
  where: UserPropertyScalarWhereInput!
  data: UserPropertyUpdateManyDataInput!
}

input UserPropertyUpdateWithoutUserDataInput {
  category: String
  key: String
  value: String
}

input UserPropertyUpdateWithWhereUniqueWithoutUserInput {
  where: UserPropertyWhereUniqueInput!
  data: UserPropertyUpdateWithoutUserDataInput!
}

input UserPropertyUpsertWithWhereUniqueWithoutUserInput {
  where: UserPropertyWhereUniqueInput!
  update: UserPropertyUpdateWithoutUserDataInput!
  create: UserPropertyCreateWithoutUserInput!
}

input UserPropertyWhereInput {
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
  user: UserWhereInput
  AND: [UserPropertyWhereInput!]
  OR: [UserPropertyWhereInput!]
  NOT: [UserPropertyWhereInput!]
}

input UserPropertyWhereUniqueInput {
  id: ID
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
  emails: EmailUpdateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenUpdateManyWithoutUserInput
  localCredential: LocalCredentialUpdateOneWithoutUserInput
  roleBindings: RoleBindingUpdateManyWithoutUserInput
  profile: UserPropertyUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  username: String
  fullName: String
  status: String
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

input UserUpdateOneWithoutProfileInput {
  create: UserCreateWithoutProfileInput
  update: UserUpdateWithoutProfileDataInput
  upsert: UserUpsertWithoutProfileInput
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
  roleBindings: RoleBindingUpdateManyWithoutUserInput
  profile: UserPropertyUpdateManyWithoutUserInput
}

input UserUpdateWithoutInviteTokensDataInput {
  username: String
  emails: EmailUpdateManyWithoutUserInput
  fullName: String
  status: String
  localCredential: LocalCredentialUpdateOneWithoutUserInput
  roleBindings: RoleBindingUpdateManyWithoutUserInput
  profile: UserPropertyUpdateManyWithoutUserInput
}

input UserUpdateWithoutLocalCredentialDataInput {
  username: String
  emails: EmailUpdateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenUpdateManyWithoutUserInput
  roleBindings: RoleBindingUpdateManyWithoutUserInput
  profile: UserPropertyUpdateManyWithoutUserInput
}

input UserUpdateWithoutProfileDataInput {
  username: String
  emails: EmailUpdateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenUpdateManyWithoutUserInput
  localCredential: LocalCredentialUpdateOneWithoutUserInput
  roleBindings: RoleBindingUpdateManyWithoutUserInput
}

input UserUpdateWithoutRoleBindingsDataInput {
  username: String
  emails: EmailUpdateManyWithoutUserInput
  fullName: String
  status: String
  inviteTokens: InviteTokenUpdateManyWithoutUserInput
  localCredential: LocalCredentialUpdateOneWithoutUserInput
  profile: UserPropertyUpdateManyWithoutUserInput
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

input UserUpsertWithoutProfileInput {
  update: UserUpdateWithoutProfileDataInput!
  create: UserCreateWithoutProfileInput!
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
  profile_every: UserPropertyWhereInput
  profile_some: UserPropertyWhereInput
  profile_none: UserPropertyWhereInput
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
  properties(where: WorkspacePropertyWhereInput, orderBy: WorkspacePropertyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [WorkspaceProperty!]
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
  properties: WorkspacePropertyCreateManyWithoutWorkspaceInput
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

input WorkspaceCreateOneWithoutPropertiesInput {
  create: WorkspaceCreateWithoutPropertiesInput
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
  properties: WorkspacePropertyCreateManyWithoutWorkspaceInput
  roleBindings: RoleBindingCreateManyWithoutWorkspaceInput
}

input WorkspaceCreateWithoutInvitesInput {
  active: Boolean
  deployments: DeploymentCreateManyWithoutWorkspaceInput
  description: String
  label: String
  properties: WorkspacePropertyCreateManyWithoutWorkspaceInput
  roleBindings: RoleBindingCreateManyWithoutWorkspaceInput
}

input WorkspaceCreateWithoutPropertiesInput {
  active: Boolean
  deployments: DeploymentCreateManyWithoutWorkspaceInput
  description: String
  invites: InviteTokenCreateManyWithoutWorkspaceInput
  label: String
  roleBindings: RoleBindingCreateManyWithoutWorkspaceInput
}

input WorkspaceCreateWithoutRoleBindingsInput {
  active: Boolean
  deployments: DeploymentCreateManyWithoutWorkspaceInput
  description: String
  invites: InviteTokenCreateManyWithoutWorkspaceInput
  label: String
  properties: WorkspacePropertyCreateManyWithoutWorkspaceInput
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

type WorkspaceProperty {
  id: ID!
  category: String
  key: String!
  value: String
  workspace: Workspace
  createdAt: DateTime!
  updatedAt: DateTime!
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
  id: ID!
  category: String
  key: String!
  value: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

input WorkspacePropertyScalarWhereInput {
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
  AND: [WorkspacePropertyWhereInput!]
  OR: [WorkspacePropertyWhereInput!]
  NOT: [WorkspacePropertyWhereInput!]
}

input WorkspacePropertyWhereUniqueInput {
  id: ID
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
  properties: WorkspacePropertyUpdateManyWithoutWorkspaceInput
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

input WorkspaceUpdateOneWithoutPropertiesInput {
  create: WorkspaceCreateWithoutPropertiesInput
  update: WorkspaceUpdateWithoutPropertiesDataInput
  upsert: WorkspaceUpsertWithoutPropertiesInput
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
  properties: WorkspacePropertyUpdateManyWithoutWorkspaceInput
  roleBindings: RoleBindingUpdateManyWithoutWorkspaceInput
}

input WorkspaceUpdateWithoutInvitesDataInput {
  active: Boolean
  deployments: DeploymentUpdateManyWithoutWorkspaceInput
  description: String
  label: String
  properties: WorkspacePropertyUpdateManyWithoutWorkspaceInput
  roleBindings: RoleBindingUpdateManyWithoutWorkspaceInput
}

input WorkspaceUpdateWithoutPropertiesDataInput {
  active: Boolean
  deployments: DeploymentUpdateManyWithoutWorkspaceInput
  description: String
  invites: InviteTokenUpdateManyWithoutWorkspaceInput
  label: String
  roleBindings: RoleBindingUpdateManyWithoutWorkspaceInput
}

input WorkspaceUpdateWithoutRoleBindingsDataInput {
  active: Boolean
  deployments: DeploymentUpdateManyWithoutWorkspaceInput
  description: String
  invites: InviteTokenUpdateManyWithoutWorkspaceInput
  label: String
  properties: WorkspacePropertyUpdateManyWithoutWorkspaceInput
}

input WorkspaceUpsertWithoutDeploymentsInput {
  update: WorkspaceUpdateWithoutDeploymentsDataInput!
  create: WorkspaceCreateWithoutDeploymentsInput!
}

input WorkspaceUpsertWithoutInvitesInput {
  update: WorkspaceUpdateWithoutInvitesDataInput!
  create: WorkspaceCreateWithoutInvitesInput!
}

input WorkspaceUpsertWithoutPropertiesInput {
  update: WorkspaceUpdateWithoutPropertiesDataInput!
  create: WorkspaceCreateWithoutPropertiesInput!
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
  properties_every: WorkspacePropertyWhereInput
  properties_some: WorkspacePropertyWhereInput
  properties_none: WorkspacePropertyWhereInput
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
    