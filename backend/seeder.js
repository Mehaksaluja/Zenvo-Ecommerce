import mongoose from "mongoose";
import dotenv from "dotenv"
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    })

    await Product.insertMany(sampleProducts);
    console.log("Data Imported Successfully!");

    process.exit();
  } catch (error) {
    console.error(`Error ${error}`);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}