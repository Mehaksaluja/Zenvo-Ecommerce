import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-snow">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-[-20%] right-[-20%] top-[-20%] h-[150%] w-[150%] rotate-[-30deg] animate-spin-slow bg-gradient-to-r from-gold/10 via-snow to-snow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Column: Text Content */}
          <div className="text-center md:text-left md:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="font-body text-gold font-semibold uppercase tracking-wider mb-4">
                Summer Collection — Up to 30% Off
              </p>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-heading text-charcoal mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Gifts That Tell a Story
            </motion.h1>

            <motion.p
              className="text-lg font-body text-taupe max-w-lg mx-auto md:mx-0 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Explore our thoughtfully curated collection, designed to create unforgettable moments of elegance and care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                to="/shop"
                className="group inline-flex items-center justify-center bg-charcoal text-white font-bold font-body py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                <span>Shop The Collection</span>
                <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Featured Product Showcase */}
          <div className="hidden md:flex justify-center items-center h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
              className="relative w-96 h-96"
            >
              {/* Soft background glow */}
              <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl"></div>

              {/* Product Image with hover effect */}
              <Link to="/product/66a01b17a80b1e4ca8c5324d"> {/* Replace with a real product ID */}
                <motion.img
                  src="/images/gift.webp" // Make sure this image exists in /public/images
                  alt="Featured Product"
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>

              {/* Small decorative floating elements */}
              <motion.div
                className="absolute top-10 -left-10 w-24 h-24 bg-taupe/20 rounded-2xl blur-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              ></motion.div>
              <motion.div
                className="absolute bottom-10 -right-10 w-20 h-20 bg-charcoal/10 rounded-full blur-md"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              ></motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;