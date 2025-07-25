import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex items-center justify-center font-body text-sm mb-8">
      <div className="flex items-center">
        {step1 ? (
          <Link to="/login" className="font-semibold text-charcoal">Sign In</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Sign In</span>
        )}
      </div>

      <FiChevronRight className="mx-2 text-gray-400" />

      <div className="flex items-center">
        {step2 ? (
          <Link to="/shipping" className="font-semibold text-charcoal">Shipping</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Shipping</span>
        )}
      </div>

      <FiChevronRight className="mx-2 text-gray-400" />

      <div className="flex items-center">
        {step3 ? (
          <Link to="/payment" className="font-semibold text-charcoal">Payment</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Payment</span>
        )}
      </div>

      <FiChevronRight className="mx-2 text-gray-400" />

      <div className="flex items-center">
        {step4 ? (
          <Link to="/placeorder" className="font-semibold text-charcoal">Place Order</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Place Order</span>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;