import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.send("<h1>project endpoint test for blog it api</h1>");
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`app listening on port ${port}`));
