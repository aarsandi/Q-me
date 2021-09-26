import React from 'react'
import SiteNav from '../components/site/SiteNav'
import Carousel from '../components/site/Carousel'
import Footer from '../components/site/Footer'

export default function ListDoctor() {
    return (
        <div>
            <SiteNav/>
            <Carousel/>
            <section className="ftco-section" id="doctor-section">
                <div className="container-fluid px-5">
                    <div className="row justify-content-center mb-5 pb-2">
                        <div className="col-md-8 text-center heading-section ftco-animate">
                            <h2 className="mb-4">Our Qualified Doctors</h2>
                            <p>Separated they live in. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country</p>
                        </div>
                    </div>	
                    <div className="row">
                        <div className="col-md-6 col-lg-3 ftco-animate">
                            <div className="staff">
                                <div className="img-wrap d-flex align-items-stretch">
                                    <div className="img align-self-stretch" style={{ backgroundImage: `url('./asset/bg_1.jpg')`}}></div>
                                </div>
                                <div className="text pt-3 text-center">
                                    <h3 className="mb-2">Dr. Lloyd Wilson</h3>
                                    <span className="position mb-2">Neurologist</span>
                                    <div className="faded">
                                        <p>I am an ambitious workaholic, but apart from that, pretty simple person.</p>
                                        <p><a href="#" className="btn btn-primary">Book now</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}
