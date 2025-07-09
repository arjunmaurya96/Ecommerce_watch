import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

import img1 from '../../assets/img/contact1.jpg';
import img2 from '../../assets/img/bannerA.jpg';
import img3 from '../../assets/img/bannerB.jpg';
import img4 from '../../assets/img/bannerC.jpg';
import product from '../../assets/img/img-ecom/silver1.jpg';
import CardHome from './CardHome';
import CashOnDelivery from './CashOnDelivery';
import SaleBig from './SaleBig';





const Slider = () => {
    return (
        <div className="home-page">
            {/* Hero Slider */}
            <section className="hero-slider mt-5 mb-5">
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    {/* Indicators */}
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" />
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3" />
                    </div>

                    {/* Slides */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={img2} className="d-block w-100 img-fluid carousel-img mmcc" alt="Slide 1" />
                            <div className="carousel-caption d-none d-md-block">
                                <h1 className="display-4 fw-bold">Innovative Solutions</h1>
                                <p className="lead">We deliver cutting-edge technology for your business needs</p>
                                <button className="btn btn-primary btn-lg">Learn More</button>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src={img3} className="d-block w-100 img-fluid carousel-img mmcc" alt="Slide 2" />
                            <div className="carousel-caption d-none d-md-block">
                                <h1 className="display-4 fw-bold">Quality Assurance</h1>
                                <p className="lead">Our products meet the highest industry standards</p>
                                <button className="btn btn-primary btn-lg">Our Services</button>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src={img4} className="d-block w-100 img-fluid carousel-img mmcc" alt="Slide 3" />
                            <div className="carousel-caption d-none d-md-block">
                                <h1 className="display-4 fw-bold">Client Satisfaction</h1>
                                <p className="lead">Join our growing list of happy customers</p>
                                <button className="btn btn-primary btn-lg">Contact Us</button>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
            <CashOnDelivery />
            {/* Logo Section */}
            {/* <section className="logo-section py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">Trusted By Industry Leaders</h2>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={2}
                        breakpoints={{
                            576: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            992: { slidesPerView: 5 },
                        }}
                        freeMode={true}
                        modules={[FreeMode]}
                    >
                        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                            <SwiperSlide key={i}>
                                <div className="text-center">
                                    <img
                                        src={product}
                                        alt={`Company Logo ${i + 1}`}
                                        className="img-fluid rounded-circle shadow"
                                        style={{
                                            maxHeight: "80px",
                                            width: "80px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section> */}


            {/* Latest Projects */}

            <CardHome className="my-5" />

            <SaleBig />


            {/* Testimonials */}
            <section className="testimonials-section py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">What Our Clients Say</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <img src={img1} className="rounded-circle mb-3" width="100" height="100" alt="Client 1" style={{ objectFit: 'cover' }} />
                                    <h5 className="card-title">Sarah Johnson</h5>
                                    <h6 className="card-subtitle mb-3 text-muted">CEO, TechSolutions</h6>
                                    <p className="card-text">"The team delivered exceptional results on time and within budget. Their attention to detail and technical expertise is unmatched."</p>
                                    <div className="text-warning">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <img src={img1} className="rounded-circle mb-3" width="100" height="100" alt="Client 2" style={{ objectFit: 'cover' }} />
                                    <h5 className="card-title">Michael Chen</h5>
                                    <h6 className="card-subtitle mb-3 text-muted">Director, Global Innovations</h6>
                                    <p className="card-text">"Working with them was a game-changer for our business. They understood our vision and executed it perfectly."</p>
                                    <div className="text-warning">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <img src={img1} className="rounded-circle mb-3" width="100" height="100" alt="Client 3" style={{ objectFit: 'cover' }} />
                                    <h5 className="card-title">David Wilson</h5>
                                    <h6 className="card-subtitle mb-3 text-muted">Founder, Creative Minds</h6>
                                    <p className="card-text">"Their innovative approach and problem-solving skills helped us overcome complex challenges. Highly recommended!"</p>
                                    <div className="text-warning">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Slider;