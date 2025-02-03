import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3047;

app.get("/", () => {
  console.log("server success");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
