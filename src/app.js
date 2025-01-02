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

// const client = new PredictionServiceClient({
//   keyFilename: "./public/temp/service-account.json", // Path to your service account key
// });

// const configuration = new Configuration({
//   apiKey:
//     "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",
// });
// const openai = new OpenAI(configuration);
// async function summarizeResume(resumeText) {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo", // or "gpt-4"
//       messages: [
//         {
//           role: "system",
//           content: "You are a helpful assistant summarizing resumes.",
//         },
//         { role: "user", content: `Summarize this resume: ${resumeText}` },
//       ],
//     });
//     return response.data.choices[0].message.content.trim();
//   } catch (error) {
//     console.error(
//       "Error summarizing resume:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// }

// // Example usage
// (async () => {
//   const resumeText =
//     "John Doe is a software engineer with 5 years of experience in web development...";
//   const summary = await summarizeResume(resumeText);
//   console.log("Summary:", summary);
// })();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const API_URL = "https://api.affinda.com/v1/documents/";
// const API_KEY = "aff_1526a3da4ec7f7e894a649a9b1c5da81d466f734";
// const apiKey = "AIzaSyAyPsTerALDuCPTCUo04etY7z7jKJfkj6I";
// let data = {};
// // Make sure to include these imports:
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const prompt = `
// Convert the following unstructured text into a structured document in JSON format.

// Sample Resume Data
// John Doe
// 123 Main Street, Cityville, NY 56789
// Email: john.doe@example.com | Phone: (123) 456-7890
// LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

// Professional Summary
// Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing scalable applications. Adept at collaborating with cross-functional teams to deliver high-quality software solutions.

// Skills
// Programming Languages: JavaScript, Python, Java, C++
// Frameworks & Libraries: React.js, Node.js, Django, Express
// Tools: Git, Docker, Jenkins, Kubernetes
// Databases: MySQL, MongoDB, PostgreSQL
// Other: Agile Methodologies, RESTful APIs, CI/CD, Cloud Services (AWS, Azure)
// Work Experience
// Senior Software Engineer
// XYZ Tech Solutions, New York, NY
// January 2020 – Present

// Led the design and implementation of a large-scale customer management system, improving user retention by 30%.
// Optimized application performance, reducing API response times by 40%.
// Collaborated with cross-functional teams to ensure project delivery on time and within budget.
// Mentored junior developers and conducted code reviews to uphold quality standards.
// Software Developer
// ABC Innovations, San Francisco, CA
// July 2017 – December 2019

// Developed and maintained web applications using React and Node.js.
// Automated data processing workflows, reducing manual effort by 25%.
// Integrated third-party APIs to enhance application functionality.
// Participated in Agile ceremonies and contributed to sprint planning and retrospectives.
// Education
// Bachelor of Science in Computer Science
// University of Example, Cityville, NY
// Graduated: May 2017

// Certifications
// AWS Certified Solutions Architect – Associate
// Certified Kubernetes Administrator (CKA)
// Projects
// E-commerce Platform

// Built a fully functional e-commerce application with React and Node.js.
// Integrated payment gateways and implemented user authentication.
// Task Management System

// Designed a task-tracking app using Python and Django.
// Implemented real-time updates with WebSocket support.

// `;

// const result = await model.generateContent(prompt);
// data = JSON.parse(result.response.text().slice(8, -5));
// console.log(result.response.text().slice(8, -5));

// app.get("/api", async (req, res) => {
//   res.json({ data: data });
// });

import resumeRouter from "./routes/resume.routes.js";
app.use("/api/v1/resume", resumeRouter);

export { app };
