import post from "./post";
import express from "express";

const router = new express.Router();

// Configure JSON parsing express middleware.
router.use(
  express.json({
    type: ["application/json"]
  }),
  express.urlencoded({ extended: false })
);

function catchAsyncError(asyncFn) {
  return async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

// Setup the POST route.
router.post("/", catchAsyncError(post));

export default router;
