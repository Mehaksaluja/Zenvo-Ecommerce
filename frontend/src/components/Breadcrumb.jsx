// frontend/src/components/Breadcrumb.jsx
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = ({ product }) => {
  return (
    <div className="bg-gray-100 py-4 px-6 rounded-lg mb-8">
      <nav className="flex items-center text-sm font-body">
        <Link to="/" className="text-taupe hover:text-gold transition-colors">
          Home
        </Link>
        <FiChevronRight className="mx-2 text-gray-400" />
        <Link to="/shop" className="text-taupe hover:text-gold transition-colors">
          Shop
        </Link>
        <FiChevronRight className="mx-2 text-gray-400" />
        <span className="text-charcoal">{product.name}</span>
      </nav>
    </div>
  );
};

export default Breadcrumb;