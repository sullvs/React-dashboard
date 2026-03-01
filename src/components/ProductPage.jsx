import { useState } from "react";
import ProductModal from "./ProductModal";

function ProductsPage({ products, setProducts }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        stock: ""
    })
    const [showForm, setShowForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingProduct) {
            setProducts(
                products.map((item) => item.id === editingProduct.id ? {
                    ...item,
                    name: formData.name,
                    category: formData.category,
                    price: formData.price,
                    stock: formData.stock
                } : item
                )
            );
        }
        else {
            const newProduct = {
                id: products.length + 1,
                name: formData.name,
                category: formData.category,
                price: formData.price,
                stock: formData.stock
            };
            setProducts([...products, newProduct])
        }
        closeForm();
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(
            p => p.id !== id));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const openAddForm = () => {
        setEditingProduct(null);
        setFormData({
            name: "",
            category: "",
            price: "",
            stock: ""
        })
        setShowForm(true);
    };
    const openEditForm = (product) => {
        setEditingProduct(product)
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock
        });
        setShowForm(true);
    };
    const closeForm = () => {
        setEditingProduct(false);
        setFormData({
            name: "",
            category: "",
            price: "",
            stock: ""
        });
        setShowForm(false);
    };

    return (
        <>
            <ProductModal
                showForm={showForm}
                formData={formData}
                editingProduct={editingProduct}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                closeForm={closeForm}
            />
            <div className="page-header">
                <h3>Product Table</h3>
                <button className="btn-add" onClick={() => openAddForm()}>Add Product +</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.stock > 0 ? "Active" : "Out of Stock"}</td>
                            <td>
                                <button className="btn-edit" onClick={() => openEditForm(product)}>Edit</button>
                                <button className="btn-delete" onClick={() => deleteProduct(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
export default ProductsPage;