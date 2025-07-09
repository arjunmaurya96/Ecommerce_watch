import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';


const Profile = () => {
    const { auth, setAuth } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (auth?.user) {
            const { name, email, phone, address } = auth.user;
            setName(name || '');
            setEmail(email || '');
            setPhone(phone || '');
            setAddress(address || '');
        }
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                toast.error('Authentication token not found');
                setLoading(false);
                return;
            }
            const { data } = await axios.put(
                'https://ecommerce-watch.onrender.com/api/auth/profile',
                {
                    name,
                    email,
                    password,
                    phone,
                    address,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (data?.error) {
                toast.error(data.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success("Profile Updated Successfully")
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };


    return (
        <Layout title="Your Profile">
            <div className="container-fluid py-4 topcreate" style={{
                background: 'linear-gradient(to right, #ff7e5f, #feb47b)'
            }}>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-3 mb-4 mb-md-0">
                        <UserMenu />
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="container d-flex justify-content-center">
                            <div className="w-100" style={{ maxWidth: '500px' }}>
                                <div className="card p-4 shadow-sm">
                                    <h4 className="text-center mb-4">User Profile</h4>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter Your Name"

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="email"
                                                value={email}
                                                className="form-control"
                                                placeholder="Enter Your Email"
                                                disabled
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter New Password"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter Your Phone"

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter Your Address"

                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">
                                            {loading ? 'Updating...' : 'Update'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;


