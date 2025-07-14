import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"  
import foodRouter from "./routes/foodRoute.js"




// app config
const app = express()
const port = 4000


// middleware
app.use(cors())

// db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)  
app.use("/image", express.static("uploads")) // to serve static files from uploads folder

// Add JSON parser for non-file routes (if needed) - moved after routes to avoid interfering with file uploads
app.use(express.json())   

app.get("/",(req,res)=>{
   res.send("API Working")
})

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
    });
});

app.listen(port,()=>{
   console.log(`Server started on http://localhost:${port}`)
})
//mongodb://localhost:27017/