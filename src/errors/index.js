export class PublicSignupsDisabledError extends Error {
  message =
    this.message ||
    "Public signups are disabled, a valid inviteToken is required";
}

export class InviteTokenNotFoundError extends Error {
  message = this.message || "Invite token not found";
}

export class InviteTokenEmailError extends Error {
  message =
    this.message ||
    "The email specified is not associated with the invite token";
}

export class ResourceNotFoundError extends Error {
  message = this.message || "The requested resource was not found";
}

export class CredentialsNotFoundError extends Error {
  message =
    this.message ||
    "Credentials not found for this user, did you mean to sign in with OAuth?";
}

export class InvalidCredentialsError extends Error {
  message = this.message || "Invalid username and password combination";
}

export class InvalidAuthenticationProviderError extends Error {
  message = this.message || "Invalid authentication provider";
}

export class PermissionError extends Error {
  message =
    this.message || "You do not have the appropriate permissions for that";
}

export class DuplicateDeploymentLabelError extends Error {
  constructor(deploymentName) {
    super();
    this.message = `Workspace already has a deployment named ${deploymentName}`;
  }
}
