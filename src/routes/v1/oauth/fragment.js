export default `fragment EnsureFields on User {
  id
  oauthCredentials {
    oauthProvider
    oauthUserId
  }
}`;
