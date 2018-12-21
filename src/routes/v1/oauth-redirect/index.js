import get from "./get";
import express from "express";

const router = new express.Router();
router.use(express.static(`${__dirname}/static`));
router.get("/", get);

export default router;
