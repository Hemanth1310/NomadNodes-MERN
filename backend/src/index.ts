import "dotenv/config";
import express from "express";
import authRouter from './AuthRoutes'
const app = express();

app.use('/api/auth/', authRouter )

const port = Number(process.env["PORT"]) || 3001;

app.listen(port, () => {
	console.log(`Backend running on port ${port}`);
});
