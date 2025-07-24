import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiShoppingBag, FiUser, FiMenu, FiX, FiHome, FiMail } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation variants for the menu panel and backdrop
  const menuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Staggered animation for the list items in the mobile menu
  const navContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-charcoal text-snow text-center py-2 px-4 text-sm font-body">
        Free Shipping on Orders Over $50
      </div>

      {/* Main Header */}
      <header className="bg-snow/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-3xl font-heading font-semibold text-charcoal">
              Zenvo
            </Link>

            {/* Central Navigation (Desktop) */}
            <nav className="hidden md:flex flex-grow justify-center gap-10">
              <NavLink to="/" end className={({ isActive }) => `transition-colors ${isActive ? 'text-gold' : 'text-charcoal hover:text-gold'}`}>Home</NavLink>
              <NavLink to="/shop" className={({ isActive }) => `transition-colors ${isActive ? 'text-gold' : 'text-charcoal hover:text-gold'}`}>Shop</NavLink>
              <NavLink to="/contact" className={({ isActive }) => `transition-colors ${isActive ? 'text-gold' : 'text-charcoal hover:text-gold'}`}>Contact</NavLink>
            </nav>

            {/* Action Icons (Desktop) */}
            <div className="hidden md:flex items-center justify-end gap-6">
              <Link to="/login" className="text-charcoal p-2 rounded-full hover:bg-gray-200 transition-colors">
                <FiUser className="w-5 h-5" />
              </Link>
              <Link to="/cart" className="text-charcoal p-2 rounded-full hover:bg-gray-200 transition-colors">
                <FiShoppingBag className="w-5 h-5" />
              </Link>
            </div>

            {/* Mobile Menu Button (Hamburger) */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(true)} className="p-2">
                <FiMenu className="w-6 h-6 text-charcoal" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="md:hidden" key="mobile-menu">
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            ></motion.div>

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-snow shadow-lg z-50 flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-200">
                <span className="text-xl font-heading font-semibold text-charcoal">Zenvo</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <FiX className="w-6 h-6 text-charcoal" />
                </button>
              </div>

              <motion.nav
                className="flex-grow p-4 flex flex-col gap-2"
                variants={navContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={navItemVariants}>
                  <NavLink to="/" end onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-base p-3 w-full rounded-md text-charcoal hover:bg-gold hover:text-white transition-colors">
                    <FiHome /> Home
                  </NavLink>
                </motion.div>
                <motion.div variants={navItemVariants}>
                  <NavLink to="/shop" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-base p-3 w-full rounded-md text-charcoal hover:bg-gold hover:text-white transition-colors">
                    <FiShoppingBag /> Shop
                  </NavLink>
                </motion.div>
                <motion.div variants={navItemVariants}>
                  <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-base p-3 w-full rounded-md text-charcoal hover:bg-gold hover:text-white transition-colors">
                    <FiMail /> Contact
                  </NavLink>
                </motion.div>
              </motion.nav>

              <div className="p-4 border-t border-gray-200">
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-3 text-base p-3 w-full rounded-md bg-charcoal text-white hover:bg-opacity-90 transition-colors">
                  <FiUser /> Sign In
                </NavLink>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;