import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Rating from './Rating';
import { FiShoppingBag } from 'react-icons/fi';
import { addToCart } from '../slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate('/cart');
  };

  return (
    <motion.div
      className="group relative flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl border border-transparent hover:border-gold/30"
      variants={cardVariants}
    >
      <div className="relative overflow-hidden">
        <Link to={`/product/${product._id}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-4 right-4">
          <motion.button
            onClick={addToCartHandler}
            className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 hover:bg-gold hover:text-white"
            whileTap={{ scale: 0.95 }}
            aria-label="Add to Cart"
          >
            <FiShoppingBag className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product._id}`} className="hover:text-gold transition-colors">
          <h3 className="text-xl font-heading text-charcoal mb-2 truncate" title={product.name}>
            {product.name}
          </h3>
        </Link>

        <div className="my-2">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>

        <div className="flex justify-between items-center mt-auto pt-4">
          <p className="text-2xl font-body font-semibold text-charcoal">
            ${product.price}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;