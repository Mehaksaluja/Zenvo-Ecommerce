import { Link } from 'react-router-dom';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../slices/productsApiSlice';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        console.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        console.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="bg-snow min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-heading text-charcoal">Product Management</h1>
            <p className="text-taupe mt-1">Create, view, and manage all products in your store.</p>
          </div>
          <button
            onClick={createProductHandler}
            className="bg-gold text-charcoal font-bold font-body py-3 px-6 rounded-lg flex items-center hover:bg-opacity-90 transition-colors transform hover:scale-105"
          >
            <FiPlus className="mr-2" /> Create Product
          </button>
        </div>

        {isLoading || isCreating || isDeleting ? <p>Loading...</p> : error ? <p className="text-red-500">Error loading products.</p> : (
          <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-xl">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="p-4 text-left font-semibold text-taupe uppercase tracking-wider">Image</th>
                  <th className="p-4 text-left font-semibold text-taupe uppercase tracking-wider">Name</th>
                  <th className="p-4 text-left font-semibold text-taupe uppercase tracking-wider">Price</th>
                  <th className="p-4 text-left font-semibold text-taupe uppercase tracking-wider">Category</th>
                  <th className="p-4 text-left font-semibold text-taupe uppercase tracking-wider">Brand</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-200 hover:bg-snow/50">
                    <td className="p-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                    </td>
                    <td className="p-4 font-semibold text-charcoal">{product.name}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4 text-taupe">{product.category}</td>
                    <td className="p-4 text-taupe">{product.brand}</td>
                    <td className="p-4 flex gap-4 items-center h-24">
                      <Link to={`/admin/product/${product._id}/edit`} className="text-charcoal p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <FiEdit size={18} />
                      </Link>
                      <button onClick={() => deleteHandler(product._id)} className="text-charcoal p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <FiTrash2 size={18} />
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

export default ProductListScreen;
