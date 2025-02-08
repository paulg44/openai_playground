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

// DON'T ACTUALLY NEED THIS FUNCTION. I CAN JUST SEND IT BACK THROUGH THE POST
// app.get("/answer", async (req, res) => {
//   try {
//     const answer = "This is a test answer to be displayed on page";
//     res.status(200).json({ message: answer });
//   } catch (error) {
//     console.error("Error sending answer from server side:", error);
//     res
//       .status(500)
//       .json({ error: "Failed to send answer to client form server side" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
