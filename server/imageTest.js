/* 
I'm unsure how accurate the scoring will be. I think if I were to do it this way I would have to play around with different prompts to get an outcome. 

Things that need to be variables sent from client
- child's age
- shape (currently circle)
- image (not image url needs to be base64 file)
*/

import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "A child drew this. Can you give me a score out of 100 for the likeness of a circle. Please bear in mind that a child of 8 years old drew this. I want you to return only a number between 1 and 100",
        },
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
