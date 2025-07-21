import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
const app = express();
dotenv.config()
connectDB();

app.get("/", (req, res) => {
  res.json({
    msg: "Server is running."
  })
})

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`App is running on port ${PORT}`));