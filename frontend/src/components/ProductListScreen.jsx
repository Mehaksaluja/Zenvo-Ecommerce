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
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading">Products</h1>
        <button onClick={createProductHandler} className="bg-charcoal text-white font-bold py-2 px-4 rounded-lg flex items-center hover:bg-opacity-90">
          <FiPlus className="mr-2" /> Create Product
        </button>
      </div>

      {isLoading || isCreating || isDeleting ? <p>Loading...</p> : error ? <p className="text-red-500">Error</p> : (
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-xl">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2">
                <th className="p-4 text-left font-semibold text-taupe uppercase">ID</th>
                <th className="p-4 text-left font-semibold text-taupe uppercase">NAME</th>
                <th className="p-4 text-left font-semibold text-taupe uppercase">PRICE</th>
                <th className="p-4 text-left font-semibold text-taupe uppercase">CATEGORY</th>
                <th className="p-4 text-left font-semibold text-taupe uppercase">BRAND</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-snow">
                  <td className="p-4 font-mono text-sm">{product._id.slice(-6)}</td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.brand}</td>
                  <td className="p-4 flex gap-4">
                    <Link to={`/admin/product/${product._id}/edit`} className="text-charcoal hover:text-gold"><FiEdit size={20} /></Link>
                    <button onClick={() => deleteHandler(product._id)} className="text-charcoal hover:text-red-500">
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

export default ProductListScreen;