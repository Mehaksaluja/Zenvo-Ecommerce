import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // This component checks if a user is logged in AND if they are an admin.
  // If both are true, it renders the child component (<Outlet />).
  // Otherwise, it redirects them to the homepage.
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;