import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Rating from './Rating'; // Import the Rating component

const ProductCard = ({ product }) => {
  // Animation for each card as it appears
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col"
      variants={cardVariants}
    >
      {/* Image Container */}
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
        </Link>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-heading text-charcoal mb-2">
          <Link to={`/product/${product._id}`} className="hover:text-gold transition-colors">
            {product.name}
          </Link>
        </h3>

        {/* Rating Display */}
        <div className="my-2">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>

        <p className="text-xl font-body font-semibold text-charcoal mt-auto">
          ${product.price}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
