import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";


const AllProduct = () => {
    const navigate = useNavigate();

    const { cart, setCart } = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(1)




    // get all category 
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("https://ecommerce-watch.onrender.com/api/category/get-category");
            if (data?.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getAllCategory();
    }, []);

    // Filter products WHEN either filter changes
    useEffect(() => {
        if (checked.length || radio.length) {
            filterProduct();
        } else {
            getAllProducts();
        }
    }, [checked, radio]);



    // get all products
    const getAllProducts = async () => {
        try {
            setLoading(true)
            // const { data } = await axios.get("http://localhost:4000/api/product/get-product");
            const { data } = await axios.get(`https://ecommerce-watch.onrender.com/api/product/product-list/${page}`);
            console.log("object", data)
            setLoading(false)
            setProducts(data.products);
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error("Something went wrong");
        }
    };


    // get Total count 
    const getTotal = async () => {
        try {
            const { data } = await axios.get("https://ecommerce-watch.onrender.com/api/product/product-count")
            setTotal(data?.total)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        if (page === 1) return;
        loadMore()
    }, [page])

    // load more 
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://ecommerce-watch.onrender.com/api/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data?.products])
        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }


    // filter by get 
    const handleFilter = async (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter(c => c !== id)
        }
        setChecked(all);

    }

    useEffect(() => {

        getAllProducts();
        getTotal()
    }, []);


    // get filterd product 

    const filterProduct = async () => {
        try {
            const { data } = await axios.post(
                "https://ecommerce-watch.onrender.com/api/product/product-filters",
                { checked, radio }
            );

            if (data?.success) {
                setProducts(data.products);
            } else {
                toast.error("Failed to filter products");
            }
        } catch (error) {
            console.error("Error filtering products:", error);
            toast.error("Something went wrong while filtering");
        }
    };
    return (
        <>
            <Layout title={"All Product - Best Offers"}>
                <div className="container-fluid bg-light py-4">
                    <div className="row productunder">
                        {/* Sidebar - Filter */}
                        <div className="col-md-3">
                            <h4 className="text-center text-success fw-bold">Filter By Category</h4>
                            <div className="d-flex justify-content-center mb-3">
                                <div style={{ height: '3px', width: '80%', background: 'linear-gradient(to right, #fff 50%, #000 50%)' }}></div>
                            </div>

                            <div className="d-flex p-2 flex-column shadow-sm bg-white rounded">
                                {categories?.map((c) => (
                                    <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                        {c.name}
                                    </Checkbox>
                                ))}
                            </div>

                            {/* Price Filter */}
                            <h4 className="text-center text-success fw-bold mt-4">Filter By Price</h4>
                            <div className="d-flex justify-content-center mb-3">
                                <div style={{ height: '3px', width: '80%', background: 'linear-gradient(to right, #fff 50%, #000 50%)' }}></div>
                            </div>

                            <div className="d-flex flex-column p-2 shadow-sm bg-white rounded">
                                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                    {Prices?.map((p) => (
                                        <div key={p._id}>
                                            <Radio value={p.array}>{p.name}</Radio>
                                        </div>
                                    ))}
                                </Radio.Group>
                            </div>

                            <div className="d-flex flex-column mt-3">
                                <button className="btn btn-danger w-100" onClick={() => window.location.reload()}>
                                    Reset Filter
                                </button>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="col-md-9">
                            <h2 className="text-center text-dark fw-bold mb-4">All Products</h2>
                            <div className="d-flex justify-content-center mb-3">
                                <div style={{ height: '3px', width: '120px', background: 'linear-gradient(to right, #fff 50%, #000 50%)' }}></div>
                            </div>

                            <div className="d-flex flex-wrap gap-4 justify-content-start">
                                {products?.map((p) => (
                                    <div key={p._id} className="card shadow-sm border-0" style={{ width: '18rem' }}>
                                        <img
                                            src={p.photo}
                                            className="card-img-top img-fluid"
                                            alt={p.name}
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title text-success fw-bold">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 60)}...</p>
                                            <p className="card-text fw-bold text-dark">₹ {p.price}</p>
                                            <div className="d-flex justify-content-between">
                                                <button
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() => navigate(`/product/${p.slug}`)}
                                                >
                                                    More Details
                                                </button>
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() => {
                                                        setCart([...cart, p]);
                                                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                                                        toast.success("Item added to cart");
                                                    }}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Load More */}
                            <div className="text-center my-4">
                                {products && products.length < total && (
                                    <button
                                        className="btn btn-dark px-4"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage(page + 1);
                                        }}
                                    >
                                        {loading ? "Loading..." : "Load More"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </Layout >
        </>
    );
};

export default AllProduct;
