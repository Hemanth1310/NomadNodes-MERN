import "dotenv/config";
import express from "express";
import authRouter from './AuthRoutes'
import protectedRoutes from './protectedRoutes'
import authenticateToken from "./Middleware/authMiddleware";
import cors from 'cors'
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use('/api/auth/', authRouter )
app.use('/api/protectedRoutes/',authenticateToken, protectedRoutes)

const port = Number(process.env["PORT"]) || 3001;

app.listen(port, () => {
	console.log(`Backend running on port ${port}`);
});

