import React from "react";
import "../../App.css"; // Optional for custom CSS
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

export const Aboutus = () => {
  return (
    <div>
      
      {/* header import */}
      <Header />

      {/* banner-section */}
      <div className="position-relative text-center py-5 bg-light">
        {/* Left Image */}
        <img
          src="/image/b-1.png"
          alt="Fruits Left"
          className="position-absolute top-0 start-0 img-fluid d-none d-md-block"
          style={{ maxHeight: "100%", maxWidth: "30%" }}
        />

        {/* Right Image */}
        <img
          src="/image/b-2.png"
          alt="Groceries Right"
          className="position-absolute top-0 end-0 img-fluid d-none d-md-block"
          style={{ maxHeight: "100%", maxWidth: "50%" }}
        />

        {/* Title */}
        <h1 className="fw-bold text-dark z-1 position-relative">About Us</h1>
      </div>

      {/* about-us-section */}
      <div className="container py-5">
        <h2 className="text-primary fw-bold mb-4">
          Welcome to our <span className="text-success">Gourmet Bazar</span>{" "}
          shop
        </h2>

        <div className="row">
          <div className="col-md-7">
            <p>
              Welcome to our grocery store, your neighborhood destination for
              fresh, quality food. We are committed to providing daily
              essentials at fair prices with friendly service, making your
              shopping experience easy, convenient, and satisfying.
            </p>
            <p>
              We proudly source farm-fresh fruits, vegetables, grains, and dairy
              to bring health and flavor to your table. Our partnerships with
              local suppliers ensure high-quality products while supporting
              community farmers and small businesses.
            </p>
            <p>
              At our store, customer satisfaction comes first. Whether you're
              stocking up on everyday items or searching for specialty
              ingredients, we’re here to help. Our clean aisles and organized
              layout make shopping stress-free.
            </p>
            <p>
              With years of experience, we’ve grown into a trusted local brand.
              Our mission is simple: deliver value, quality, and care. Visit us
              today and feel the difference of shopping with people who care.
            </p>
          </div>

          <div className="col-md-5">
            <div className="row g-2">
              <div className="col-6">
                <img
                  src="/image/aboutus-2.jpg"
                  className="img-fluid rounded"
                  alt="about"
                />
              </div>
              <div className="col-6">
                <img
                  src="/image/aboutus-4.jpg"
                  className="img-fluid rounded"
                  alt="about"
                />
              </div>
              <div className="col-6">
                <img
                  src="/image/aboutus-3.jpg"
                  className="img-fluid rounded"
                  alt="about"
                />
              </div>
              <div className="col-6">
                <img
                  src="/image/aboutus-3.jpg"
                  className="img-fluid rounded"
                  alt="about"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Boxes */}
        <div className="row text-center mt-5">
          <div className="col-md-6 mb-3">
            <div className="p-4 border rounded shadow-sm">
              <h3 className="text-primary fw-bold">8K</h3>
              <h5 className="fw-semibold">Lovely Customers</h5>
              <p className="text-muted mb-0">
                Competently productize virtual models without performance.
              </p>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="p-4 border rounded shadow-sm">
              <h3 className="text-success fw-bold">10K</h3>
              <h5 className="fw-semibold">Listed Products</h5>
              <p className="text-muted mb-0">
                Dynamically morph team-driven partnerships after vertical.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Paragraphs */}
        <div className="row mt-5">
          <div className="col">
            <p>
              Welcome to Gourmet Bazar, your trusted neighborhood grocery store
              offering fresh fruits, vegetables, dairy, grains, and everyday
              essentials at affordable prices. We believe in quality, freshness,
              and friendly service to make your shopping experience easy and
              enjoyable.
            </p>
            <p>
              Locally sourced and carefully selected, our products meet the
              highest standards. Whether you're shopping for your family or just
              picking up a few items, we’re here to serve you with a smile.
              Thank you for choosing Kacha Bazar — where quality meets
              convenience every day.
            </p>
          </div>
        </div>

        {/* Bottom Image */}
        <div className="row mt-4">
          <div className="col">
            <img
              src="/image/aboutus-banner.png"
              className="img-fluid rounded"
              alt="main about"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Aboutus;
