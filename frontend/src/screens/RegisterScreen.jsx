import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../slices/authSlice';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true); // Set loading to true
    try {
      const res = await axios.post('/api/users', { name, email, password });
      dispatch(setCredentials(res.data));
      navigate(redirect);
    } catch (err) {
      // This is now more robust. It will show the backend's message,
      // or a generic message if the response is malformed.
      toast.error(err?.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false); // Set loading to false in all cases
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-snow py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-md mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-heading text-charcoal mb-8 text-center">
          Create an Account
        </h2>
        <form onSubmit={submitHandler}>
          {/* Form inputs remain the same */}
          <div className="relative mb-4">
            <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          </div>

          <div className="relative mb-4">
            <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
            <input
              type="email"
              className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>

          <div className="relative mb-4">
            <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
            <input
              type="password"
              className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <div className="relative mb-6">
            <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
            <input
              type="password"
              className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-charcoal text-white font-bold font-body py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center text-lg transform hover:scale-105 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : <><FiUserPlus className="mr-3" />Register</>}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-taupe">
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-gold font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterScreen;
