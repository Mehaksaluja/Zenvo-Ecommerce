import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../slices/authSlice';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    try {
      const res = await axios.post('/api/users/login', { email, password });
      dispatch(setCredentials(res.data));
      navigate(redirect);
    } catch (err) {
      console.error(err?.data?.message || err.error);
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
          Sign In
        </h2>
        <form onSubmit={submitHandler}>
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

          <div className="relative mb-6">
            <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
            <input
              type="password"
              className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="w-full bg-charcoal text-white font-bold font-body py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center text-lg transform hover:scale-105">
            <FiLogIn className="mr-3" />
            Sign In
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-taupe">
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-gold font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
