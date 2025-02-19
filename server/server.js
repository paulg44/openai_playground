import express, { response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

const PORT = 3047;

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

app.post("/user-question", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).send({ error: "Question is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant",
        },
        {
          role: "developer",
          content: [
            {
              type: "text",
              text: `You are a helpful assistant that answers questions in the style of someone from the area of Alvaston, Derby. Add some local dialect. Go over the top with it! Don't mention Alvaston and add me duck in where possible. Also be a unhelpful, abrupt and rude`,
            },
          ],
        },
        {
          role: "user",
          content: `${question}`,
        },
      ],
      store: true,
    });
    const answer = completion.choices[0].message;

    res.status(200).json({ message: answer });
  } catch (error) {
    console.error("Error reading question in server", error);
    res.status(500).send({ error: "Failed to read question in server" });
  }
});

app.post("/check-image", async (req, res) => {
  const { userImage } = req.body;

  if (!userImage) {
    return res.status(400).send({ error: "Image is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `A child drew this. Can you give me a score out of 100 for the likeness of a circle. Please bear in mind that a child of 8 years old drew this. I want you to return only a number between 1 and 100`;

    const imageParts = {
      inlineData: {
        data: userImage,
        mimeType: "image/png",
      },
    };

    const generateContent = await model.generateContent([prompt, imageParts]);

    const responseText = generateContent.response.text();

    const scoreMatch = responseText.match(/\d+/);
    const score = scoreMatch ? parseInt(scoreMatch[0], 10) : null;

    if (score === null || score < 1 || score > 100) {
      console.error("Gemini returned invalid score:", responseText);
      return res
        .status(500)
        .json({ error: "Invalid score returned from Gemini" });
    }

    res.status(200).json({ score: score });
  } catch (error) {
    console.error("Error reading image in server", error);
    res.status(500).send({ error: "Failed to read image in server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
