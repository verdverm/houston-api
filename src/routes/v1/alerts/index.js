import post from "./post";
import express from "express";

const router = new express.Router();

// Configure JSON parsing express middleware.
router.use(
  express.json({
    type: ["application/json"]
  })
);

router.post("/", post);

export default router;
