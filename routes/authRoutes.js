import express from "express";
import { authenticateJWT, authorizeUser, validateUserDetails } from "../middlewares/authMiddleware.js";
import { login, createUser, deleteUser, updateUser, updateUserPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", validateUserDetails, createUser);
router.delete("/delete/:id", authenticateJWT, authorizeUser, deleteUser);
router.put("/update/:id", authenticateJWT, authorizeUser, updateUser);
router.put("/updatePassword/:id", authenticateJWT, authorizeUser, updateUserPassword);

export default router;