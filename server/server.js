import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { runTest } from "./src/services/runner.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => res.send("Automation MVP API running"));

// run test
app.post("/api/run-test", async (req, res) => {
  try {
    const { url, platform } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const result = await runTest({ url, platform });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
