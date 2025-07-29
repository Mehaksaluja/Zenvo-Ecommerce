import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import { motion } from 'framer-motion';
import CheckoutSteps from '../components/CheckoutSteps';
import { FiMapPin, FiNavigation, FiMap, FiGlobe } from 'react-icons/fi';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems, totalPrice } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className="bg-snow min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="w-full max-w-4xl mx-auto">
          <CheckoutSteps step1 step2 />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-heading text-charcoal mb-6">Shipping Address</h1>
              <form onSubmit={submitHandler}>
                <div className="relative mb-4">
                  <FiMapPin className="absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <div className="relative mb-4">
                  <FiNavigation className="absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <div className="relative mb-4">
                  <FiMap className="absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
                  <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" required className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <div className="relative mb-6">
                  <FiGlobe className="absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
                  <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <button type="submit" className="w-full bg-gold text-charcoal font-bold font-body py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg">
                  Continue to Payment
                </button>
              </form>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-heading text-charcoal border-b border-gray-200 pb-4 mb-6">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-taupe">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex justify-between text-lg font-bold text-charcoal">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingScreen;
