import "dotenv/config";
import express from "express";
import authRouter from './AuthRoutes'
import protectedRoutes from './protectedRoutes'
import authenticateToken from "./Middleware/authMiddleware";
import publicRoutes from './publicRoute'
import cors from 'cors'
import path from 'path'
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
app.use('/api/publucRoutes/', publicRoutes)

const publicPath = path.join(__dirname,'..','public')
app.use('/images',express.static('public'))

app.get('/images/:filename',async(req,res)=>{
    const filename = req.params.filename
    const filePath = path.join(publicPath,filename)

    if(!filePath){
        res.status(404).json({errorMessage:"Invalid Method"})
    }

    res.sendFile(filePath,(error)=>{
        res.status(404).json({errorMessage:"Image not found"})
    })
})


const port = Number(process.env["PORT"]) || 3001;

app.listen(port, () => {
	console.log(`Backend running on port ${port}`);
});

