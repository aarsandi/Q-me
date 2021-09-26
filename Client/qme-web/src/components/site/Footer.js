import React from 'react'

export default function Footer() {
    return (
        <div>
            <section className="ftco-intro img" style={{ backgroundImage: `url('./asset/bg_1.jpg')`}}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-9 text-center">
                            <h2>Your Health is Our Priority</h2>
                            <p>We can manage your dream building A small river named Duden flows by their place</p>
                            <p className="mb-0"><a href="#" className="btn btn-white px-4 py-3">Search Places</a></p>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="footer_part">
                <div class="copygight_text">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-lg-12">
                                <div class="copyright_text">
                                    <p>Copyright All rights reserved | This template is made with</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
