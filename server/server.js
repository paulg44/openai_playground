import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3047;

app.post("/user-question", async (req, res) => {
  const { question } = req.body;

  try {
    const receivedQuestion = question;
    res.json({ message: `Question asked: ${receivedQuestion}` });
  } catch (error) {
    console.error("Error reading question in server", error);
    res.status(500).send({ error: "Failed to read question in server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
