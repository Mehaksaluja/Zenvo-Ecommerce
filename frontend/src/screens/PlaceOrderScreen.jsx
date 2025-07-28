import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

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

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <CheckoutSteps step1 step2 step3 step4 />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-heading mb-4">Shipping</h2>
              <p><strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-heading mb-4">Payment Method</h2>
              <p><strong>Method:</strong> {cart.paymentMethod}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-heading mb-4">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <Link to={`/product/${item._id}`} className="flex-grow font-semibold hover:text-gold">{item.name}</Link>
                      <div className="text-right">
                        <p>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
              <h2 className="text-2xl font-heading border-b border-gray-200 pb-4 mb-6">Order Summary</h2>
              <div className="flex justify-between mb-3"><span>Items:</span><span className="font-semibold">${cart.itemsPrice}</span></div>
              <div className="flex justify-between mb-3"><span>Shipping:</span><span className="font-semibold">${cart.shippingPrice}</span></div>
              <div className="flex justify-between mb-6"><span>Tax:</span><span className="font-semibold">${cart.taxPrice}</span></div>
              <div className="flex justify-between text-xl font-bold text-charcoal border-t border-gray-200 pt-4"><span>Total:</span><span>${cart.totalPrice}</span></div>

              {error && <div className="text-red-500 my-2">There was an error placing your order.</div>}

              <button
                type="button"
                className="w-full mt-6 bg-gold text-charcoal font-bold font-body py-3 rounded-lg hover:bg-opacity-90 transition-colors transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
                disabled={cart.cartItems.length === 0 || isLoading}
                onClick={placeOrderHandler}
              >
                {isLoading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
