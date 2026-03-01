function ProductModal({
showForm,
formData,
editingProduct,
handleSubmit,
handleInputChange,
closeForm
}) {
    return (
        <>
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>
                        {/* always rememeber than first is false and second is true */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form">
                                <button type="submit" className="btn-add">
                                    {editingProduct ? "Update" : "Add"}</button>
                                <button className="btn-cancel" onClick={() => closeForm()}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </>
    )
}
export default ProductModal;