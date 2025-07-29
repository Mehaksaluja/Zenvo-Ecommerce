import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut, FiSettings, FiGrid, FiGift, FiPhone } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../slices/authSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const navContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const navItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <div className="bg-charcoal text-snow text-center py-2 px-4 text-sm font-body">
        Free Shipping on Orders Over $50
      </div>

      <header className="bg-snow/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-heading font-semibold text-charcoal">
              Zenvo
            </Link>

            <nav className="hidden md:flex flex-grow justify-center gap-10">
              <NavLink to="/" end className={({ isActive }) => `transition-colors ${isActive ? 'text-gold' : 'text-charcoal hover:text-gold'}`}>Home</NavLink>
              <NavLink to="/shop" className={({ isActive }) => `transition-colors ${isActive ? 'text-gold' : 'text-charcoal hover:text-gold'}`}>Shop</NavLink>
              <NavLink to="/contact" className={({ isActive }) => `transition-colors ${isActive ? 'text-gold' : 'text-charcoal hover:text-gold'}`}>Contact</NavLink>
            </nav>

            <div className="hidden md:flex items-center justify-end gap-6">
              <Link to="/cart" className="relative text-charcoal p-2 rounded-full hover:bg-gray-200 transition-colors">
                <FiShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-gold text-white text-xs font-bold rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {userInfo ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 font-semibold font-body text-charcoal p-2 rounded-full">
                    <FiUser className="w-6 h-6" />
                  </button>
                  <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-lg shadow-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50 transform group-hover:translate-y-0 translate-y-2">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold text-charcoal truncate">{userInfo.name}</p>
                      <p className="text-sm text-taupe truncate">{userInfo.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-charcoal hover:bg-snow transition-colors">
                      <FiSettings size={16} /> Profile
                    </Link>
                    <button onClick={logoutHandler} className="w-full flex items-center gap-3 text-left px-4 py-3 text-charcoal hover:bg-snow transition-colors">
                      <FiLogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="text-charcoal p-2 rounded-full hover:bg-gray-200 transition-colors">
                  <FiUser className="w-6 h-6" />
                </Link>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(true)} className="p-2">
                <FiMenu className="w-6 h-6 text-charcoal" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <div className="md:hidden" key="mobile-menu">
            <motion.div variants={backdropVariants} initial="hidden" animate="visible" exit="exit" onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></motion.div>
            <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit" className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-snow shadow-lg z-50 flex flex-col">
              <div className="p-6 flex items-center justify-between border-b border-gray-200">
                <span className="text-xl font-heading font-semibold text-charcoal">Zenvo</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2"><FiX className="w-6 h-6 text-charcoal" /></button>
              </div>
              <motion.nav className="flex-grow p-4 flex flex-col gap-2" variants={navContainerVariants} initial="hidden" animate="visible">
                <motion.div variants={navItemVariants}><NavLink to="/" end onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-base p-3 w-full rounded-md text-charcoal hover:bg-gold hover:text-white transition-colors"><FiGrid />Home</NavLink></motion.div>
                <motion.div variants={navItemVariants}><NavLink to="/shop" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-base p-3 w-full rounded-md text-charcoal hover:bg-gold hover:text-white transition-colors"><FiGift />Shop</NavLink></motion.div>
                <motion.div variants={navItemVariants}><NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-base p-3 w-full rounded-md text-charcoal hover:bg-gold hover:text-white transition-colors"><FiPhone />Contact</NavLink></motion.div>
              </motion.nav>
              <div className="p-4 border-t border-gray-200">
                {userInfo ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-center text-sm text-taupe mb-2">Welcome, {userInfo.name}</p>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-3 text-base p-3 w-full rounded-md bg-gray-200 text-charcoal hover:bg-opacity-90 transition-colors"><FiSettings /> Profile</Link>
                    <button onClick={() => { logoutHandler(); setIsMenuOpen(false); }} className="flex items-center justify-center gap-3 text-base p-3 w-full rounded-md bg-charcoal text-white hover:bg-opacity-90 transition-colors"><FiLogOut /> Logout</button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-3 text-base p-3 w-full rounded-md bg-charcoal text-white hover:bg-opacity-90 transition-colors"><FiUser /> Sign In</Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
