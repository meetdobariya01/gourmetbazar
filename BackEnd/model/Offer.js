const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  code: String,
  description: String,
  discountPercent: Number,
  isFirstOrderOnly: Boolean
});

module.exports = mongoose.model('Offer', offerSchema);




// router.post('/order', async (req, res) => {
//   const { email, items, offerCode } = req.body;

//   let discount = 0;

//   // Check if first order
//   const previousOrders = await Order.find({ email });
//   const isFirstOrder = previousOrders.length === 0;

//   if (offerCode) {
//     const offer = await Offer.findOne({ code: offerCode.toUpperCase() });
//     if (!offer) return res.status(400).json({ error: "Invalid offer code" });

//     if (offer.isFirstOrderOnly && !isFirstOrder) {
//       return res.status(400).json({ error: "Offer only valid on first order" });
//     }

//     discount = offer.discountPercent;
//   } else if (isFirstOrder) {
//     // Apply default first order offer
//     discount = 50;
//   }

//   // Calculate total
//   let total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   let finalAmount = total - (total * discount / 100);

//   // Save Order logic...
//   res.json({ total, finalAmount, discount });
// });


// src/pages/SearchResults.js
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Container, Row, Col, Card } from "react-bootstrap";

// const API_BASE = "http://localhost:5000";

// const SearchResults = () => {
//   const [results, setResults] = useState([]);
//   const query = new URLSearchParams(useLocation().search).get("query");

//   useEffect(() => {
//     if (query) {
//       fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}`)
//         .then((res) => res.json())
//         .then(setResults)
//         .catch((err) => console.error("Search error:", err));
//     }
//   }, [query]);

//   return (
//     <Container className="my-4">
//       <h3>Search Results for: <strong>{query}</strong></h3>
//       <Row>
//         {results.length > 0 ? (
//           results.map((item) => (
//             <Col md={4} key={item._id} className="mb-4">
//               <Card>
//                 <Card.Img
//                   variant="top"
//                   src={
//                     item.Photos
//                       ? `${API_BASE}${item.Photos}`
//                       : "https://via.placeholder.com/150"
//                   }
//                 />
//                 <Card.Body>
//                   <Card.Title>{item.FoodName}</Card.Title>
//                   <Card.Text>{item.Description}</Card.Text>
//                   <h5>₹{item.FoodPrice}</h5>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         ) : (
//           <p>No results found.</p>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default SearchResults;
