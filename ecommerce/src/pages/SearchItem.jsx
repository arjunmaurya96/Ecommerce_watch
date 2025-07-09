import React from 'react';
import Layout from '../components/Layout/Layout'; // Fixed import
import { useSearch } from '../context/Search';

const SearchItem = () => {
    const { search } = useSearch();

    return (
        <Layout title="Search results">
            <div className="container text-center topmargin">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Search Results</h1>
                        <h6>
                            {search?.result.length < 1
                                ? "No product found"
                                : `Found ${search?.result.length} product(s)`}
                        </h6>
                    </div>
                </div>

                <div className="row text-center">
                    {search?.result.map((p) => (
                        <div className="col-md-4 mt-3" key={p._id}>
                            <div className="card">
                                <img
                                    src={p.photo}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">
                                        {p.description?.substring(0, 60)}...
                                    </p>
                                    <p className="card-text">₹ {p.price}</p>
                                    <button className="btn btn-primary btn-sm"> More Details</button>
                                    <button className="btn btn-warning btn-sm ms-5">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default SearchItem;
