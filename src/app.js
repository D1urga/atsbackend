import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import { PredictionServiceClient } from "@google-cloud/aiplatform";

import Configuration from "openai";
import OpenAI from "openai";

import { fileURLToPath } from "url";
import axios from "axios";
import pkg from "form-data";
import fetch from "node-fetch";

import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import resumeRouter from "./routes/resume.routes.js";
import jobRouter from "./routes/job.route.js";
app.use("/api/v1/resume", resumeRouter);
app.use("/api/v1/job", jobRouter);

export { app };
