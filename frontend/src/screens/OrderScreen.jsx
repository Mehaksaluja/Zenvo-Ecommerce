import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);

  useEffect(() => {
    // Optional: refetch if the orderId changes, though RTK Query handles this well.
  }, [orderId]);

  return isLoading ? (
    <div className="text-center p-12">Loading...</div>
  ) : error ? (
    <div className="text-center p-12 text-red-500">Error: {error?.data?.message || error.error}</div>
  ) : (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-heading text-charcoal mb-4">
          Order Confirmation
        </h1>
        <p className="text-taupe mb-8">
          Thank you for your purchase! Your order ID is #{order._id.substring(18)}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-heading mb-4">Shipping</h2>
              <p><strong>Name:</strong> {order.user.name}</p>
              <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`} className="text-gold">{order.user.email}</a></p>
              <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
              <div className={`mt-4 p-3 rounded-md text-sm font-semibold ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` : 'Awaiting Shipment'}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-heading mb-4">Payment</h2>
              <p><strong>Method:</strong> {order.paymentMethod}</p>
              <div className={`mt-4 p-3 rounded-md text-sm font-semibold ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Payment Pending'}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-heading mb-4">Order Items</h2>
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <Link to={`/product/${item.product}`} className="flex-grow font-semibold hover:text-gold">{item.name}</Link>
                  <div className="text-right text-sm text-taupe">
                    <p>{item.qty} x ${item.price} = <span className="font-semibold text-charcoal">${(item.qty * item.price).toFixed(2)}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
              <h2 className="text-2xl font-heading border-b pb-4 mb-6">Order Summary</h2>
              <div className="flex justify-between mb-3"><span>Items</span><span className="font-semibold">${order.itemsPrice}</span></div>
              <div className="flex justify-between mb-3"><span>Shipping</span><span className="font-semibold">${order.shippingPrice}</span></div>
              <div className="flex justify-between mb-6"><span>Tax</span><span className="font-semibold">${order.taxPrice}</span></div>
              <div className="flex justify-between text-xl font-bold text-charcoal border-t pt-4"><span>Total</span><span>${order.totalPrice}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
