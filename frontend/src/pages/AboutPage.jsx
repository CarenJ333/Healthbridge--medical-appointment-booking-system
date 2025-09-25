import "../App.css";

export default function AboutPage() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>About <span className="highlight">HealthBridge</span></h1>
          <p>
            Revolutionizing healthcare by connecting patients and doctors seamlessly.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <h2>Who We Are</h2>
          <p>
            HealthBridge is a modern healthcare management platform designed to
            simplify how patients book appointments and how doctors manage their schedules.
            Our mission is to make healthcare more accessible, organized, and stress-free
            for everyone.
          </p>

          <h2>Our Vision</h2>
          <p>
            To empower patients and healthcare professionals with technology that
            improves communication, reduces waiting times, and enhances the quality
            of healthcare delivery.
          </p>

          <h2>Why Choose Us?</h2>
          <ul className="features-list">
            <li>✔ 24/7 online appointment booking</li>
            <li>✔ Easy doctor availability management</li>
            <li>✔ Personalized dashboards for patients and doctors</li>
            <li>✔ Secure, fast, and user-friendly platform</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
