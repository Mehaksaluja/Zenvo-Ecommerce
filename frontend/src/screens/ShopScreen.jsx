import { useGetProductsQuery } from '../slices/productsApiSlice';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

const ShopScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="bg-snow">
      <div className="bg-white py-12 mb-12 shadow-sm">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-heading text-charcoal">Our Collection</h1>
          <p className="text-lg text-taupe mt-2">Discover the perfect gift for any occasion.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-12">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="text-red-500 p-4 bg-red-100 rounded-lg">
            {error?.data?.message || error.error}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Array.isArray(products) && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ShopScreen;