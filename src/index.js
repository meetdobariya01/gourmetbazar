import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import reportWebVitals from "./reportWebVitals";
// import { Header } from "./component/header/header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./component/home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aboutus from "./pages/aboutus/aboutus";
import Contactus from "./pages/contactus/contactus";
import Loginpage from "./pages/loginpage/loginpage";
import Singup from "./pages/signup/singup";
import Privacypolicy from "./pages/privacypolicy/privacypolicy";
import Termsandcondition from "./pages/terms-condition/termsandcondition";
import Faqs from "./pages/faqs/faqs";
import Checkout from "./pages/checkout/checkout";
import Product from "./pages/product/product";
<<<<<<< HEAD
import Collection from "./pages/collection/collection";
import Orderconfirmed from "./pages/orderconfirmed/orderconfirmed";
import SearchResults from "./pages/SearchResults.js/SearchResults";
import Cart from "./pages/cart/cart";

=======
import SearchResults from '../src/pages/SearchResults.js/SearchResults';
// REMOVE this line if not used
// import Header from '../src/component/header/header';
import Collection from "./pages/collection/collection";
>>>>>>> 109b64e (scgd)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/contactus" element={<Contactus />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<Singup />} />
      <Route path="/privacypolicy" element={<Privacypolicy />} />
      <Route path="/termsandconditions" element={<Termsandcondition />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/product" element={<Product />} />
      <Route path="/collection" element={<Collection />} />
<<<<<<< HEAD
      <Route path="/cart" element={<Cart />} />
      <Route path="/orderconfirmed" element={<Orderconfirmed />} />
      <Route path="/search" element={<SearchResults />} />
=======
      <Route path="/category/:categorySlug" element={<Collection />} />
      <Route path="/:categorySlug" element={<Collection />} />
        <Route path="/search" element={<SearchResults />} />
>>>>>>> 109b64e (scgd)
    </Routes>
  </Router>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
