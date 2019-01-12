export default `{
  id,
  username,
  roleBindings {
    role,
    workspace { id },
    deployment { id }
  }
}`;
