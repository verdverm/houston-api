import healthz from "./healthz";
import oauth from "./oauth";
import oauthRedirect from "./oauth-redirect";
import express from "express";

// Create top level router for v1.
const router = new express.Router();

// Attach routes.
router.use("/healthz", healthz);
router.use("/oauth", oauth);
router.use("/oauth_redirect", oauthRedirect);

// Export the v1 router.
export default router;
