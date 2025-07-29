import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  const StatusPill = ({ isTrue, text }) => {
    const statusText = isTrue ? `Yes` : `No`;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${isTrue ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
        {isTrue ? <FiCheckCircle className="mr-1.5" /> : <FiXCircle className="mr-1.5" />}
        {statusText}
      </span>
    );
  };

  return (
    <div className="bg-snow min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-heading text-charcoal">Order Management</h1>
          <p className="text-taupe mt-1">View and manage all customer orders.</p>
        </div>

        {isLoading ? <p>Loading...</p> : error ? <p className="text-red-500">Error loading orders.</p> : (
          <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-xl">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="p-4 text-left font-semibold text-taupe uppercase tracking-wider">Order ID</th>
                  <th className="p-4 text-left font-semibold text-taupe uppercase tracking-wider">Customer</th>
                  <th className="p-4 text-left font-semibold text-taupe uppercase tracking-wider">Date</th>
                  <th className="p-4 text-left font-semibold text-taupe uppercase tracking-wider">Total</th>
                  <th className="p-4 text-center font-semibold text-taupe uppercase tracking-wider">Paid</th>
                  <th className="p-4 text-center font-semibold text-taupe uppercase tracking-wider">Delivered</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-200 hover:bg-snow/50">
                    <td className="p-4 font-mono text-sm text-charcoal">#{order._id.slice(-6).toUpperCase()}</td>
                    <td className="p-4 font-semibold text-charcoal">{order.user ? order.user.name : 'N/A'}</td>
                    <td className="p-4 text-taupe">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-semibold text-charcoal">${order.totalPrice}</td>
                    <td className="p-4 text-center">
                      <StatusPill isTrue={order.isPaid} />
                    </td>
                    <td className="p-4 text-center">
                      <StatusPill isTrue={order.isDelivered} />
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-gray-100 text-charcoal px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-gold hover:text-white transition-colors"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderListScreen;