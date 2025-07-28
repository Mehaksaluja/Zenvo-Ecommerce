import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import { motion } from 'framer-motion';

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

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
    <div className="min-h-[80vh] flex items-center justify-center bg-snow py-12 px-4">
      <motion.div
        className="w-full max-w-md mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CheckoutSteps step1 step2 />
        <h1 className="text-4xl font-heading text-charcoal mb-8 text-center">Shipping Details</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-taupe mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-taupe mb-2" htmlFor="city">City</label>
            <input type="text" id="city" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" required />
          </div>
          <div className="mb-4">
            <label className="block text-taupe mb-2" htmlFor="postalCode">Postal Code</label>
            <input type="text" id="postalCode" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Enter postal code" required />
          </div>
          <div className="mb-4">
            <label className="block text-taupe mb-2" htmlFor="country">Country</label>
            <input type="text" id="country" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter your country" required />
          </div>

          <button type="submit" className="w-full mt-6 bg-charcoal text-white font-bold font-body py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg">
            Continue to Payment
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ShippingScreen;