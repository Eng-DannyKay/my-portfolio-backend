import cors from "cors";
import express from "express";
import { DB_Connection } from "./config/data-source";
import contactRoutes from "./routes/contact.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://danielforson-portfolio.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1", contactRoutes);

app.get('/', (req, res) => {
  res.send('Server is running')
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const startServer = async () => {
  try {
    await DB_Connection.initialize();
    console.log('Database connected successfully');
    
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();