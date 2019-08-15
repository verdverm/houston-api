import get from "./get";
import express from "express";

const router = new express.Router();
router.get("/", get);

export default router;
