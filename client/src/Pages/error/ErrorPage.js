import React from 'react'
import errorImage from '../../images/error.jpg'

const ErrorPage = () => {
  return (
    <div>
      <section className="error" align="center">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="error-content">
                <div className="error-form">
                  <h1 className="form-title" width="100%"><span className="text-primary">ERROR 401</span></h1>
                  <img src={errorImage} alalt="Error" className="error" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  )
}

export default ErrorPage