import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-heading mb-8">All Orders</h1>
      {isLoading ? <p>Loading...</p> : error ? <p className="text-red-500">Error</p> : (
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-xl">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2">
                <th className="p-4 text-left font-semibold text-taupe uppercase">ID</th>
                <th className="p-4 text-left font-semibold text-taupe uppercase">USER</th>
                <th className="p-4 text-left font-semibold text-taupe uppercase">DATE</th>
                <th className="p-4 text-left font-semibold text-taupe uppercase">TOTAL</th>
                <th className="p-4 text-center font-semibold text-taupe uppercase">PAID</th>
                <th className="p-4 text-center font-semibold text-taupe uppercase">DELIVERED</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-snow">
                  <td className="p-4 font-mono text-sm">{order._id.slice(-6)}</td>
                  <td className="p-4">{order.user && order.user.name}</td>
                  <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 font-semibold">${order.totalPrice}</td>
                  <td className="p-4 flex justify-center">{order.isPaid ? <FiCheckCircle className="text-green-500" /> : <FiXCircle className="text-red-500" />}</td>
                  <td className="p-4 text-center">{order.isDelivered ? <FiCheckCircle className="text-green-500" /> : <FiXCircle className="text-red-500" />}</td>
                  <td className="p-4">
                    <Link to={`/order/${order._id}`} className="text-gold font-semibold hover:underline">Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;