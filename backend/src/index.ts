import "dotenv/config";
import express from "express";

const app = express();

app.get("/health", (_request, response) => {
	response.status(200).json({ status: "ok" });
});

const port = Number(process.env["PORT"]) || 3001;

app.listen(port, () => {
	console.log(`Backend running on port ${port}`);
});
