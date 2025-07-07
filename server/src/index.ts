import express from "express";
import blog from "./routes/blog";

const app = express();

app.get("/", (_req, res) => {
  res.send("<h1>project endpoint test for blog it api</h1>");
});

app.use("/api", blog);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`app listening on port ${port}`));
