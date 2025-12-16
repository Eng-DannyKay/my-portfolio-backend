import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import { httpLogger } from "./src/middlewares/http-logger.middleware";
import { DB_Connection } from "./src/config/data-source";
import contactRoutes from "./src/routes/contact.routes";
const app = express();
const port = 3000;

DB_Connection;
// app.use(httpLogger);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1", contactRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
