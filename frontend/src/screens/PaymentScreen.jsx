import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import { motion } from 'framer-motion';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the cart state to check if a shipping address has been entered
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // If there's no shipping address, redirect the user back to the shipping page
  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  // State to hold the selected payment method
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder'); // Navigate to the final step
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-snow py-12 px-4">
      <motion.div
        className="w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CheckoutSteps step1 step2 step3 />

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-heading text-charcoal mb-8 text-center">Payment Method</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <label className="block text-taupe font-semibold mb-3">Select Method</label>
              <div className="flex items-center p-4 border border-gray-300 rounded-lg">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  className="w-5 h-5 text-gold focus:ring-gold"
                  checked // This method is selected by default
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="PayPal" className="ml-3 font-body text-charcoal">
                  PayPal or Credit Card
                </label>
              </div>
            </div>

            <button type="submit" className="w-full mt-6 bg-charcoal text-white font-bold font-body py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg">
              Continue
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentScreen;