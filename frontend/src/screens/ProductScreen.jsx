import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Rating from '../components/Rating';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiMinus, FiPlus, FiHeart } from 'react-icons/fi';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleQtyChange = (amount) => {
    const newQty = qty + amount;
    if (newQty > 0 && newQty <= product.countInStock) {
      setQty(newQty);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-taupe hover:text-charcoal mb-8 transition-colors">
          <FiChevronLeft className="mr-1" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          <motion.div
            className="rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover shadow-xl" />
          </motion.div>

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl lg:text-5xl font-heading text-charcoal mb-3">{product.name}</h1>

            <p className="text-3xl font-body font-semibold text-charcoal mb-4">${product.price}</p>

            <div className="mb-6 border-b border-t border-gray-200 py-4">
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </div>

            <p className="font-body text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <div className="flex items-center justify-between mb-6">
              <span className="font-body font-semibold text-charcoal">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button onClick={() => handleQtyChange(-1)} className="p-3 text-taupe hover:text-charcoal transition-colors">
                  <FiMinus />
                </button>
                <span className="px-4 font-semibold text-lg">{qty}</span>
                <button onClick={() => handleQtyChange(1)} className="p-3 text-taupe hover:text-charcoal transition-colors">
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="mt-auto pt-4 flex items-center gap-4">
              <button
                className="w-full bg-charcoal text-white font-bold font-body py-4 rounded-lg text-center hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="p-4 bg-gray-100 rounded-lg text-charcoal hover:bg-gold hover:text-white transition-all duration-300">
                <FiHeart size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;