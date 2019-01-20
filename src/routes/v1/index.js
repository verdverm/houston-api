import alerts from "./alerts";
import healthz from "./healthz";
import oauthRedirect from "./oauth-redirect";
import oauth from "./oauth";
import express from "express";

// Create top level router for v1.
const router = new express.Router();

// Attach routes.
router.use("/alerts", alerts);
router.use("/healthz", healthz);
router.use("/oauth_redirect", oauthRedirect);
router.use("/oauth", oauth);
// TODO: Implement /registry.
// TODO: Implement /authorization.
// TODO: Implement /registry_events.

// Export the v1 router.
export default router;
