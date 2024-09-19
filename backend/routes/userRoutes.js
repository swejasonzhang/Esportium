import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
    res.send("Register Controller Working")
})

export default router;

