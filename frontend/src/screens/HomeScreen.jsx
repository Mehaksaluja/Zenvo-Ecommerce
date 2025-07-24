import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero'; // Import the Hero component
import { motion } from 'framer-motion';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend API when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Animation variants for the grid container to stagger the children's animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Each child will animate 0.1s after the previous one
      },
    },
  };

  return (
    // Use a React Fragment <> to return multiple top-level elements
    <>
      <Hero />

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading text-charcoal">
            Our Collection
          </h1>
          <p className="text-lg text-taupe mt-2">Curated gifts for every special occasion.</p>
        </div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default HomeScreen;
