import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import route from "./routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("<h1>project endpoint test for blog it api</h1>");
});

app.use("/api", route);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`app listening on port ${port}`));
