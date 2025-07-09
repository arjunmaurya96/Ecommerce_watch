import React from 'react';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter new category"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                required // ensures field is not empty
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default CategoryForm;
