import handler from "./handler";
import express from "express";

const router = new express.Router();

// Configure JSON parsing express middleware.
router.use(
  express.json({
    type: ["application/json"]
  })
);

// Houston 1 currently defines both methods.
router.post("/", handler);
router.get("/", handler);

export default router;
