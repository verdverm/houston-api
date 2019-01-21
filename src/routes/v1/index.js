import alerts from "./alerts";
import healthz from "./healthz";
import oauthRedirect from "./oauth-redirect";
import oauth from "./oauth";
import registryEvents from "./registry-events";
import express from "express";

// Create top level router for v1.
const router = new express.Router();

// Attach routes.
router.use("/alerts", alerts);
// TODO: Implement /authorization.
router.use("/healthz", healthz);
router.use("/oauth_redirect", oauthRedirect);
router.use("/oauth", oauth);
router.use("/registry_events", registryEvents);
// TODO: Implement /registry.

// Export the v1 router.
export default router;
