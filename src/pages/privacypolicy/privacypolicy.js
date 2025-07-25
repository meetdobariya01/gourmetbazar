import React from "react";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

const Privacypolicy = () => {
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
        <h1 className="fw-bold text-dark z-1 position-relative">
          Privacy Policy
        </h1>
      </div>

      {/* privacy-policy-section */}
      <div className="container py-5">
        {/* <h1 className="mb-4 text-center">Privacy Policy</h1> */}
        <p className="lead">
          At Gourmet Bazar, we value your privacy and are committed to
          protecting your personal data. This Privacy Policy explains how we
          collect, use, and protect your information when you use our website or
          services.
        </p>

        <h3 className="mt-5">1. Information We Collect</h3>
        <p>
          We may collect and process the following types of personal
          information:
        </p>
        <ul>
          <li>
            <strong>Personal Identification Information:</strong> Name, email
            address, phone number, and shipping address.
          </li>
          <li>
            <strong>Payment Details:</strong> Credit/debit card information or
            payment gateway details (handled securely via third-party services).
          </li>
          <li>
            <strong>Account Information:</strong> Login credentials, order
            history, preferences, and saved items.
          </li>
          <li>
            <strong>Technical Data:</strong> IP address, browser type, device
            information, cookies, and usage data.
          </li>
          <li>
            <strong>Marketing & Communication Data:</strong> Your preferences in
            receiving promotional emails or SMS.
          </li>
        </ul>

        <h3 className="mt-5">2. How We Use Your Information</h3>
        <p>We use the collected data for the following purposes:</p>
        <ul>
          <li>
            To process and fulfill your orders, including sending order
            confirmations and shipping updates.
          </li>
          <li>
            To manage your account, provide customer support, and respond to
            your inquiries.
          </li>
          <li>
            To personalize your shopping experience and recommend products based
            on your preferences.
          </li>
          <li>
            To send you promotional offers, newsletters, and updates (only if
            you opt-in).
          </li>
          <li>
            To improve our website, services, and user experience through
            analytics and user feedback.
          </li>
          <li>
            To prevent fraudulent transactions and ensure platform security.
          </li>
        </ul>

        <h3 className="mt-5">3. Cookies and Tracking Technologies</h3>
        <p>
          We use cookies and similar tracking technologies to enhance your
          browsing experience. These may include:
        </p>
        <ul>
          <li>
            <strong>Session Cookies:</strong> To maintain your logged-in state
            and shopping cart contents.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> To understand how users interact
            with our website (e.g., Google Analytics).
          </li>
          <li>
            <strong>Advertising Cookies:</strong> To deliver relevant ads on
            social media and search engines.
          </li>
        </ul>
        <p>
          You can control or disable cookies through your browser settings.
          However, some site features may not function properly without them.
        </p>

        <h3 className="mt-5">4. How We Share Your Data</h3>
        <p>
          We do not sell, rent, or trade your personal information. However, we
          may share data with:
        </p>
        <ul>
          <li>
            Trusted third-party partners for payment processing, shipping, and
            marketing (e.g., Razorpay, PayPal, logistics providers).
          </li>
          <li>
            Analytics and service providers for business intelligence (e.g.,
            Google, Meta, Hotjar).
          </li>
          <li>
            Legal authorities, if required by law or in connection with legal
            proceedings.
          </li>
        </ul>

        <h3 className="mt-5">5. Data Security</h3>
        <p>
          We implement strong security measures such as SSL encryption,
          firewalls, and secure data storage to protect your personal
          information. However, no online platform is 100% secure, and we
          encourage you to protect your login credentials.
        </p>

        <h3 className="mt-5">6. Your Rights & Choices</h3>
        <p>You have the right to:</p>
        <ul>
          <li>
            Access or update your personal information from your account
            dashboard.
          </li>
          <li>Request deletion of your account and associated data.</li>
          <li>
            Opt-out of receiving promotional communications by clicking
            "unsubscribe" in emails.
          </li>
          <li>
            Request a copy of the data we hold about you (data portability
            request).
          </li>
        </ul>

        <h3 className="mt-5">7. Third-Party Links</h3>
        <p>
          Our website may contain links to third-party websites (e.g.,
          Instagram, payment providers). We are not responsible for their
          privacy practices. Please review their privacy policies before
          interacting.
        </p>

        <h3 className="mt-5">8. Children's Privacy</h3>
        <p>
          Our services are not intended for users under the age of 13. We do not
          knowingly collect data from children. If we learn of such data, it
          will be deleted immediately.
        </p>

        <h3 className="mt-5">9. Policy Updates</h3>
        <p>
          This Privacy Policy may be updated occasionally to reflect changes in
          technology, legal requirements, or our practices. We encourage you to
          review it periodically.
        </p>

        <h3 className="mt-5">10. Contact Us</h3>
        <p>
          If you have any questions or concerns regarding this Privacy Policy or
          your personal data, you can contact us at:
        </p>
        <ul>
          <li>Email: support@gourmetbazar.com</li>
          <li>Phone: +91-98765-43210</li>
          <li>Address: 123 Market Street, Ahmedabad, Gujarat, India</li>
        </ul>

        <p className="text-muted mt-5">Last updated: July 14, 2025</p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Privacypolicy;
