import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [photoUrl, setPhotoUrl] = useState("")
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");

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

    // Get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce-watch.onrender.com/api/product/get-single-product/${params.slug}`);
            if (data?.success) {
                const p = data.product;
                setName(p.name);
                setId(p._id);
                setDescription(p.description);
                setPhotoUrl(p.photo)
                setPrice(p.price);
                setQuantity(p.quantity);
                setCategory(p.category._id);
                setShipping(p.shipping);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while fetching product");
        }
    };

    useEffect(() => {
        getAllCategory();
        getSingleProduct();
    }, []);

    // Handle Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("category", category);
            productData.append("shipping", shipping);
            if (photo) productData.append("photo", photo);

            const { data } = await axios.put(`https://ecommerce-watch.onrender.com/api/product/update-product/${id}`, productData);
            if (data?.success) {
                toast.success("Product updated successfully");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while updating product");
        }
    };


    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are you sure want to delete this product ? ")
            if (!answer) return;
            const { data } = await axios.delete(`https://ecommerce-watch.onrender.com/api/product/delete-product/${id}`)
            toast.success("Product Deleted Successfully")
            navigate("/dashboard/admin/products")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")

        }

    }

    return (
        <Layout title={"Update Product"}>
            <div className="container-fluid m-3 mt-5 topcreate p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="mb-3 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a Category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => setCategory(value)}
                                value={category}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload New Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`${photoUrl}`}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Enter Name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="Enter Description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Enter Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Enter Quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping"
                                    size="large"
                                    className="form-select mb-3"
                                    onChange={(value) => setShipping(value)}
                                    value={shipping ? "1" : "0"}
                                >
                                    <Option value="1">Yes</Option>
                                    <Option value="0">No</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    Update Product
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
