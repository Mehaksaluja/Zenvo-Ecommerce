import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetProfileQuery, useUpdateProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { FiXCircle, FiCheckCircle } from 'react-icons/fi';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { data: user, isLoading: isLoadingUser, refetch } = useGetProfileQuery();
  const { data: orders, isLoading: isLoadingOrders } = useGetMyOrdersQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({ name, email, password }).unwrap();
        dispatch(setCredentials(res));
        refetch(); // Refetch user data to update the screen
        alert('Profile updated successfully!');
      } catch (err) {
        console.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Update Profile */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-heading mb-6">User Profile</h2>
          <form onSubmit={submitHandler}>
            {/* Form fields for name, email, password, confirmPassword */}
            <div className="mb-4">
              <label className="block text-taupe mb-2">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-taupe mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-taupe mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-taupe mb-2">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <button type="submit" className="w-full bg-charcoal text-white py-2 rounded">
              {isUpdating ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Right Column: My Orders */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-heading mb-6">My Orders</h2>
          {isLoadingOrders ? (
            <p>Loading orders...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left">ID</th>
                    <th className="p-4 text-left">DATE</th>
                    <th className="p-4 text-left">TOTAL</th>
                    <th className="p-4 text-left">PAID</th>
                    <th className="p-4 text-left">DELIVERED</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-snow">
                      <td className="p-4">{order._id.substring(20)}</td>
                      <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">${order.totalPrice}</td>
                      <td className="p-4">{order.isPaid ? <FiCheckCircle className="text-green-500" /> : <FiXCircle className="text-red-500" />}</td>
                      <td className="p-4">{order.isDelivered ? <FiCheckCircle className="text-green-500" /> : <FiXCircle className="text-red-500" />}</td>
                      <td className="p-4">
                        <Link to={`/order/${order._id}`} className="text-gold hover:underline">Details</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;