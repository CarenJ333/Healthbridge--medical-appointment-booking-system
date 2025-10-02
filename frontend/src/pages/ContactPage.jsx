import "../App.css";

export default function ContactPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      // Send to first Formspree endpoint
      await fetch("https://formspree.io/f/mldpbpaj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Send to second Formspree endpoint
      await fetch("https://formspree.io/f/xyznjdwg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      alert("Message sent successfully!");
      form.reset();
    } catch (error) {
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>
            Get in <span className="highlight">Touch</span>
          </h1>
          <p>Have questions or need assistance? We're here to help you 24/7.</p>
        </div>
      </section>

      <section className="contact-info">
        <h2>Contact Information</h2>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon"></div>
            <h3>Email</h3>
            <p>support@healthbridge.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon"></div>
            <h3>Phone</h3>
            <p>+254748257989</p>
          </div>

          <div className="info-card">
            <div className="info-icon"></div>
            <h3>Location</h3>
            <p>HealthBridge HQ, Nairobi, Kenya</p>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className="btn primary">Send Message</button>
        </form>
      </section>
    </div>
  );
}
