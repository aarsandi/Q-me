import React from 'react'
import SiteNav from './SiteNav'
import Carousel from './Carousel'
import Footer from './Footer'
import { useQuery } from '@apollo/client'
import { GETDOCTOR } from '../../api/apolloClient'

export default function HomeWithoutToken() {
    const { loading, error, data } = useQuery(GETDOCTOR, {variables: {by: 7}})

    if (loading) {
        return (
            <>
                <SiteNav dataUser={null}/>
                <h1>loading.....</h1>
                <Footer/>
            </>
        )
    } else if (error) {
        return (
            <>
                <SiteNav dataUser={null}/>
                <h1>error..........</h1>
                <Footer/>
            </>
        )
    } else if (data) {
        return (
            <>
                <SiteNav dataUser={null}/>
                <Carousel/>
                <section className="ftco-counter img ftco-section ftco-no-pt ftco-no-pb" id="about-section">
                    <div className="container">
                        <div className="row d-flex">
                            <div className="col-md-6 col-lg-5 d-flex">
                                <div className="img d-flex align-self-stretch align-items-center" style={{ backgroundImage: `url('./asset/about.jpg')` }}>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-7 pl-lg-5 py-md-5">
                                <div className="py-md-5">
                                    <div className="row justify-content-start pb-3">
                                        <div className="col-md-12 heading-section p-4 p-lg-5">
                                            <h2 className="mb-4">We Are <span>Mediplus</span> A Medical Clinic</h2>
                                            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                            <p><a href="#" className="btn btn-primary py-3 px-4">Make an appointment</a> <a href="#" className="btn btn-secondary py-3 px-4">Contact us</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="ftco-section ftco-services-2 bg-light">
                    <div className="container">
                        <div className="row d-flex">
                            <div className="col-md-7 py-5">
                                <div className="py-lg-5">
                                    <div className="row justify-content-center pb-5">
                                        <div className="col-md-12 heading-section">
                                            <h2 className="mb-3">Our Services</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-self-stretch">
                                            <div className="media block-6 services d-flex">
                                            <div className="icon justify-content-center align-items-center d-flex"><span className="fa fa-ambulance"></span></div>
                                            <div className="media-body pl-md-4">
                                                <h3 className="heading mb-3">Emergency Services</h3>
                                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                            </div>
                                            </div>      
                                        </div>
                                        <div className="col-md-6 d-flex align-self-stretch">
                                            <div className="media block-6 services d-flex">
                                            <div className="icon justify-content-center align-items-center d-flex"><span className="fa fa-user-md"></span></div>
                                            <div className="media-body pl-md-4">
                                                <h3 className="heading mb-3">Qualified Doctors</h3>
                                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                            </div>
                                            </div>      
                                        </div>
                                        <div className="col-md-6 d-flex align-self-stretch">
                                            <div className="media block-6 services d-flex">
                                            <div className="icon justify-content-center align-items-center d-flex"><span className="fa fa-stethoscope"></span></div>
                                            <div className="media-body pl-md-4">
                                                <h3 className="heading mb-3">Outdoors Checkup</h3>
                                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                            </div>
                                            </div>      
                                        </div>
                                        <div className="col-md-6 d-flex align-self-stretch">
                                            <div className="media block-6 services d-flex">
                                            <div className="icon justify-content-center align-items-center d-flex"><span className="fa fa-hospital-o"></span></div>
                                            <div className="media-body pl-md-4">
                                                <h3 className="heading mb-3">24 Hours Service</h3>
                                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                            </div>
                                            </div>      
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="ftco-section ftco-no-pt ftco-no-pb" id="department-section">
                    <div className="container-fluid px-0">
                        <div className="row no-gutters">
                            <div className="col-md-4 d-flex">
                                <div className="img img-dept align-self-stretch" style={{ backgroundImage: `url('./asset/bg_1.jpg')`}}></div>
                            </div>

                            <div className="col-md-8">
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <div className="department-wrap p-4">
                                            <div className="text p-2 text-center">
                                                <div className="icon">
                                                    <span className="fa fa-stethoscope"></span>
                                                </div>
                                                <h3><a href="#">Neurology</a></h3>
                                                <p>Far far away, behind the word mountains</p>
                                            </div>
                                        </div>
                                        <div className="department-wrap p-4">
                                            <div className="text p-2 text-center">
                                                <div className="icon">
                                                    <span className="fa fa-stethoscope"></span>
                                                </div>
                                                <h3><a href="#">Surgical</a></h3>
                                                <p>Far far away, behind the word mountains</p>
                                            </div>
                                        </div>
                                        <div className="department-wrap p-4">
                                            <div className="text p-2 text-center">
                                                <div className="icon">
                                                    <span className="fa fa-stethoscope"></span>
                                                </div>
                                                <h3><a href="#">Dental</a></h3>
                                                <p>Far far away, behind the word mountains</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="department-wrap p-4">
                                            <div className="text p-2 text-center">
                                                <div className="icon">
                                                    <span className="fa fa-stethoscope"></span>
                                                </div>
                                                <h3><a href="#">Opthalmology</a></h3>
                                                <p>Far far away, behind the word mountains</p>
                                            </div>
                                        </div>
                                        <div className="department-wrap p-4">
                                            <div className="text p-2 text-center">
                                                <div className="icon">
                                                    <span className="fa fa-stethoscope"></span>
                                                </div>
                                                <h3><a href="#">Cardiology</a></h3>
                                                <p>Far far away, behind the word mountains</p>
                                            </div>
                                        </div>
                                        <div className="department-wrap p-4">
                                            <div className="text p-2 text-center">
                                                <div className="icon">
                                                    <span className="fa fa-stethoscope"></span>
                                                </div>
                                                <h3><a href="#">Traumatology</a></h3>
                                                <p>Far far away, behind the word mountains</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="department-wrap p-4">
                                            <div className="text p-2 text-center">
                                                <div className="icon">
                                                    <span className="fa fa-stethoscope"></span>
                                                </div>
                                                <h3><a href="#">Nuclear Magnetic</a></h3>
                                                <p>Far far away, behind the word mountains</p>
                                            </div>
                                        </div>
                                        <div className="department-wrap p-4">
                                            <div className="text p-2 text-center">
                                                <div className="icon">
                                                    <span className="fa fa-stethoscope"></span>
                                                </div>
                                                <h3><a href="#">X-ray</a></h3>
                                                <p>Far far away, behind the word mountains</p>
                                            </div>
                                        </div>
                                        <div className="department-wrap p-4">
                                            <div className="text p-2 text-center">
                                                <div className="icon">
                                                    <span className="fa fa-stethoscope"></span>
                                                </div>
                                                <h3><a href="#">Cardiology</a></h3>
                                                <p>Far far away, behind the word mountains</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </>
        )
    }
}
