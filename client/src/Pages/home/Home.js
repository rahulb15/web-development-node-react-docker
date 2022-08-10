
import React from 'react'
import image from "../../images/home.png"
const Home = () => {
  return (
    <div>
        <section className="home" align="center">
       
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="home-content">
                            <div className="home-form">
                                <h1 className="form-title" width="100%"><span className="text-primary">Tarsier</span></h1>
                                <img src={image} alalt="Avatar" className="avatar" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home
