import { Router } from "express";
import { postJob } from "../controllers/job.controller.js";

const router = Router();

router.route("/postJob").post(postJob);

export default router;
