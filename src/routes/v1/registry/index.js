import authorization from "./authorization";
import events from "./events";
import express from "express";

// Create router for registry.
const router = new express.Router();

// Set up nested routes.
router.use("/authorization", authorization);
router.use("/events", events);

export default router;
