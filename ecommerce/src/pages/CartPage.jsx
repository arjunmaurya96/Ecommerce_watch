import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/auth';
import axios from 'axios';

const CartPage = () => {
    const { cart, setCart } = useCart();
    const { auth } = useAuth();
    const navigate = useNavigate();

    const isAdmin = auth?.user?.role === 1;
    const userName = auth?.user?.name || "Guest";
    const isLoggedIn = !!auth?.token;

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            if (index !== -1) {
                myCart.splice(index, 1);
                setCart(myCart);
                localStorage.setItem('cart', JSON.stringify(myCart))
            }
        } catch (error) {
            console.error(error);
        }
    };

    // get payment gateway token
    // const getToken = async () => {
    //     try {
    //         const { data } = await axios.get("")
    //     } catch (error) {
    //         console.log(error)

    //     }
    // }

    const handlepayment = () => {
        try {

        } catch (error) {
            console.log(error)

        }
    }


    return (
        <Layout title="Your Cart">
            <div className="container mt-5 py-4">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-3 rounded">
                            {isAdmin
                                ? `Hello Admin: ${userName}`
                                : `Hello ${isLoggedIn ? userName : "Guest"}`}
                        </h1>
                        <h4 className="text-center mt-3">
                            {cart?.length > 0 ? (
                                <>
                                    You have {cart.length} item{cart.length > 1 ? 's' : ''} in your cart.
                                    {/* {!isLoggedIn && (
                                        <span className="text-danger ms-2">Please login to checkout.</span>
                                    )} */}
                                </>
                            ) : (
                                "Your cart is empty"
                            )}
                        </h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        {cart?.length > 0 ? (
                            cart.map(product => (
                                <div key={product._id} className="card mb-3 shadow-sm">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-4">
                                            <img
                                                src={product.photo}
                                                alt={product.name}
                                                className="img-fluid rounded-start"
                                                style={{ height: '150px', objectFit: 'cover', width: '100%' }}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text text-truncate" style={{ maxWidth: '100%' }}>
                                                    {product.description.length > 100
                                                        ? product.description.substring(0, 100) + "..."
                                                        : product.description}
                                                </p>
                                                <p className="card-text fw-bold">Price: ${product.price}</p>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => removeCartItem(product._id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No products in cart</p>
                        )}
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3 shadow-sm sticky-top" style={{ top: '80px' }}>
                            <h4>Checkout Summary</h4>
                            <hr />
                            <p>Total items: <strong>{cart?.length || 0}</strong></p>
                            <p>
                                Total price:{" "}
                                <strong>
                                    $
                                    {cart
                                        ?.reduce((total, product) => total + Number(product.price), 0)
                                        .toFixed(2)}
                                </strong>
                            </p>

                            {!isLoggedIn ? (
                                // <button
                                //     className="btn btn-primary w-100"
                                //     onClick={() => navigate("/login")}
                                // >
                                //     Login to Checkout
                                // </button>

                                <div>
                                    {auth?.user?.address ? (
                                        <>
                                            <div className='mb-3'>
                                                <h4>Currect Address</h4>
                                                <h5>{auth?.user?.address}</h5>
                                                <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address </button>

                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                {auth?.token ? (
                                                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address </button>
                                                ) : (
                                                    <>
                                                        <button className='btn btn-outline-warning' onClick={() => navigate('/login', {
                                                            state: '/cart'
                                                        })}>Please login to chechout</button>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                            ) : (
                                // <button
                                //     className="btn btn-success w-100"
                                //     onClick={() => alert("Proceed to payment")}
                                // >
                                //     Proceed to Payment
                                // </button>
                                <>

                                </>
                            )}
                            <div>
                                {/* {auth?.user?.address? (

                                ):()} */}

                                { }
                            </div>
                            <div className="mt-2">
                                <button className='btn btn-primary' onClick={handlepayment}> Make Payment  </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </Layout >
    );
};

export default CartPage;







// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout/Layout';
// import { useCart } from '../context/Cart';
// import { useAuth } from '../context/auth';
// import axios from 'axios';

// const CartPage = () => {
//     const { cart, setCart } = useCart();
//     const { auth } = useAuth();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);

//     const isAdmin = auth?.user?.role === 1;
//     const userName = auth?.user?.name || "Guest";
//     const isLoggedIn = !!auth?.token;

//     const removeCartItem = (pid) => {
//         try {
//             let myCart = [...cart];
//             let index = myCart.findIndex(item => item._id === pid);
//             if (index !== -1) {
//                 myCart.splice(index, 1);
//                 setCart(myCart);
//                 localStorage.setItem('cart', JSON.stringify(myCart))
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const totalAmount = cart?.reduce((total, product) => total + Number(product.price), 0);

//     const loadRazorpayScript = () => {
//         return new Promise((resolve) => {
//             const script = document.createElement('script');
//             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//             script.onload = () => {
//                 resolve(true);
//             };
//             script.onerror = () => {
//                 resolve(false);
//             };
//             document.body.appendChild(script);
//         });
//     };

//     const handlePayment = async () => {
//         try {
//             setLoading(true);

//             if (!isLoggedIn) {
//                 navigate('/login', { state: '/cart' });
//                 return;
//             }

//             if (!auth.user?.address) {
//                 alert('Please add your delivery address first');
//                 navigate('/dashboard/user/profile');
//                 return;
//             }

//             const scriptLoaded = await loadRazorpayScript();
//             if (!scriptLoaded) {
//                 alert('Razorpay SDK failed to load. Are you online?');
//                 return;
//             }

//             // Create order on your backend
//             const { data } = await axios.post('/api/v1/payment/create-order', {
//                 amount: totalAmount * 100, // Convert to paise
//                 currency: 'INR',
//             });

//             if (!data.success) {
//                 throw new Error(data.message || 'Failed to create order');
//             }

//             const options = {
//                 key: data.key, // Your Razorpay key
//                 amount: data.order.amount,
//                 currency: data.order.currency,
//                 name: 'Your Store Name',
//                 description: 'Purchase of products',
//                 order_id: data.order.id,
//                 handler: async function (response) {
//                     try {
//                         // Verify payment on backend
//                         const verifyRes = await axios.post('/api/v1/payment/verify', {
//                             razorpay_payment_id: response.razorpay_payment_id,
//                             razorpay_order_id: response.razorpay_order_id,
//                             razorpay_signature: response.razorpay_signature,
//                             amount: totalAmount,
//                             products: cart,
//                             address: auth.user.address,
//                         });

//                         if (verifyRes.data.success) {
//                             alert('Payment Successful! Order placed.');
//                             setCart([]);
//                             localStorage.removeItem('cart');
//                             navigate('/dashboard/user/orders');
//                         } else {
//                             alert('Payment verification failed');
//                         }
//                     } catch (error) {
//                         console.error('Verification error:', error);
//                         alert('Payment verification error');
//                     }
//                 },
//                 prefill: {
//                     name: auth.user.name,
//                     email: auth.user.email,
//                     contact: auth.user.phone || '',
//                 },
//                 theme: {
//                     color: '#3399cc',
//                 },
//             };

//             const rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (error) {
//             console.error('Payment error:', error);
//             alert(error.message || 'Payment failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Layout title="Your Cart">
//             <div className="container mt-5 py-4">
//                 <div className="row mb-4">
//                     <div className="col-md-12">
//                         <h1 className="text-center bg-light p-3 rounded">
//                             {isAdmin
//                                 ? `Hello Admin: ${userName}`
//                                 : `Hello ${isLoggedIn ? userName : "Guest"}`}
//                         </h1>
//                         <h4 className="text-center mt-3">
//                             {cart?.length > 0 ? (
//                                 <>
//                                     You have {cart.length} item{cart.length > 1 ? 's' : ''} in your cart.
//                                     {!isLoggedIn && (
//                                         <span className="text-danger ms-2">Please login to checkout.</span>
//                                     )}
//                                 </>
//                             ) : (
//                                 "Your cart is empty"
//                             )}
//                         </h4>
//                     </div>
//                 </div>

//                 <div className="row">
//                     <div className="col-md-8">
//                         {cart?.length > 0 ? (
//                             cart.map(product => (
//                                 <div key={product._id} className="card mb-3 shadow-sm">
//                                     <div className="row g-0 align-items-center">
//                                         <div className="col-md-4">
//                                             <img
//                                                 src={product.photo}
//                                                 alt={product.name}
//                                                 className="img-fluid rounded-start"
//                                                 style={{ height: '150px', objectFit: 'cover', width: '100%' }}
//                                             />
//                                         </div>
//                                         <div className="col-md-8">
//                                             <div className="card-body">
//                                                 <h5 className="card-title">{product.name}</h5>
//                                                 <p className="card-text text-truncate" style={{ maxWidth: '100%' }}>
//                                                     {product.description.length > 100
//                                                         ? product.description.substring(0, 100) + "..."
//                                                         : product.description}
//                                                 </p>
//                                                 <p className="card-text fw-bold">Price: ${product.price}</p>
//                                                 <button
//                                                     className="btn btn-danger"
//                                                     onClick={() => removeCartItem(product._id)}
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-muted">No products in cart</p>
//                         )}
//                     </div>

//                     <div className="col-md-4">
//                         <div className="card p-3 shadow-sm sticky-top" style={{ top: '80px' }}>
//                             <h4>Checkout Summary</h4>
//                             <hr />
//                             <p>Total items: <strong>{cart?.length || 0}</strong></p>
//                             <p>
//                                 Total price:{" "}
//                                 <strong>
//                                     ${totalAmount?.toFixed(2)}
//                                 </strong>
//                             </p>

//                             {!isLoggedIn ? (
//                                 <div>
//                                     <button
//                                         className="btn btn-primary w-100 mb-3"
//                                         onClick={() => navigate('/login', { state: '/cart' })}
//                                     >
//                                         Login to Checkout
//                                     </button>
//                                 </div>
//                             ) : !auth.user?.address ? (
//                                 <div className="mb-3">
//                                     <p className="text-danger">Please add your delivery address</p>
//                                     <button
//                                         className="btn btn-warning w-100"
//                                         onClick={() => navigate('/dashboard/user/profile')}
//                                     >
//                                         Add Address
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <div className="mb-3">
//                                     <h5>Delivery Address</h5>
//                                     <p>{auth.user.address}</p>
//                                     <button
//                                         className="btn btn-outline-secondary btn-sm mb-3"
//                                         onClick={() => navigate('/dashboard/user/profile')}
//                                     >
//                                         Change Address
//                                     </button>
//                                 </div>
//                             )}

//                             <button
//                                 className={`btn btn-success w-100 ${loading ? '' : ''}`}
//                                 onClick={handlePayment}
//                                 disabled={!isLoggedIn || !auth.user?.address || cart.length === 0 || loading}
//                             >
//                                 {loading ? 'Processing...' : 'Proceed to Payment'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default CartPage;
