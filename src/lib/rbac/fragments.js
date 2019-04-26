export const user = `{
  id
  username
  fullName
  roleBindings {
    role
    workspace { id __typename }
    deployment { id workspace { id __typename } __typename }
  }
}`;

export const deployment = `{
  id
  workspace { id __typename }
  __typename
}`;

export const workspace = `{
  id
  __typename
}`;

export const serviceAccount = `{
  id,
  roleBinding {
    role
    workspace { id  __typename}
    deployment { id workspace { id } __typename }
  }
}`;
