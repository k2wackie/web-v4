const express = require("express");
const router = express.Router();
const userCtrl = require("./userCtrl");
const bulletinCtrl = require("./bulletinCtrl");
const { auth } = require("../middleware/auth");

//Bulletin Board API
router.get("/api/bulletin/read", bulletinCtrl.process.read);
router.post("/api/bulletin/create", bulletinCtrl.process.create);
router.post("/api/bulletin/update", bulletinCtrl.process.update);
router.delete("/api/bulletin/delete/:id", bulletinCtrl.process.delete);

//LOGIN API
router.post("/api/login", userCtrl.process.login);
router.post("/api/user_register", userCtrl.process.create);
router.get("/api/auth", auth, userCtrl.process.auth);
router.get("/api/logout", auth, userCtrl.process.logout);

module.exports = router;
