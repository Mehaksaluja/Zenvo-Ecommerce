Zenvo - A Modern MERN E-commerce Platform
Zenvo is a full-featured e-commerce application built from the ground up using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a seamless and elegant shopping experience for users and a powerful management dashboard for administrators.

Features
Customer-Facing:
Elegant & Responsive UI: A beautiful, professional, and fully responsive design built with React and Tailwind CSS.

Product Browse: Clean homepage and dedicated shop page to view all products.

Product Details: A detailed view for each product, including descriptions, ratings, and stock status.

Full-Featured Shopping Cart: Add, remove, and update product quantities.

Complete Checkout Flow: A multi-step checkout process including shipping, payment method selection, and order summary.

User Authentication: Secure user registration and login functionality.

Customer Profiles: Users can view their order history and update their profile details.

Admin Dashboard:
User Management: Admins can view a list of all users, edit their details (including granting admin privileges), and delete users.

Product Management: Admins can view all products, create new "sample" products, edit existing product details, and delete products.

Order Management: Admins can view a comprehensive list of all orders from all users and mark any order as "delivered."

Tech Stack
Backend
Node.js: JavaScript runtime environment.

Express.js: Web framework for building the RESTful API.

MongoDB: NoSQL database for storing product, user, and order data.

Mongoose: Object Data Modeling (ODM) library for MongoDB.

JSON Web Tokens (JWT): For secure user authentication.

Frontend
React: JavaScript library for building the user interface.

Vite: Next-generation frontend tooling for a fast development experience.

Redux Toolkit (RTK Query): For efficient and modern global state management and data fetching.

Tailwind CSS: A utility-first CSS framework for custom, responsive designs.

Framer Motion: For creating beautiful and smooth animations.

Installation & Setup
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (which includes npm)

MongoDB or a MongoDB Atlas account

1. Clone the repository
git clone <your-repository-url>
cd <project-folder>

2. Backend Setup
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file in the /backend directory and add the following variables:
# PORT=5000
# MONGO_URI=<your_mongodb_connection_string>
# JWT_SECRET=<your_jwt_secret_key>

# Import sample data into your database (optional, but recommended)
npm run data:import

# Start the backend server
npm run server

3. Frontend Setup
# Navigate to the frontend folder from the root directory
cd ../frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev

Your application should now be running, with the frontend on http://localhost:5173 and the backend on http://localhost:5000.

Available Scripts
Backend (/backend)
npm run server: Starts the backend server using nodemon.

npm run data:import: Seeds the database with sample users and products.

npm run data:destroy: Clears the database of all users and products.

Frontend (/frontend)
npm run dev: Starts the Vite development server for the React app.

npm run build: Builds the app for production.

npm run lint: Lints the project files.
