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
