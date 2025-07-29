import express from 'express'
import path from 'path';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cors from 'cors'

dotenv.config()
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. API ROUTES MUST COME FIRST ---
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// --- 2. PRODUCTION DEPLOYMENT LOGIC COMES AFTER ---
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000; // Use port 5000 to match your proxy
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));