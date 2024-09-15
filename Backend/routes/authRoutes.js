import express from "express";
import
  {
    signUp,
    activateUser,
    login,
    refreshToken,
    updatePassword,
  } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/protectRoutes.js";

const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/activateUser").post(activateUser);
router.route("/login").post(login);
router.route("/refresh-token").get(refreshToken);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").patch(resetPassword);

router.use(isAuthenticated);
router.route("/update-password").patch(updatePassword);

export default router;
