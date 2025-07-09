import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/Categoryform';
import { Button, Modal } from 'antd';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    // Handle form submit (create)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");

            const { data } = await axios.post(
                "http://localhost:4000/api/category/create-category",
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (data?.success) {
                toast.success(`${data.category.name} is created`);
                setName("");
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form");
        }
    };


    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/category/get-category");
            if (data?.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while fetching categories");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // Handle update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");

            const { data } = await axios.put(
                `http://localhost:4000/api/category/update-category/${selected._id}`,
                { name: updatedName }, // request body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                toast.success(`${updatedName} updated successfully`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while updating category");
        }
    };


    // Handle delete
    const handleDelete = async (categoryId) => {
        try {
            const token = localStorage.getItem("authToken");

            const { data } = await axios.delete(
                `http://localhost:4000/api/category/delete-category/${categoryId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                toast.success("Category deleted");
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while deleting category");
        }
    };


    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className="container-fluid topmargin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h4>Create Category</h4>
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            value={name}
                            setValue={setName}
                        />
                        <div className="mt-4">
                            <h5>All Categories</h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat) => (
                                        <tr key={cat._id}>
                                            <td>{cat.name}</td>
                                            <td>
                                                <button

                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(cat.name);
                                                        setSelected(cat);
                                                    }}
                                                    className="me-2 btn btn-primary btn-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    danger
                                                    onClick={() => handleDelete(cat._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            visible={visible}
                        >
                            <CategoryForm
                                handleSubmit={handleUpdate}
                                value={updatedName}
                                setValue={setUpdatedName}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
