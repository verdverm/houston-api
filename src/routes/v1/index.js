import alerts from "./alerts";
import authorization from "./authorization";
import healthz from "./healthz";
import oauth from "./oauth";
import registry from "./registry";
import express from "express";

// Create top level router for v1.
const router = new express.Router();

// Attach routes.
router.use("/alerts", alerts);
router.use("/authorization", authorization);
router.use("/healthz", healthz);
router.use("/oauth", oauth);
router.use("/registry", registry);

// Export the v1 router.
export default router;
