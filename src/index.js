import "dotenv/config";
import express from "express";

import nylasMiddleware from "./middlewares/nylas.js";
import authRouter from "./routes/oauth.js";
import messagesRouter from "./routes/messages.js";

const app = express();

app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(nylasMiddleware);

app.use("/oauth", authRouter);
app.use("/messages", messagesRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
