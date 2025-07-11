import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import user from "./routes/user";

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOption));

app.get("/", (_req, res) => {
  res.send("<h1>project endpoint test for blog it api</h1>");
});

app.use("/api", user);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`app listening on port ${port}`));
