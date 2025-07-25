import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  return (
    <div className="relative bg-snow pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-[-50px] left-[-100px] w-96 h-96 bg-gold/10 rounded-full filter blur-3xl"
          animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        ></motion.div>
        <motion.div
          className="absolute bottom-[-50px] right-[-100px] w-96 h-96 bg-taupe/10 rounded-full filter blur-3xl"
          animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        ></motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-heading text-charcoal mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Curated Gifts,
          <span className="italic"> Unforgettable Moments.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl font-body text-taupe max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          From timeless keepsakes to modern treasures, discover the perfect expression of your affection. Each piece in our collection is chosen to delight and inspire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <Link
            to="/shop"
            className="group inline-flex items-center justify-center bg-charcoal text-white font-bold font-body py-4 px-10 rounded-lg text-lg hover:shadow-xl hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>Explore The Collection</span>
            <FiArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
        <motion.div
          className="hidden lg:block absolute top-[10%] left-[5%]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <img src="/images/camera.png" alt="Camera" className="w-24 md:w-32 drop-shadow-xl rounded-lg transform -rotate-12" />
        </motion.div>
        <motion.div
          className="hidden lg:block absolute top-[15%] right-[4%]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <img src="/images/airpods.png" alt="Airpods" className="w-28 md:w-40 drop-shadow-xl rounded-lg transform rotate-6" />
        </motion.div>
        <motion.div
          className="hidden lg:block absolute bottom-[10%] left-[20%]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <img src="/images/watch.png" alt="Watch" className="w-20 md:w-28 drop-shadow-xl rounded-lg transform rotate-12" />
        </motion.div>
        <motion.div
          className="hidden lg:block absolute bottom-[15%] right-[25%]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <img src="/images/perfume.png" alt="Perfume" className="w-20 md:w-24 drop-shadow-xl rounded-lg transform -rotate-6" />
        </motion.div>
      </div>

    </div>
  );
};

export default Hero;