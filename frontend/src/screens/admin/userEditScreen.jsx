import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      alert('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-snow min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <Link to="/admin/userlist" className="mb-8 inline-block text-taupe hover:text-charcoal font-semibold">
          &larr; Back to Users
        </Link>
        <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-heading mb-8 text-charcoal">Edit User</h1>
          {isLoading ? <p>Loading...</p> : error ? <p className="text-red-500">Error</p> : (
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block text-taupe font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="mb-4">
                <label className="block text-taupe font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-gold focus:ring-gold"
                  />
                  <span className="ml-3 text-charcoal font-semibold">Is Admin</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-charcoal text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg"
              >
                {isUpdating ? 'Updating...' : 'Update User'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEditScreen;
