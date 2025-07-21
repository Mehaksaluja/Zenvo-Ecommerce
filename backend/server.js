import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
const app = express();
dotenv.config()
connectDB();

app.get("/", (req, res) => {
  res.json({
    msg: "Server is running."
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`App is running on port ${PORT}`));