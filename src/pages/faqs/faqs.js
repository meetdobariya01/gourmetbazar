import React from "react";
import Header from "../../component/header/header";
// import { Container, Row, Col, Accordion } from "react-bootstrap";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Container, Row, Col, Accordion, Image } from "react-bootstrap";
import Footer from "../../component/footer/footer";

const faqs = [
  {
    q: "What payment methods do you accept?",
    a: "We accept cash, credit/debit cards, mobile wallets like Apple Pay or Google Pay, and store gift cards.",
  },
  {
    q: "Do you offer delivery or pickup?",
    a: "Yes—select between delivery or curbside pickup at checkout, depending on your area.",
  },
  {
    q: "Can I order online?",
    a: "Absolutely. Create an account, select items, and place your order for pickup or delivery.",
  },
  {
    q: "Is membership required for discounts?",
    a: "No membership fee. We offer free rewards and coupon programs for savings.",
  },
  {
    q: "How do I redeem digital coupons?",
    a: "Clip coupons via your account or mobile app; they’ll apply automatically at checkout.",
  },
  {
    q: "What are your store hours?",
    a: "Our store is open 8 AM to 10 PM, seven days a week.",
  },
  {
    q: "Can I return or exchange items?",
    a: "Yes, within 14 days with receipt. Certain perishables may require manager approval.",
  },
  {
    q: "Do you offer catering services?",
    a: "Yes—we provide party trays and bulk items. Call ahead to place bulk catering orders.",
  },
  {
    q: "Are there loyalty programs or rewards?",
    a: "Yes—our loyalty program offers points per purchase and special savings events.",
  },
  {
    q: "Do you carry organic or specialty items?",
    a: "Yes—we have organic, gluten-free, non-GMO, and international specialty products.",
  },
  {
    q: "How do I check product availability?",
    a: "You can see stock in real time online or app—nearby store inventory is shown when logged in.",
  },
  //   { q: 'Do you offer gift cards?', a: 'Yes—physical and e‑gift cards available. Redeemable in-store or online.' },
  //   { q: 'How do I contact customer service?', a: 'You can reach us by phone at 123‑456‑7890 or email support@yourgrocery.com.' },
  //   { q: 'Can I change my delivery address after ordering?', a: 'Address changes may be made before order processing starts—contact support ASAP.' },
  //   { q: 'What if an item is out of stock?', a: 'Our personal shopper will replace it with a similar item or contact you for instructions.' }
];
export const Faqs = () => {
  return (
    <div>
      {/* header import */}
      <Header />

      {/* faqs banner section */}
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
        <h1 className="fw-bold text-dark z-1 position-relative">FAQs</h1>
      </div>

      {/* faqs question */}
      <Container className="my-5">
        <Row className="align-items-start">
          <Col xs={12} md={6} className="mb-4  mb-md-0">
            <Image src="/image/faq-1.jpg" fluid />
          </Col>
          <Col xs={12} md={6}>
            <Accordion defaultActiveKey="0" flush>
              {faqs.map((item, idx) => (
                <Accordion.Item eventKey={String(idx)} key={idx}>
                  <Accordion.Header>{item.q}</Accordion.Header>
                  <Accordion.Body>{item.a}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>

      {/* footer section */}
      <Footer />
    </div>
  );
};
export default Faqs;
