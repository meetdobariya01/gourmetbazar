import React from "react";
import Header from "../header/header";
import HeroCarousel from "../carousel/carousel";
import Categories from "../Categories/Categories";
import Productgried from "../product-grid/productgried";
import Banner from "../banner/banner";
import Footer from "../footer/footer";

export const Home = () => {
  return (
    <div>
      {/* header */}
      <Header />
      {/* hero carousel */}
      <HeroCarousel />
      {/* main section */}
      <div className="container my-4">
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 rounded"
          style={{ backgroundColor: "#fff0dc" }}
        >
          <div className="text-center text-md-start">
            <h4 className="fw-bold text-success mb-2">
              100% Natural Quality Organic Product
            </h4>
            <p className="text-secondary mb-0">
              See Our latest discounted products from here and get a special
              discount product
            </p>
          </div>
          <div className="mt-3 mt-md-0">
            <button className="btn btn-success rounded-pill px-4 py-2">
              Shop Now
            </button>
          </div>
        </div>
      </div>
      {/*categories*/}
      <Categories />

      {/* product grid */}
      <Productgried />

      {/* banner */}
      <Banner />

      {/* footer */}
      <Footer />
    </div>
  );
};
