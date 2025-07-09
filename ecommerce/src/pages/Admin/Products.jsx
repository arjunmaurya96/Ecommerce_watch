import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    // Get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("https://ecommerce-watch.onrender.com/api/product/get-product");
            if (data?.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <div className="container-fluid  topcreate p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center mb-4">All Products List</h1>
                        <div className="d-flex flex-wrap gap-3">
                            {products?.map((p) => (
                                <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`} className='text-decoration-none'>
                                    <div className="card" style={{ width: '18rem' }}>
                                        <img
                                            src={p.photo}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 100)}...</p>
                                        </div>
                                    </div>
                                </Link>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
