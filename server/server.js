import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

const PORT = 3047;

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

app.post("/user-question", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).send({ error: "Question is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant",
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
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "A child drew this. Can you give me a score out of 100 for the likeness of a square. Please bear in mind that a child of 8 years old drew this. I want you to return only a number between 1 and 100",
            },
            {
              type: "image",
              image: {
                base64: userImage,
              },
            },
          ],
        },
      ],
      store: true,
    });

    const userScore = completion.choices[0].message;
    res.status(200).json({ message: userScore });
  } catch (error) {
    console.error("Error reading image in server", error);
    res.status(500).send({ error: "Failed to read image in server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
