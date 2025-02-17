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

const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "Does this image look like a circle" },
        {
          type: "image_url",
          image_url: {
            url: "https://www.drawinghowtodraw.com/stepbystepdrawinglessons/wp-content/uploads/2009/11/howtodrawcartoondog1-1.png",
          },
        },
      ],
    },
  ],
  store: true,
});

console.log(response.choices[0]);
