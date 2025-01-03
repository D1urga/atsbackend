import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Job } from "../models/jobpost.model.js";

const postJob = asyncHandler(async (req, res) => {
  const {
    jobTitle,
    description,
    department,
    location,
    employmentType,
    salaryRange,
  } = req.body;

  const data = await Job.create({
    jobTitle,
    description,
    department,
    location,
    employmentType,
    salaryRange,
  });
  res.status(200).json(new ApiResponse(200, data));
});

export { postJob };
