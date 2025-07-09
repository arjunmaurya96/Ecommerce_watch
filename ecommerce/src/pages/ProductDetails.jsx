import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProduct] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();

    // Get single product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce-watch.onrender.com/api/product/get-single-product/${slug}`);
            if (data?.success) {
                setProduct(data.product);
                getSimilarProduct(data.product._id, data.product.category._id);
            }
        } catch (error) {
            console.log("Error fetching product", error);
        }
    };

    // Get related products
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`https://ecommerce-watch.onrender.com/api/product/related-product/${pid}/${cid}`);
            if (data?.success) {
                setRelatedProduct(data.products);
            }
        } catch (error) {
            console.log("Error fetching similar products", error);
        }
    };

    useEffect(() => {
        if (slug) getProduct();
    }, [slug]);

    return (
        <Layout title={product?.name}>
            <div className="container categoriesunde mt-4">
                <div className="row">
                    <div className="col-md-6">
                        {product?.photo ? (
                            <img
                                src={product.photo}
                                alt={product.name}
                                className="img-fluid"
                            />
                        ) : (
                            <p>Image not available</p>
                        )}
                    </div>
                    <div className="col-md-6">
                        <h3>Name: {product.name}</h3>
                        <p>Description : {product.description}</p>
                        <h4>Price: ₹{product.price}</h4>thgrfedw
                        <p>Category: {product?.category?.name}</p>
                        <button className="btn btn-primary mt-2">Add to Cart</button>
                    </div>
                </div>

                {/* Related Products */}
                <div className="row mt-5">
                    <h4>Similar Products</h4>
                    {relatedProducts.length < 1 && <p>No similar products found.</p>}
                    {relatedProducts.map((p) => (
                        <div key={p._id} className="col-md-4 mt-3">
                            <div className="card">
                                <img
                                    src={p.photo}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 100)}...</p>
                                    <p className="card-text">₹{p.price}</p>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                    <button className="btn btn-dark btn-sm">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;
