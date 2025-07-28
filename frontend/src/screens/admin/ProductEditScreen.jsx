import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      alert('Product updated successfully');
      navigate('/admin/productlist');
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <Link to="/admin/productlist" className="mb-8 inline-block text-taupe hover:text-charcoal">
        &larr; Go Back
      </Link>
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-heading mb-6">Edit Product</h1>
        {isLoading ? <p>Loading...</p> : error ? <p className="text-red-500">Error</p> : (
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-taupe font-semibold mb-2">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-taupe font-semibold mb-2">Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-taupe font-semibold mb-2">Image Path</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-3 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-taupe font-semibold mb-2">Brand</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full p-3 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-taupe font-semibold mb-2">Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-taupe font-semibold mb-2">Count In Stock</label>
              <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full p-3 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-taupe font-semibold mb-2">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border rounded" rows="4"></textarea>
            </div>
            <button type="submit" className="w-full bg-charcoal text-white font-bold py-3 rounded-lg hover:bg-opacity-90">
              {isUpdating ? 'Updating...' : 'Update'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditScreen;