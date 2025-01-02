import { Schema } from "mongoose";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    data: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema);
