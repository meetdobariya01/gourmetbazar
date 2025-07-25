import React from 'react'
import Header from '../../component/header/header';

const Termsandcondition = () => {
  return (
    <div>
      
        {/* header import */}
        <Header/>

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
        <h1 className="fw-bold text-dark z-1 position-relative">Terms and Conditions</h1>
      </div>

        {/* terms and conditions section */}
         <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* <h1 className="mb-4 text-center">Terms and Conditions</h1> */}
          <p className="text-muted">
            Welcome to [Your Store Name]! These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>

          <h4 className="mt-5">1. Acceptance of Terms</h4>
          <p>
            By accessing this website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our website or services.
          </p>

          <h4 className="mt-4">2. Modification of Terms</h4>
          <p>
            We reserve the right to modify or replace these Terms at any time. It is your responsibility to check this page periodically for changes. Continued use of the website after any such changes shall constitute your consent to such changes.
          </p>

          <h4 className="mt-4">3. Eligibility</h4>
          <p>
            You must be at least 18 years old to use this website or have permission from a legal guardian. By using this website, you warrant that you meet this requirement.
          </p>

          <h4 className="mt-4">4. Account Registration</h4>
          <p>
            To access certain features, you may need to register an account. You are responsible for maintaining the confidentiality of your account and password and for all activities under your account.
          </p>

          <h4 className="mt-4">5. Product Information</h4>
          <p>
            We make every effort to display the most accurate product descriptions, prices, and availability. However, we do not guarantee that product descriptions or other content is error-free, complete, or current.
          </p>

          <h4 className="mt-4">6. Orders and Payments</h4>
          <p>
            All orders are subject to acceptance and availability. We reserve the right to cancel orders at any time. Payment must be made through our secure payment gateway. Prices are subject to change without notice.
          </p>

          <h4 className="mt-4">7. Shipping and Delivery</h4>
          <p>
            Delivery times are estimates only and not guaranteed. We are not liable for any delays caused by third-party couriers or events beyond our control.
          </p>

          <h4 className="mt-4">8. Returns and Refunds</h4>
          <p>
            We accept returns within [30] days of delivery. Returned products must be in original condition. Refunds will be processed within 7 business days after we receive the item.
          </p>

          <h4 className="mt-4">9. User Conduct</h4>
          <p>
            You agree not to misuse our services or violate any laws in your jurisdiction. Harassment, abuse, and harmful conduct towards others on our site are strictly prohibited.
          </p>

          <h4 className="mt-4">10. Intellectual Property</h4>
          <p>
            All content, logos, graphics, and designs on this site are the property of [Your Store Name] and protected by intellectual property laws. You may not reproduce, distribute, or use them without permission.
          </p>

          <h4 className="mt-4">11. Third-Party Links</h4>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content or practices of these sites and encourage you to read their terms and privacy policies.
          </p>

          <h4 className="mt-4">12. Limitation of Liability</h4>
          <p>
            We shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from your use of the website or inability to access it.
          </p>

          <h4 className="mt-4">13. Indemnification</h4>
          <p>
            You agree to indemnify and hold harmless [Your Store Name], its affiliates, employees, and partners from any claim or demand, including reasonable attorney fees, arising from your breach of these Terms.
          </p>

          <h4 className="mt-4">14. Termination</h4>
          <p>
            We reserve the right to suspend or terminate your account or access to our services at our sole discretion, without notice, for any reason, including violation of these Terms.
          </p>

          <h4 className="mt-4">15. Governing Law</h4>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law principles.
          </p>

          <h4 className="mt-4">16. Contact Information</h4>
          <p>
            For any questions about these Terms and Conditions, you can contact us at:
            <br />
            📧 Email: support@yourstore.com
            <br />
            📞 Phone: +1-234-567-8900
          </p>

          <p className="text-muted mt-5">
            Last updated: July 14, 2025
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Termsandcondition;
