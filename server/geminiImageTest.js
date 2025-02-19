import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs-extra";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt =
    "A child drew this. Can you give me a score out of 100 for the likeness of a circle. Please bear in mind that a child of 8 years old drew this. I want you to return only a number between 1 and 100";

  const imageParts = fileToGenerativePart(
    "images/circle-user.png",
    "image/png"
  );

  const generatedContent = await model.generateContent([prompt, imageParts]);

  console.log(generatedContent.response.text());
}

run();
