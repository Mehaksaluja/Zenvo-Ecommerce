import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Rating from './Rating';
import { FiPlus } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="group relative flex flex-col bg-white rounded-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-2xl"
      variants={cardVariants}
    >
      <div className="relative overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-3 right-3">
          <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform hover:scale-110">
            <FiPlus className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-heading text-charcoal mb-2">
          <Link to={`/product/${product._id}`} className="hover:text-gold transition-colors">
            {product.name}
          </Link>
        </h3>

        <div className="my-2">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>

        <p className="text-2xl font-body font-semibold text-charcoal mt-auto pt-4">
          ${product.price}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
