import "dotenv/config";
import express from "express";
import authRouter from './AuthRoutes'
import protectedRoutes from './protectedRoutes'
import authenticateToken from "./Middleware/authMiddleware";
const app = express();

app.use('/api/auth/', authRouter )
app.use('/api/protectedRoutes/',authenticateToken, protectedRoutes)

const port = Number(process.env["PORT"]) || 3001;

app.listen(port, () => {
	console.log(`Backend running on port ${port}`);
});
