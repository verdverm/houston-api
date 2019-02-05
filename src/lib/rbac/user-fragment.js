export default `{
  id,
  roleBindings {
    role,
    workspace { id },
    deployment { id }
  }
}`;
