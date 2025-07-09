import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import useCategory from '../components/hooks/useCategory';

const Categories = () => {
    const categories = useCategory();

    return (
        <Layout title="All Categories">
            <div className="container mt-5 categoriesunder">
                <div className="row">
                    {categories.map((c) => (
                        <div className="col-md-6 mb-3" key={c._id}>
                            <Link to={`/category/${c.slug}`} className="btn btn-outline-secondary w-100">
                                {c.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;
