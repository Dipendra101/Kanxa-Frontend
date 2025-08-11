// client/src/pages/admin/AdminProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { getAllAdminProducts, deleteProduct } from '../../api/adminApi';
import { Toaster, toast } from 'react-hot-toast';
import AdminModal from '../../components/AdminModal';
import AdminProductForm from '../../components/AdminProductForm';
import ConfirmationModal from '../../components/ConfirmationModal'; // Re-using our logout modal

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await getAllAdminProducts();
            setProducts(data.data.products);
        } catch (error) {
            toast.error("Failed to fetch products.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddNewProduct = () => {
        setEditingProduct(null); // Ensure form is for a new product
        setIsModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };
    
    const openDeleteConfirm = (productId) => {
        setProductToDelete(productId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteProduct = async () => {
        if (!productToDelete) return;
        const toastId = toast.loading("Deleting product...");
        try {
            await deleteProduct(productToDelete);
            toast.success("Product deleted successfully!", { id: toastId });
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
            fetchProducts(); // Refresh the list
        } catch (error) {
            toast.error("Failed to delete product.", { id: toastId });
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <Toaster position="top-center" />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Manage Products</h2>
                <button 
                    onClick={handleAddNewProduct} 
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add New Product
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Product Name</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.length > 0 ? products.map(product => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm font-semibold">NPR {product.price}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm">{product.stockQuantity} {product.unit}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => handleEditProduct(product)} className="text-primary hover:underline mr-4">Edit</button>
                                    <button onClick={() => openDeleteConfirm(product._id)} className="text-danger hover:underline">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-gray-500">No products found. Add one to get started!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for Add/Edit Product */}
            <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProduct ? "Edit Product" : "Add New Product"}>
                <AdminProductForm 
                    initialData={editingProduct} 
                    onSuccess={() => { setIsModalOpen(false); fetchProducts(); }} 
                    onCancel={() => setIsModalOpen(false)} 
                />
            </AdminModal>

            {/* Modal for Delete Confirmation */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteProduct}
                title="Confirm Deletion"
                message="Are you sure you want to delete this product? This action cannot be undone."
            />
        </div>
    );
};

export default AdminProductsPage;