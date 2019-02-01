import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError
} from "apollo-server";

export class PublicSignupsDisabledError extends Error {
  message =
    this.message ||
    "Public signups are disabled, a valid inviteToken is required";
}

export class InviteTokenNotFoundError extends UserInputError {
  message = this.message || "Invite token not found";
}

export class InviteTokenEmailError extends UserInputError {
  message =
    this.message ||
    "The email specified is not associated with the invite token";
}

export class ResourceNotFoundError extends Error {
  message = this.message || "The requested resource was not found";
}

export class CredentialsNotFoundError extends AuthenticationError {
  message =
    this.message ||
    "Credentials not found for this user, did you mean to sign in with OAuth?";
}

export class InvalidCredentialsError extends ApolloError {
  name = "InvalidCredentialsError";
  constructor() {
    // Orbit currently looks at the _text_ of the error message, so don't
    // change this without updating Orbit to look at the code, not the message
    super(
      "Invalid password and username combination",
      "INVAILD_USERNAME_PASSWORD"
    );
  }
}

export class InvalidAuthenticationProviderError extends Error {
  message = this.message || "Invalid authentication provider";
}

export class PermissionError extends ForbiddenError {
  message =
    this.message || "You do not have the appropriate permissions for that";
}

export class DuplicateDeploymentLabelError extends UserInputError {
  constructor(deploymentName) {
    super(`Workspace already has a deployment named ${deploymentName}`);
  }
}

export class InvalidDeploymentError extends Error {
  message = this.message || "Invalid deployment";
}

export class MissingArgumentError extends UserInputError {
  constructor(argName) {
    super();
    this.message = `A required argument was not sent: ${argName}`;
  }
}

export class UserInviteExistsError extends UserInputError {
  message = this.message || "User already invited to workspace";
}

export class JWTValidationError extends AuthenticationError {
  message = this.message || "Invalid JWT";
}

export class InvalidResetToken extends UserInputError {
  message = this.message || "Invalid resetToken";
}
