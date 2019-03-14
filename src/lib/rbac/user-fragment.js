export default `{
  id
  username
  fullName
  roleBindings {
    role,
    workspace { id },
    deployment { id }
  }
}`;
