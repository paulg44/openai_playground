import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

const PORT = 3047;

app.post("/user-question", async (req, res) => {
  const { question } = req.body;

  try {
    // const receivedQuestion = question;
    // res.json({ message: `Question asked: ${receivedQuestion}` });
    const answer = "This is a test answer to be displayed on page";
    res.send({ answer });
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
