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
        refetch(); // Refetch the user list
      } catch (err) {
        console.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-heading mb-8">Users</h1>
      {isLoading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">Error loading users.</p>
      ) : (
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-xl">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2">
                <th className="p-4 text-left font-semibold text-taupe uppercase">ID</th>
                <th className="p-4 text-left font-semibold text-taupe uppercase">NAME</th>
                <th className="p-4 text-left font-semibold text-taupe uppercase">EMAIL</th>
                <th className="p-4 text-center font-semibold text-taupe uppercase">ADMIN</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-snow">
                  <td className="p-4 font-mono text-sm">{user._id}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4"><a href={`mailto:${user.email}`} className="text-gold">{user.email}</a></td>
                  <td className="p-4 flex justify-center">{user.isAdmin ? <FiCheckCircle className="text-green-500" /> : <FiXCircle className="text-red-500" />}</td>
                  <td className="p-4 flex gap-4">
                    <Link to={`/admin/user/${user._id}/edit`} className="text-charcoal hover:text-gold"><FiEdit size={20} /></Link>
                    <button onClick={() => deleteHandler(user._id)} className="text-charcoal hover:text-red-500" disabled={isDeleting}>
                      <FiTrash2 size={20} />
                    </button>
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

export default UserListScreen;