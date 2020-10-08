const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");

router.post("/login", userController.login); // {email: "", password: ""}

router.post("/signup", userController.signup); // {email: "", password: ""}

router.delete("/:userId",checkAuth ,userController.delete); // JWT in the header + ID in the url

router.get("/", checkAuth, userController.all);

module.exports = router;