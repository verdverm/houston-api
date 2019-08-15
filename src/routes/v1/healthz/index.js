import get from "./get";
import { catchAsyncError } from "errors";
import express from "express";

const router = new express.Router();
router.get("/", catchAsyncError(get));

export default router;
