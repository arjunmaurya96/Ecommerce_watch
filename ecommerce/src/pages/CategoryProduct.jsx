import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const CategoryProduct = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});

    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:4000/api/product/product-category/${params.slug}`
            );
            setProducts(data?.products || []);
            setCategory(data?.category || {});
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params?.slug) getProductByCat();
    }, [params?.slug]);


    return (
        <Layout title={`Category - ${category.name}`}>
            <div className="container mt-5 catpro">
                <h2 className="text-center mb-4">{category.name}</h2>
                <div className="row">
                    {products.length > 0 ? (
                        products.map((p) => (
                            <div className="col-md-4 mb-3" key={p._id}>
                                <div className="card">
                                    <img
                                        src={p.photo}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 100)}...
                                        </p>
                                        <p className="card-text"><strong>Price:</strong> ₹{p.price}</p>
                                        <Link to={`/product/${p.slug}`} className="btn btn-primary">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>No products found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryProduct;
