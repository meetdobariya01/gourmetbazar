import React from 'react';
import { motion } from 'framer-motion';
import '../../index.css'; // Optional if you want custom styles

export const Banner = () => {
  return (
    <div>
         <div className="container-fluid bg-success-subtle py-5">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Content */}
          <motion.div 
            className="col-md-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h5 className="text-uppercase text-success">Organic Products and Food</h5>
            <h1 className="fw-bold display-5">
              Quick Delivery <span className="text-success">to Your Home</span>
            </h1>
            <p className="lead text-muted mt-3">
              Choose your daily products from our shop and get special discounts on delivery. 
              See our latest offers and grab your favorites now!
            </p>
            <button className="btn btn-success btn-lg rounded-pill mt-4">
              Download App
            </button>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="col-md-6 text-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img src="/image/banner-1.gif" alt="Delivery Banner" className="img-fluid animated-img" />
          </motion.div>

        </div>
      </div>
    </div>
    </div>
  )
}
export default Banner;