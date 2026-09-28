import "./Footer.css";

function Footer({ setSelectedCategory, setSelectedSideCategory }) {

  const openCategory = (category, sideCategory = null) => {
    setSelectedCategory(category);

    if (sideCategory) {
      setSelectedSideCategory(sideCategory);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="freshmart-footer">

      <div className="freshmart-footer-main">

        {/* BRAND */}
        <div className="footer-brand-section">
          <div className="footer-logo">
            Fresh<span>Mart</span>
          </div>

          <p className="footer-tagline">
            Fresh choices, everyday convenience.
          </p>

          <p className="footer-description">
            FreshMart brings fresh groceries and everyday essentials
            closer to your home with simple, reliable and convenient
            online shopping.
          </p>

          <div className="footer-trust">
            <div>
              <strong>✓</strong>
              <span>Fresh Products</span>
            </div>

            <div>
              <strong>✓</strong>
              <span>Easy Shopping</span>
            </div>

            <div>
              <strong>✓</strong>
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>


       {/* SHOP */}
<div className="footer-column">
  <h3>Shop</h3>

  <button
    onClick={() => {
      setSelectedCategory("Fruits & Vegetables");
      setSelectedSideCategory("Fresh Fruits");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  >
    Fruits & Vegetables
  </button>

  <button
    onClick={() => {
      setSelectedCategory("Dairy, Bread & Eggs");
      setSelectedSideCategory("Milk");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  >
    Dairy & Eggs
  </button>

  <button
    onClick={() => {
      setSelectedCategory("Snacks & Munchies");
      setSelectedSideCategory("Chips & Crisps");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  >
    Snacks & Munchies
  </button>

  <button
    onClick={() => {
      setSelectedCategory("Bakery & Biscuits");
      setSelectedSideCategory("Glucose & Marie");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  >
    Bakery & Biscuits
  </button>

  <button
    onClick={() => {
      setSelectedCategory("Cold Drinks & Juices");
      setSelectedSideCategory("Soft Drinks");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  >
    Cold Drinks & Juices
  </button>

  <button
    onClick={() => {
      setSelectedCategory("Personal Care");
      setSelectedSideCategory("Face & Body Moisturizers");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  >
    Personal Care
  </button>
</div>


        {/* FRESHMART */}
        <div className="footer-column">
          <h3>FreshMart</h3>

          <button>About Us</button>
          <button>Our Categories</button>
          <button>Offers</button>
          <button>My Account</button>
          <button>My Cart</button>
          <button>Contact Us</button>
        </div>


        {/* HELP */}
        <div className="footer-column">
          <h3>Help & Support</h3>

          <button>Help Center</button>
          <button>Delivery Information</button>
          <button>Returns & Refunds</button>
          <button>Payment Information</button>
          <button>Privacy Policy</button>
          <button>Terms & Conditions</button>
        </div>


        {/* CONTACT */}
        <div className="footer-contact">
          <h3>Get in Touch</h3>

          <div className="contact-item">
            <div className="contact-icon">☎</div>
            <div>
              <small>Call Us</small>
              <p>+91 8907233331</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">✉</div>
            <div>
              <small>Email Us</small>
              <p>support@freshmart.com</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">⌖</div>
            <div>
              <small>We Deliver Across</small>
              <p>India</p>
            </div>
          </div>

          <div className="footer-social">
            <span>f</span>
            <span>𝕏</span>
            <span>◎</span>
            <span>▶</span>
          </div>
        </div>

      </div>


      {/* NEWSLETTER */}
      <div className="footer-newsletter">
        <div>
          <h3>Stay fresh with FreshMart</h3>
          <p>
            Get updates about new products, special offers and more.
          </p>
        </div>

        <div className="newsletter-box">
          <input
            type="email"
            placeholder="Enter your email address"
          />

          <button>Subscribe</button>
        </div>
      </div>


      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 FreshMart. All rights reserved.</p>

        <div className="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>

        <p className="made-with">
          Made with <span>♥</span> for better everyday shopping
        </p>
      </div>

    </footer>
  );
}

export default Footer;