import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from "url";
import path from "path";
import { Resume } from "../models/resume.model.js";
const __filename = fileURLToPath(import.meta.url);

const getResumeData = asyncHandler(async (req, res) => {
  const { text1, textData } = req.body;
  const apiKey = "AIzaSyAyPsTerALDuCPTCUo04etY7z7jKJfkj6I";
  if (text1 === "") {
    throw new ApiError(400, "text required");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  let data = {};

  const prompt1 = `Convert the following unstructured text into a structured document in JSON format use personal_information, education, projects, experience, skills, achievements, programming_languages, job_description_match as keys, if needed. ${text1}.
  include one parameter in above structured data with just number how much job description match with resume out of 100 and do not include any comments ,
   ${textData}
`;

  const prompt = `
Convert the following unstructured text into a structured document in JSON format.

Sample Resume Data
John Doe
123 Main Street, Cityville, NY 56789
Email: john.doe@example.com | Phone: (123) 456-7890
LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

Professional Summary
Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing scalable applications. Adept at collaborating with cross-functional teams to deliver high-quality software solutions.

Skills
Programming Languages: JavaScript, Python, Java, C++
Frameworks & Libraries: React.js, Node.js, Django, Express
Tools: Git, Docker, Jenkins, Kubernetes
Databases: MySQL, MongoDB, PostgreSQL
Other: Agile Methodologies, RESTful APIs, CI/CD, Cloud Services (AWS, Azure)
Work Experience
Senior Software Engineer
XYZ Tech Solutions, New York, NY
January 2020 – Present

Led the design and implementation of a large-scale customer management system, improving user retention by 30%.
Optimized application performance, reducing API response times by 40%.
Collaborated with cross-functional teams to ensure project delivery on time and within budget.
Mentored junior developers and conducted code reviews to uphold quality standards.
Software Developer
ABC Innovations, San Francisco, CA
July 2017 – December 2019

Developed and maintained web applications using React and Node.js.
Automated data processing workflows, reducing manual effort by 25%.
Integrated third-party APIs to enhance application functionality.
Participated in Agile ceremonies and contributed to sprint planning and retrospectives.
Education
Bachelor of Science in Computer Science
University of Example, Cityville, NY
Graduated: May 2017

Certifications
AWS Certified Solutions Architect – Associate
Certified Kubernetes Administrator (CKA)
Projects
E-commerce Platform

Built a fully functional e-commerce application with React and Node.js.
Integrated payment gateways and implemented user authentication.
Task Management System

Designed a task-tracking app using Python and Django.
Implemented real-time updates with WebSocket support.

`;
  const result = await model.generateContent(prompt1);
  console.log(result.response.text());
  data = JSON.parse(result.response.text().slice(8, -5));
  await Resume.create({ data });
  res.status(200).json(new ApiResponse(200, data));
});

const getAllResume = asyncHandler(async (req, res) => {
  const data = await Resume.aggregate([
    {
      $sort: { job_description_match: 1 },
    },
  ]);
  res.status(200).json(new ApiResponse(200, data));
});

export { getResumeData, getAllResume };
