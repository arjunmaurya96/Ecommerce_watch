import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
// import './CardHome.css';

const CardHome = () => {
    const [data, setData] = useState([]);

    // Fetch all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("https://ecommerce-watch.onrender.com/api/product/get-product");
            setData(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center text-dark mb-4 fw-bold position-relative custom-underline">
                -- Latest Products --
            </h2>

            <div className="row">
                {data && data.length > 0 ? (
                    data.slice(0, 4).map((product, index) => (
                        <div className="col-md-4 col-lg-3 mb-4" key={index}>
                            <div className="card h-100 shadow-sm">
                                <div className="img-container">
                                    <img
                                        src={product.photo || "https://via.placeholder.com/300"}
                                        className="card-img-top zoom-img"
                                        alt={product.name}
                                    />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">
                                        {product.description?.substring(0, 60)}...
                                    </p>
                                    <h6 className="text-success mb-3">₹{product.price}</h6>
                                    <div className="d-flex justify-content-between mt-auto">
                                        <button className="btn btn-warning btn-sm">
                                            Add to Cart
                                        </button>
                                        <button className="btn btn-primary btn-sm">
                                            View More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No products available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardHome;
