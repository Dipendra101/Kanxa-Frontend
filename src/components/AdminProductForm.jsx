// client/src/components/AdminProductForm.jsx
import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../api/adminApi';
import { toast } from 'react-hot-toast';

const AdminProductForm = ({ initialData, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Cement',
        stockQuantity: '',
        unit: 'per piece',
        images: [''] // For now, we'll handle one image URL
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price || '',
                category: initialData.category || 'Cement',
                stockQuantity: initialData.stockQuantity || '',
                unit: initialData.unit || 'per piece',
                images: initialData.images?.length ? initialData.images : ['']
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading(initialData ? 'Updating product...' : 'Creating product...');

        try {
            if (initialData) {
                // Update existing product
                await updateProduct(initialData._id, formData);
            } else {
                // Create new product
                await createProduct(formData);
            }
            toast.success(initialData ? 'Product updated successfully!' : 'Product created successfully!', { id: toastId });
            onSuccess(); // This will close the modal and refresh the product list
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.', { id: toastId });
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                        <option>Cement</option>
                        <option>Bricks</option>
                        <option>Sand & Gravel</option>
                        <option>Hardware</option>
                        <option>Pipes & Tanks</option>
                        <option>Garage & Workshop</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Price (NPR)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                    <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Unit (e.g., per bag)</label>
                    <input type="text" name="unit" value={formData.unit} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="text" name="images" value={formData.images[0]} onChange={(e) => setFormData({...formData, images: [e.target.value]})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                    Cancel
                </button>
                <button type="submit" disabled={loading} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:bg-gray-400">
                    {loading ? 'Saving...' : 'Save Product'}
                </button>
            </div>
        </form>
    );
};

export default AdminProductForm;