import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userControllers.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-status", getApplicationStats);
router.patch("/update-user", updateUser);

export default router;
