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
    <div className="container mx-auto px-6 py-12">
      <Link to="/admin/userlist" className="mb-8 inline-block text-taupe hover:text-charcoal">
        &larr; Go Back
      </Link>
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-heading mb-6">Edit User</h1>
        {isLoading ? <p>Loading...</p> : error ? <p className="text-red-500">Error</p> : (
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-taupe mb-2 font-semibold">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-taupe mb-2 font-semibold">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded" />
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className="h-5 w-5 text-gold focus:ring-gold" />
              <label htmlFor="isAdmin" className="ml-2 text-charcoal font-semibold">Is Admin</label>
            </div>
            <button type="submit" className="w-full bg-charcoal text-white py-3 rounded-lg font-bold hover:bg-opacity-90">
              {isUpdating ? 'Updating...' : 'Update'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditScreen;