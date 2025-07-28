import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { updateCartQuantity, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const subtotalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  const quantityChangeHandler = (item, qty) => {
    if (qty > 0 && qty <= item.countInStock) {
      dispatch(updateCartQuantity({ _id: item._id, qty }));
    }
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-heading text-charcoal">Your Cart</h1>
          <Link to="/shop" className="group flex items-center text-taupe hover:text-gold transition-colors">
            <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-white rounded-lg shadow-md"
          >
            <p className="text-2xl text-taupe mb-6">Your shopping cart is empty.</p>
            <Link to="/shop" className="bg-charcoal text-white font-bold font-body py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors">
              Discover Our Collection
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <motion.div
              className="lg:col-span-8 bg-white p-6 rounded-lg shadow-md flex flex-col gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-200 pb-6 last:border-b-0"
                    variants={itemVariants}
                    exit="exit"
                  >
                    <img src={item.image} alt={item.name} className="w-28 h-28 object-cover rounded-lg shadow-sm flex-shrink-0" />
                    <div className="flex-grow text-center sm:text-left">
                      <Link to={`/product/${item._id}`} className="font-heading text-xl hover:text-gold transition-colors">{item.name}</Link>
                      <p className="font-semibold text-charcoal mt-1">${item.price}</p>
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-full mx-4">
                      <button onClick={() => quantityChangeHandler(item, item.qty - 1)} className="p-2 text-taupe hover:text-charcoal transition-colors disabled:opacity-50" disabled={item.qty === 1}>
                        <FiMinus />
                      </button>
                      <span className="px-4 font-semibold text-lg">{item.qty}</span>
                      <button onClick={() => quantityChangeHandler(item, item.qty + 1)} className="p-2 text-taupe hover:text-charcoal transition-colors disabled:opacity-50" disabled={item.qty === item.countInStock}>
                        <FiPlus />
                      </button>
                    </div>
                    <div className="text-lg font-semibold text-charcoal w-24 text-center">
                      ${(item.qty * item.price).toFixed(2)}
                    </div>
                    <button onClick={() => removeFromCartHandler(item._id)} className="text-taupe hover:text-red-500 p-2"><FiTrash2 size={20} /></button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
                <h2 className="text-2xl font-heading border-b border-gray-200 pb-4 mb-6">Order Summary</h2>
                <div className="flex justify-between mb-3 text-lg">
                  <span>Subtotal ({subtotalItems} items)</span>
                  <span className="font-semibold">${totalPrice}</span>
                </div>
                <div className="flex justify-between mb-6 text-lg">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between mb-6 text-2xl font-bold text-charcoal border-t border-gray-200 pt-4">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
                <button
                  onClick={checkoutHandler}
                  className="w-full bg-gold text-charcoal font-bold font-body py-4 rounded-lg hover:bg-opacity-90 transition-colors transform hover:scale-105"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;