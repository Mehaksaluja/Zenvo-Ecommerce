import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import { motion } from 'framer-motion';
import CheckoutSteps from '../components/CheckoutSteps';
import { FaPaypal } from 'react-icons/fa';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="bg-snow min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
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
            <fieldset className="mb-6">
              <legend className="block text-taupe font-semibold mb-3">Select Method</legend>

              <div
                onClick={() => setPaymentMethod('PayPal')}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${paymentMethod === 'PayPal' ? 'border-gold bg-gold/5' : 'border-gray-300'
                  }`}
              >
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  className="w-5 h-5 opacity-0 absolute"
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${paymentMethod === 'PayPal' ? 'border-gold' : 'border-gray-400'
                  }`}>
                  {paymentMethod === 'PayPal' && <div className="w-2.5 h-2.5 bg-gold rounded-full"></div>}
                </div>
                <FaPaypal size={24} className="text-[#00457C] mr-3" />
                <label htmlFor="PayPal" className="font-body text-charcoal cursor-pointer">
                  PayPal or Credit Card
                </label>
              </div>
            </fieldset>

            <button type="submit" className="w-full mt-6 bg-gold text-charcoal font-bold font-body py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg transform hover:scale-105">
              Continue
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentScreen;
