import React from 'react';
import './CashOnDelivery.css';

const CashOnDelivery = () => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="row g-4">
                        {/* Free Shipping */}
                        <div className="col-md-4">
                            <div className="feature-box p-4 rounded text-center h-100">
                                <i className="bi bi-truck fs-1 text-warning mb-3"></i>
                                <h5 className="fw-bold">FREE SHIPPING</h5>
                                <p className="text-muted mb-0">For all orders above ₹2000</p>
                            </div>
                        </div>

                        {/* On-Time Delivery */}
                        <div className="col-md-4">
                            <div className="feature-box p-4 rounded text-center h-100">
                                <i className="bi bi-stopwatch fs-1 text-warning mb-3 spin"></i>

                                <h5 className="fw-bold">DELIVERY ON TIME</h5>
                                <p className="text-muted mb-0">Fastest doorstep delivery</p>
                            </div>
                        </div>

                        {/* Secure Payment */}
                        <div className="col-md-4">
                            <div className="feature-box p-4 rounded text-center h-100">
                                <i className="bi bi-bag-fill fs-1 text-warning mb-3"></i>
                                <h5 className="fw-bold">SECURE PAYMENT</h5>
                                <p className="text-muted mb-0">100% secure transactions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CashOnDelivery;
