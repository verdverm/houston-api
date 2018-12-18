export class PermissionError extends Error {
  message =
    this.message || "You do not have the appropriate permissions for that";
}
