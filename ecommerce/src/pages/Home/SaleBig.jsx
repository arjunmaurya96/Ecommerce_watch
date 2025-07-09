import React from 'react';
import saleImg from '../../assets/img/img-ecom/titen2.jpg';

const SaleBig = () => {
    return (
        <section className="container-fluid text-white my-5 py-3" style={{ backgroundColor: "#b3b4ae" }}>
            <div className="container">
                <div className="text-center">
                    <h2 className="display-4 fw-bold">
                        BIG <span className="text-warning">SALE!</span>
                    </h2>
                </div>

                <div className="row align-items-center">
                    <div className="col-md-6 text-center mb-md-0">
                        <div className="" style={{ maxWidth: "400px" }}>
                            <img
                                src={saleImg}
                                alt="Sale"
                                className="img-fluid scale-on-hover"
                                style={{
                                    transition: "transform 0.4s ease",
                                }}
                                onMouseOver={e => e.currentTarget.style.transform = "scale(1.08)"}
                                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                            />
                        </div>
                    </div>

                    <div className="col-md-6 text-center text-md-start">
                        <h4 className="text-success mt-3 mb-3">50% less in all items</h4>
                        <p className="lead">
                            New arrivals, new collection. <br />
                            Flat <strong>50% off</strong> on every item you buy from <strong>DESIRECART</strong>. <br />
                            Offer valid for 5 days only. <br />
                            <strong>HURRY UP!</strong>
                        </p>
                        <button
                            className="btn btn-success btn-lg px-4 mt-3"
                            style={{ transition: "all 0.3s ease" }}
                            onMouseOver={e => {
                                e.currentTarget.style.backgroundColor = "#14532d";
                                e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.backgroundColor = "#198754";
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            SHOP NOW
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SaleBig;
