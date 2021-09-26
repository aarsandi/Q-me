import React from 'react'

function DokterCard() {
  return (
    <div className="container div-entertainment">
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block" src="https://asset.kompas.com/crops/nO1skkIdLelqzqC3fEIOFQpxdUo=/338x0:1850x756/750x500/data/photo/2019/05/07/823404649.jpg" alt="First slide" />
            <div className="card-body">
              <h2 className="card-title">Dr. Fatimah Hidayani</h2>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block" src="https://v.fastcdn.co/u/2fdba1a6/23428726-0-Assoc.-Prof.-Dr.-Han.jpg" alt="Second slide" />
            <div className="card-body">
              <h2 className="card-title">Dr. Hary Tungadi</h2>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  )
}

export default DokterCard;