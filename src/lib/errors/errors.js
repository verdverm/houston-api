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

export class InviteTokenEmailError extends ApolloError {
  name = "InviteTokenEmailError";
  constructor() {
    // Orbit currently looks at the _text_ of the error message, so don't
    // change this without updating Orbit to look at the code, not the message
    super(
      "This email is not associated with the specified invite token",
      "INVITE_EMAIL_NOT_MATCH"
    );
  }
}

export class ResourceNotFoundError extends UserInputError {
  message = this.message || "The requested resource was not found";
}

export class CredentialsNotFoundError extends AuthenticationError {
  message = this.message || "No password credentials found";
}

export class InvalidCredentialsError extends ApolloError {
  // Orbit currently looks at the _text_ of the error message, so don't
  // change this without updating Orbit to look at the code, not the message
  message = this.message || "Invalid password and username combination";
}

export class InvalidAuthenticationProviderError extends Error {
  message = this.message || "Invalid authentication provider";
}

export class PermissionError extends ForbiddenError {
  message =
    this.message || "You do not have the appropriate permissions for that";
}

export class EmailNotConfirmedError extends ApolloError {
  constructor() {
    // Orbit currently looks at the _text_ of the error message, so don't
    // change this without updating Orbit to look at the code, not the message
    super(
      "Your account is awaiting email confirmation",
      "ACCOUNT_NOT_CONFIRMED"
    );
  }
}

export class DeploymentPaymentError extends Error {
  message =
    this.message ||
    "You must add a valid payment method to your workspace before you can create a deployment";
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

export class MissingTLSCertificateError extends Error {
  message = this.message || "TLS Certificate not found, can't sign JWT tokens";
}

export class InvalidResetToken extends UserInputError {
  message = this.message || "Invalid resetToken";
}

export class InvalidToken extends UserInputError {
  message = this.message || "Invalid token";
}

export class InvalidRoleError extends UserInputError {
  message = this.message || "Invalid role";
}

export class DuplicateRoleBindingError extends UserInputError {
  message = this.message || "A duplicate role binding already exists";
}

export class DuplicateEmailError extends Error {
  message = this.message || "Email already in use";
}
