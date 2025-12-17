import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import { httpLogger } from "./middlewares/http-logger.middleware";
import { DB_Connection } from "./config/data-source";
import contactRoutes from "./routes/contact.routes";
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

app.get('/', (req, res) => {
  res.send('Hello Work for me!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
