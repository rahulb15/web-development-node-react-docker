import React from 'react'
import welcomeImage from '../../images/welcome.gif'

const Welcome = () => {
  return (
    <div>
      <section className="welcome" align="center">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="welcome-content">
                <div className="welcome-form">
                  <h1 className="form-title" width="100%">Welcome to the <span className="text-primary">Tarsier</span></h1>
                  <img src={welcomeImage} alalt="Avatar" className="avatar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  //  <img src={welcomeImage} alt="welcome" width="100%" height="100%" />
  )
}

export default Welcome