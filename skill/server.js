const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");

const { analyzeResume } = require("./controllers/resumeController");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("resume"), analyzeResume);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
