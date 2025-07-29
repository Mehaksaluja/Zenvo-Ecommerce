import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { motion } from 'framer-motion';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const Section = ({ title, children }) => (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-heading mb-4 text-charcoal border-b border-gray-200 pb-3">{title}</h2>
      <div className="text-taupe space-y-2">
        {children}
      </div>
    </motion.div>
  );

  return (
    <div className="bg-snow min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <CheckoutSteps step1 step2 step3 step4 />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <Section title="Shipping Details">
              <p><strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
            </Section>

            <Section title="Payment Method">
              <p><strong>Method:</strong> {cart.paymentMethod}</p>
            </Section>

            <Section title="Review Items">
              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-grow">
                        <Link to={`/product/${item._id}`} className="font-semibold hover:text-gold transition-colors">{item.name}</Link>
                        <p className="text-sm text-gray-500">{item.qty} x ${item.price}</p>
                      </div>
                      <div className="font-semibold text-charcoal">
                        ${(item.qty * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </div>

          <div className="lg:col-span-4">
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg sticky top-28"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-heading border-b border-gray-200 pb-4 mb-6">Order Summary</h2>
              <div className="space-y-3 text-taupe">
                <div className="flex justify-between"><span>Items:</span><span className="font-semibold text-charcoal">${cart.itemsPrice}</span></div>
                <div className="flex justify-between"><span>Shipping:</span><span className="font-semibold text-charcoal">${cart.shippingPrice}</span></div>
                <div className="flex justify-between"><span>Tax:</span><span className="font-semibold text-charcoal">${cart.taxPrice}</span></div>
              </div>
              <div className="flex justify-between text-xl font-bold text-charcoal border-t border-gray-200 mt-6 pt-4"><span>Order Total:</span><span>${cart.totalPrice}</span></div>

              {error && <div className="text-red-500 my-4 text-center">There was an error placing your order.</div>}

              <button
                type="button"
                className="w-full mt-6 bg-gold text-charcoal font-bold font-body py-4 rounded-lg hover:bg-opacity-90 transition-colors transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
                disabled={cart.cartItems.length === 0 || isLoading}
                onClick={placeOrderHandler}
              >
                {isLoading ? 'Processing...' : 'Place Order & Pay'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
