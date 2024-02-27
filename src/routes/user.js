const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/", UserController.createUser);

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);

router.post("/login", UserController.loginUser);

module.exports = router;
