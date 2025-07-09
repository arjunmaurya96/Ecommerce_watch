import React from 'react';
import { useSearch } from '../../context/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const navigate = useNavigate();
    const { search, setSearch } = useSearch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`http://localhost:4000/api/product/search/${search.keyword}`);
            setSearch({ ...search, result: data });
            navigate("/searchitem");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className=''>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    value={search.keyword}
                    onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
                    className="form-control me-2 border-0 shadow-none"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button className="btn btn-dark btn-sm" type="submit">Search</button>
            </form>

        </div>
    );
};

export default SearchInput;
