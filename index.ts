import { Request, Response } from "express";
import cors from "cors";
import { httpLogger } from "./src/middlewares/http-logger.middleware";
import { DB_Connection } from "./src/config/data-source";

const express = require("express");
const app = express();
const port = 3000;

DB_Connection;

app.use(httpLogger);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
