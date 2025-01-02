import { Router } from "express";
import {
  getAllResume,
  getResumeData,
} from "../controllers/resume.controller.js";

const router = Router();

router.route("/getResume").post(getResumeData);
router.route("/getAllResume").get(getAllResume);

export default router;
