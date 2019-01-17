import express from "express";

const router = new express.Router();
router.use(express.static(`${__dirname}/static`));

export default router;
