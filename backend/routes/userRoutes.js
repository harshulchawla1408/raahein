const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");
const { createOrUpdateUser } = require("../controllers/userController");

router.post("/user", verifyFirebaseToken, createOrUpdateUser);

module.exports = router;
