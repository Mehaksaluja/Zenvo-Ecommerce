import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = () => {
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  return (
    <motion.header
      className="bg-alabaster shadow-md sticky top-0 z-50"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-3xl font-playfair text-midnight hover:text-gold-accent transition-colors duration-300">
            Zenvo
          </Link>

          <div className="hidden md:flex items-center border-2 border-gray-300 rounded-full py-2 px-4 w-1/3">
            <input
              type="text"
              placeholder="Find the perfect gift..."
              className="bg-transparent focus:outline-none w-full font-lato"
            />
            <FaSearch className="text-gray-500" />
          </div>

          <nav className="flex items-center space-x-6 text-lg">
            <Link to="/cart" className="flex items-center text-midnight hover:text-teal-accent transition-colors duration-300">
              <FaShoppingCart className="mr-2" />
              <span>Cart</span>
            </Link>
            <Link to="/login" className="flex items-center text-midnight hover:text-teal-accent transition-colors duration-300">
              <FaUser className="mr-2" />
              <span>Sign In</span>
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
