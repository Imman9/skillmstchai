import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="landing-container">
      <header class="header">
        <div class="logo-container">
          <span class="logo-icon">🤖</span>
          <span class="logo-text">SkillsMatch AI</span>
        </div>
        <nav class="nav">
          <a [routerLink]="['/auth/login']" class="nav-link">Login</a>
          <a [routerLink]="['/auth/signup']" class="nav-link primary"
            >Sign Up</a
          >
        </nav>
      </header>

      <main class="hero">
        <div class="hero-content">
          <div class="tagline">AI-POWERED CAREER MATCHING</div>
          <h1>Find Your Perfect <span class="highlight">Job Match</span></h1>
          <p class="hero-description">
            Our advanced AI algorithm analyzes your skills and preferences to
            connect you with career opportunities that truly match your
            potential.
          </p>
          <div class="cta-buttons">
            <button [routerLink]="['/auth/signup']" class="btn primary">
              Get Started - It's Free
            </button>
            <button [routerLink]="['/auth/login']" class="btn secondary">
              <span class="icon">→</span> Existing User Login
            </button>
          </div>
          <div class="trust-badges">
            <div class="badge">
              <span class="icon">✓</span> 10,000+ Successful Matches
            </div>
            <div class="badge">
              <span class="icon">★</span> 4.9/5 User Rating
            </div>
          </div>
        </div>
        <div class="hero-image">
          <img
            src="https://img.freepik.com/free-photo/colleagues-working-together-project_23-2149286162.jpg?t=st=1744606659~exp=1744610259~hmac=fd5735d7fe2c2d62274f81fcc49fedf942d82db44c85a24f7893fda621937812&w=1060"
            alt="Team collaboration illustration"
            class="hero-img"
          />
        </div>
      </main>

      <section class="features">
        <div class="feature-card">
          <div class="feature-icon">🔍</div>
          <h3>Smart Matching</h3>
          <p>Our AI analyzes thousands of jobs to find your perfect fit</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Fast Results</h3>
          <p>Get matched with relevant jobs in minutes, not hours</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Privacy Focused</h3>
          <p>Your data stays secure and private</p>
        </div>
      </section>

      <section class="testimonial">
        <div class="testimonial-content">
          <div class="quote-icon">❝</div>
          <p class="quote">
            SkillsMatch AI helped me find a job that perfectly matched my skills
            and career aspirations. I got hired within two weeks!
          </p>
          <div class="author">
            <div class="author-avatar">🤵‍♂️</div>
            <div class="author-info">
              <div class="author-name">Emmanuel K.</div>
              <div class="author-title">Software Developer</div>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>SkillsMatch AI</h3>
            <p>
              Revolutionizing job searching through artificial intelligence and
              machine learning technologies.
            </p>
          </div>
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a [routerLink]="['/auth/login']">Login</a></li>
              <li><a [routerLink]="['/auth/signup']">Sign Up</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Contact Us</h3>
            <ul class="contact-info">
              <li>📧 emmanuelkipkoech742&#64;gmail.com</li>
              <li>📞 0712375082</li>
              <li>📍 Nairobi, Kenya</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 SkillsMatch AI. All rights reserved.</p>
          <div class="social-links">
            <a href="#" class="social-icon">𝕏</a>
            <a href="#" class="social-icon">𝔽</a>
            <a href="#" class="social-icon">𝕃</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      /* Base Styles */
      :host {
        --primary-color: #4361ee;
        --secondary-color: #3f37c9;
        --accent-color: #4895ef;
        --light-color: #f8f9fa;
        --dark-color: #212529;
        --text-color: #495057;
        --text-light: #adb5bd;
        --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      .landing-container {
        min-height: 100vh;
        background-color: var(--light-color);
        display: flex;
        flex-direction: column;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        color: var(--text-color);
        line-height: 1.6;
      }

      /* Header Styles */
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 5%;
        background: white;
        box-shadow: var(--shadow);
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .logo-icon {
        font-size: 1.75rem;
      }

      .logo-text {
        font-size: 1.5rem;
        font-weight: 700;
        background: linear-gradient(
          90deg,
          var(--primary-color),
          var(--secondary-color)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .nav {
        display: flex;
        gap: 1.5rem;
        align-items: center;
      }

      .nav-link {
        padding: 0.5rem 1.25rem;
        text-decoration: none;
        color: var(--text-color);
        border-radius: 50px;
        transition: var(--transition);
        font-weight: 500;

        &:hover {
          color: var(--primary-color);
          transform: translateY(-2px);
        }

        &.primary {
          background: linear-gradient(
            90deg,
            var(--primary-color),
            var(--secondary-color)
          );
          color: white;
          box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(67, 97, 238, 0.4);
          }
        }
      }

      /* Hero Section */
      .hero {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5rem 5%;
        max-width: 1400px;
        margin: 0 auto;
        gap: 3rem;
      }

      .hero-content {
        flex: 1;
        max-width: 600px;
      }

      .tagline {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--primary-color);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 1rem;
      }

      h1 {
        font-size: 3.5rem;
        font-weight: 800;
        line-height: 1.2;
        margin-bottom: 1.5rem;
        background: linear-gradient(
          90deg,
          var(--dark-color),
          var(--secondary-color)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .highlight {
        background: linear-gradient(
          90deg,
          var(--primary-color),
          var(--accent-color)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(
            90deg,
            var(--primary-color),
            var(--accent-color)
          );
          border-radius: 2px;
        }
      }

      .hero-description {
        font-size: 1.25rem;
        color: var(--text-color);
        margin-bottom: 2.5rem;
        max-width: 90%;
      }

      .cta-buttons {
        display: flex;
        gap: 1rem;
        margin-bottom: 3rem;
      }

      .btn {
        padding: 1rem 2rem;
        border: none;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
        display: flex;
        align-items: center;
        gap: 0.5rem;

        &.primary {
          background: linear-gradient(
            90deg,
            var(--primary-color),
            var(--secondary-color)
          );
          color: white;
          box-shadow: 0 4px 16px rgba(67, 97, 238, 0.3);

          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 24px rgba(67, 97, 238, 0.4);
          }
        }

        &.secondary {
          background: white;
          border: 2px solid var(--primary-color);
          color: var(--primary-color);

          &:hover {
            background: rgba(67, 97, 238, 0.05);
            transform: translateY(-3px);
          }
        }

        .icon {
          font-size: 1.25rem;
        }
      }

      .trust-badges {
        display: flex;
        gap: 1.5rem;
      }

      .badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-color);
        background: white;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        box-shadow: var(--shadow);

        .icon {
          color: var(--primary-color);
          font-weight: bold;
        }
      }

      .hero-image {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .hero-img {
        max-width: 100%;
        height: auto;
        border-radius: 16px;
        box-shadow: var(--shadow);
        animation: float 8s ease-in-out infinite;
      }

      /* Features Section */
      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        padding: 5rem 5%;
        max-width: 1200px;
        margin: 0 auto;
        background: white;
        border-radius: 16px;
        box-shadow: var(--shadow);
        position: relative;
        top: -50px;
        margin-bottom: -50px;
      }

      .feature-card {
        text-align: center;
        padding: 2rem;
        transition: var(--transition);

        &:hover {
          transform: translateY(-10px);
        }
      }

      .feature-icon {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
      }

      .feature-card h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--dark-color);
      }

      .feature-card p {
        color: var(--text-light);
      }

      /* Testimonial Section */
      .testimonial {
        padding: 6rem 5%;
        background: linear-gradient(
          135deg,
          var(--primary-color),
          var(--secondary-color)
        );
        color: white;
      }

      .testimonial-content {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
      }

      .quote-icon {
        font-size: 3rem;
        opacity: 0.3;
        margin-bottom: 1rem;
      }

      .quote {
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.6;
        margin-bottom: 2rem;
      }

      .author {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }

      .author-avatar {
        font-size: 2rem;
      }

      .author-name {
        font-weight: 600;
      }

      .author-title {
        opacity: 0.8;
        font-size: 0.875rem;
      }

      /* Footer Styles */
      .footer {
        background: var(--dark-color);
        color: white;
        padding: 4rem 5% 2rem;
      }

      .footer-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 3rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .footer-section h3 {
        font-size: 1.25rem;
        margin-bottom: 1.5rem;
        color: white;
      }

      .footer-section p {
        opacity: 0.8;
        margin-bottom: 1.5rem;
      }

      .footer-section ul {
        list-style: none;
        padding: 0;
      }

      .footer-section li {
        margin-bottom: 0.75rem;
      }

      .footer-section a {
        color: white;
        opacity: 0.8;
        text-decoration: none;
        transition: var(--transition);

        &:hover {
          opacity: 1;
          color: var(--accent-color);
        }
      }

      .contact-info li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 3rem auto 0;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .footer-bottom p {
        opacity: 0.6;
        font-size: 0.875rem;
      }

      .social-links {
        display: flex;
        gap: 1rem;
      }

      .social-icon {
        color: white;
        opacity: 0.6;
        font-size: 1.25rem;
        transition: var(--transition);

        &:hover {
          opacity: 1;
          transform: translateY(-2px);
        }
      }

      /* Animations */
      @keyframes float {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      /* Responsive Styles */
      @media (max-width: 1024px) {
        h1 {
          font-size: 2.75rem;
        }
      }

      @media (max-width: 768px) {
        .hero {
          flex-direction: column;
          text-align: center;
          padding: 3rem 5%;
        }

        .hero-description {
          max-width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          justify-content: center;
        }

        .trust-badges {
          justify-content: center;
        }

        .features {
          grid-template-columns: 1fr;
          top: -30px;
          margin-bottom: -30px;
        }

        .footer-content {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .author {
          justify-content: center;
        }

        .footer-bottom {
          flex-direction: column;
          gap: 1rem;
        }
      }

      @media (max-width: 480px) {
        .nav {
          gap: 0.75rem;
        }

        .nav-link {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        h1 {
          font-size: 2rem;
        }

        .hero-description {
          font-size: 1rem;
        }

        .cta-buttons {
          flex-direction: column;
        }

        .btn {
          width: 100%;
          justify-content: center;
        }

        .trust-badges {
          flex-direction: column;
          gap: 0.75rem;
        }
      }
    `,
  ],
})
export class LandingPageComponent {}
