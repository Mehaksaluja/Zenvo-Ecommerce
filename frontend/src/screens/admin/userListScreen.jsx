import { Link } from 'react-router-dom';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import { FiCheckCircle, FiXCircle, FiEdit, FiTrash2 } from 'react-icons/fi';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        console.error(err?.data?.message || err.error);
      }
    }
  };

  const StatusPill = ({ isAdmin }) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${isAdmin ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
        {isAdmin ? <FiCheckCircle className="mr-1.5" /> : <FiXCircle className="mr-1.5" />}
        {isAdmin ? 'Admin' : 'User'}
      </span>
    );
  };

  return (
    <div className="bg-snow min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-heading text-charcoal">User Management</h1>
          <p className="text-taupe mt-1">View, edit, or remove user accounts.</p>
        </div>

        {isLoading ? <p>Loading...</p> : error ? <p className="text-red-500">Error loading users.</p> : (
          <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-xl">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="p-4 text-left font-semibold text-taupe uppercase tracking-wider">User ID</th>
                  <th className="p-4 text-left font-semibold text-taupe uppercase tracking-wider">Name</th>
                  <th className="p-4 text-left font-semibold text-taupe uppercase tracking-wider">Email</th>
                  <th className="p-4 text-center font-semibold text-taupe uppercase tracking-wider">Role</th>
                  <th className="p-4 text-right font-semibold text-taupe uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-snow/50">
                    <td className="p-4 font-mono text-sm text-charcoal">{user._id}</td>
                    <td className="p-4 font-semibold text-charcoal">{user.name}</td>
                    <td className="p-4 text-taupe"><a href={`mailto:${user.email}`} className="hover:text-gold transition-colors">{user.email}</a></td>
                    <td className="p-4 text-center">
                      <StatusPill isAdmin={user.isAdmin} />
                    </td>
                    <td className="p-4 flex gap-4 justify-end">
                      <Link to={`/admin/user/${user._id}/edit`} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <FiEdit className="text-charcoal" size={18} />
                      </Link>
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        disabled={isDeleting}
                      >
                        <FiTrash2 className="text-charcoal hover:text-red-500 transition-colors" size={18} />
                      </button>
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

export default UserListScreen;
