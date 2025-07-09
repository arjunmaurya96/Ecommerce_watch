import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");

    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("https://ecommerce-watch.onrender.com/api/category/get-category");
            if (data?.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while fetching categories");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // Handle product creation
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("category", category);
            productData.append("shipping", shipping);
            productData.append("photo", photo);

            const { data } = await axios.post(
                "https://ecommerce-watch.onrender.com/api/product/create-product",
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data?.success) {
                toast.success("Product created successfully");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while creating the product");
        }
    };

    return (
        <Layout title="Dashboard - Create Product">
            <div className="container-fluid topcreate p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => setCategory(value)}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>

                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>

                            {photo && (
                                <div className="mb-3 text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="product preview"
                                        height="200"
                                        className="img img-responsive"
                                    />
                                </div>
                            )}

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Product Name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <textarea
                                    value={description}
                                    placeholder="Product Description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Shipping"
                                    size="large"
                                    className="form-select mb-3"
                                    onChange={(value) => setShipping(value)}
                                >
                                    <Option value="1">Yes</Option>
                                    <Option value="0">No</Option>
                                </Select>
                            </div>

                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>
                                    Create Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;
