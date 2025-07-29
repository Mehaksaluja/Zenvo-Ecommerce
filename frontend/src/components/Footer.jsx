import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-snow border-t-4 border-gold">
      <div className="container mx-auto px-6 pt-16 pb-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-5 text-center lg:text-left">
            <h3 className="text-4xl font-heading font-semibold mb-4">Zenvo</h3>
            <p className="text-taupe max-w-sm mx-auto lg:mx-0 mb-6">
              Curating unforgettable moments with gifts of distinction, hand-picked for those who matter most.
            </p>
            <div className="flex justify-center lg:justify-start gap-5">
              <a href="#" className="text-taupe hover:text-gold hover:scale-110 transition-all duration-300"><FiInstagram size={22} /></a>
              <a href="#" className="text-taupe hover:text-gold hover:scale-110 transition-all duration-300"><FiTwitter size={22} /></a>
              <a href="#" className="text-taupe hover:text-gold hover:scale-110 transition-all duration-300"><FiFacebook size={22} /></a>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-2"></div>

          <div className="lg:col-span-2 text-center lg:text-left">
            <h4 className="font-body font-bold uppercase tracking-wider mb-4">Explore</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-taupe hover:text-gold transition-colors">Home</Link>
              <Link to="/shop" className="text-taupe hover:text-gold transition-colors">Shop</Link>
              <Link to="/contact" className="text-taupe hover:text-gold transition-colors">Contact</Link>
            </nav>
          </div>

          <div className="lg:col-span-3 text-center lg:text-left">
            <h4 className="font-body font-bold uppercase tracking-wider mb-4">Customer Service</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/shipping" className="text-taupe hover:text-gold transition-colors">Shipping & Returns</Link>
              <Link to="/faq" className="text-taupe hover:text-gold transition-colors">FAQ</Link>
              <Link to="/privacy-policy" className="text-taupe hover:text-gold transition-colors">Privacy Policy</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-taupe/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-center">
          <p className="text-taupe text-sm order-2 md:order-1 mt-4 md:mt-0">
            &copy; {currentYear} Elegance Co. All Rights Reserved.
          </p>
          <div className="order-1 md:order-2">
            <p className="text-taupe text-sm">Secure Payments</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
