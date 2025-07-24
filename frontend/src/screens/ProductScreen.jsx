// frontend/src/screens/ProductScreen.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from '../components/Rating';
import Breadcrumb from '../components/Breadcrumb'; // <-- IMPORT IT
import { motion } from 'framer-motion';

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  useEffect(() => {
    // ... (fetch logic remains the same)
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* --- REPLACE THE BACK LINK WITH THE BREADCRUMB --- */}
      <Breadcrumb product={product} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Image */}
        <motion.div
          className="rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        {/* Right Column: Details & Actions */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl font-heading text-charcoal mb-4">{product.name}</h1>

          <div className="mb-4">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </div>

          <p className="text-3xl font-body font-semibold text-charcoal mb-6">${product.price}</p>

          <p className="font-body text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {/* Action Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="font-body font-semibold">Price:</span>
              <span className="text-xl font-semibold">${product.price}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-body font-semibold">Status:</span>
              <span className={product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <button
              className="w-full bg-charcoal text-white font-body py-3 rounded-lg text-center hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductScreen;