import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import "../../index.css"
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
export const Orderconfirmed = () => {
  return (
    <div>
        {/* header import */}
        <Header/>

         <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="text-center p-4 shadow-lg border-0 rounded-4">
            <div className="checkmark-container mx-auto my-3">
              <div className="checkmark">✓</div>
            </div>
            <h2 className="text-success">Order Confirmed!</h2>
            <p className="text-muted mb-4">
              Thank you for your purchase. Your order has been successfully placed and is being processed.
            </p>
            <Button variant="success" href="/" className="px-4 py-2 rounded-pill">
              Continue Shopping
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>

    {/* footer import */}
    <Footer/>
    </div> 
  )
}
export default Orderconfirmed;
