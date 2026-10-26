import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import pdf from '../pdf/resume.pdf';

// --- Modern Theme Toggle Component ---
const ThemeToggle = ({ isDark, onToggle }) => (
  <button
    className="theme-toggle"
    onClick={onToggle}
    aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
  >
    <div className={`toggle-track ${isDark ? 'dark' : 'light'}`}>
      <div className="toggle-thumb">
        <span className="icon" aria-hidden="true">{isDark ? '🌙' : '☀️'}</span>
      </div>
    </div>
    <span className="toggle-label">{isDark ? 'Dark' : 'Light'}</span>
  </button>
);

// --- Main Home Component ---
export const Home = () => {
  const typedRef = useRef(null);
  const [darkMode, setDarkMode] = useState(true);

  // Typed.js Initialization
  useEffect(() => {
    const options = {
      strings: [
        'Welcome To My Profile...',
        "I'm <span class='gradient-text'>Subrata Mandal</span>.",
        'A Passionate <span class="gradient-text"> Developer</span>.',
        'Crafting Full-Stack Web Experiences.',
        "Let's Build Something <span class='gradient-text'>Awesome</span> Together!",
      ],
      typeSpeed: 55,
      backSpeed: 28,
      backDelay: 1800,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: '▍',
      contentType: 'html',
    };

    const typed = new Typed(typedRef.current, options);
    return () => typed.destroy();
  }, []);

  // Theme effect
  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  return (
    <>
      <style jsx global>{`
        /* =========================================
           DESIGN TOKENS
           ========================================= */
        :root {
          --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          --ease: cubic-bezier(0.4, 0, 0.2, 1);
          --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* =========================================
           SECTION SHELL
           ========================================= */
        .home-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 130px 0 90px;
          overflow: hidden;
          font-family: var(--font-sans);
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #1e1b4b 0%, #0f172a 45%, #020617 100%);
          transition: background 0.5s var(--ease);
        }

        .home-section.is-light {
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #eef2ff 0%, #f8fafc 45%, #ffffff 100%);
        }

        /* =========================================
           BACKGROUND LAYERS
           ========================================= */
        .bg-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        /* Subtle grid */
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%);
        }

        .home-section.is-light .bg-grid {
          background-image:
            linear-gradient(rgba(100, 116, 139, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 116, 139, 0.12) 1px, transparent 1px);
        }

        /* Aurora glow orbs */
        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.45;
          animation: aurora 18s ease-in-out infinite alternate;
        }

        .shape-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, #6366f1, transparent 70%);
          top: -140px; left: -120px;
        }
        .shape-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #ec4899, transparent 70%);
          bottom: -60px; right: -100px;
          animation-delay: -6s;
        }
        .shape-3 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, #10b981, transparent 70%);
          top: 45%; left: 28%;
          opacity: 0.25;
          animation-delay: -12s;
        }

        .home-section.is-light .shape { opacity: 0.22; }

        @keyframes aurora {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(40px, -30px) scale(1.1); }
          100% { transform: translate(-30px, 30px) scale(0.95); }
        }

        /* =========================================
           LAYOUT
           ========================================= */
        .home-container {
          max-width: 1220px;
          margin: 0 auto;
          padding: 0 28px;
          width: 100%;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 72px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 992px) {
          .home-container {
            grid-template-columns: 1fr;
            gap: 56px;
            padding-top: 30px;
            text-align: center;
          }
        }

        /* =========================================
           LEFT CONTENT
           ========================================= */
        .home-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          animation: fadeSlideUp 0.9s var(--ease) both;
        }

        @media (max-width: 992px) {
          .home-content { align-items: center; }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Availability badge */
        .greeting-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.28);
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #34d399;
          margin-bottom: 28px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          letter-spacing: 0.2px;
        }

        .badge-dot {
          position: relative;
          width: 8px; height: 8px;
          background: #34d399;
          border-radius: 50%;
        }

        .badge-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #34d399;
          opacity: 0.5;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          0%   { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(2); opacity: 0; }
        }

        /* Typed heading */
        .typed-heading {
          font-size: clamp(2.4rem, 5.2vw, 3.9rem);
          font-weight: 800;
          line-height: 1.12;
          margin: 0 0 26px 0;
          min-height: 160px;
          color: #f1f5f9;
          letter-spacing: -0.02em;
          font-family: var(--font-sans);
        }

        .typed-heading :global(.gradient-text) {
          background: linear-gradient(135deg, #818cf8 0%, #22d3ee 50%, #34d399 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        /* Typed cursor */
        .typed-heading :global(.typed-cursor) {
          color: #818cf8;
          font-weight: 300;
          opacity: 1;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }

        /* Description */
        .home-description {
          font-size: 1.05rem;
          line-height: 1.75;
          color: #94a3b8;
          margin: 0 0 34px 0;
          max-width: 580px;
        }

        .home-description strong {
          color: #f1f5f9;
          font-weight: 600;
        }

        .highlight {
          color: #818cf8;
          font-weight: 600;
        }

        /* CTA Buttons */
        .cta-buttons {
          display: flex;
          gap: 14px;
          margin-bottom: 44px;
          flex-wrap: wrap;
        }

        .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 26px;
          border-radius: 14px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.35s var(--ease-spring);
          cursor: pointer;
          border: 1px solid transparent;
          font-family: var(--font-sans);
          overflow: hidden;
        }

        .btn-icon {
          font-size: 1.05rem;
          transition: transform 0.3s var(--ease-spring);
        }

        .btn:hover .btn-icon {
          transform: scale(1.18) rotate(-6deg);
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
          color: #ffffff;
          box-shadow:
            0 10px 24px -8px rgba(99, 102, 241, 0.55),
            0 0 0 1px rgba(99, 102, 241, 0.2) inset;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), transparent);
          transition: left 0.7s var(--ease);
        }

        .btn-primary:hover::before { left: 100%; }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow:
            0 18px 32px -10px rgba(99, 102, 241, 0.7),
            0 0 0 1px rgba(99, 102, 241, 0.3) inset;
        }

        .btn-secondary {
          background: rgba(148, 163, 184, 0.08);
          color: #f1f5f9;
          border: 1px solid rgba(148, 163, 184, 0.22);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(148, 163, 184, 0.16);
          border-color: rgba(148, 163, 184, 0.4);
          transform: translateY(-3px);
        }

        /* Tech stack */
        .tech-stack { margin-top: 4px; }

        .tech-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 1.6px;
          color: #64748b;
          margin-bottom: 14px;
          display: block;
          font-weight: 700;
        }

        .tech-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tech-tag {
          padding: 7px 15px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.22);
          border-radius: 999px;
          font-size: 0.76rem;
          font-weight: 600;
          color: #6ee7b7;
          transition: all 0.3s var(--ease);
          cursor: default;
        }

        .tech-tag:hover {
          background: rgba(16, 185, 129, 0.18);
          border-color: rgba(16, 185, 129, 0.5);
          transform: translateY(-2px);
          color: #a7f3d0;
        }

        /* =========================================
           RIGHT: IMAGE & FLOATING BADGES
           ========================================= */
        .home-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          animation: fadeSlideUp 0.9s 0.2s var(--ease) both;
        }

        .image-frame {
          position: relative;
          width: 100%;
          max-width: 400px;
          aspect-ratio: 1 / 1;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          background: linear-gradient(135deg, #818cf8, #22d3ee, #34d399);
          padding: 5px;
          animation: morph 10s ease-in-out infinite;
          box-shadow:
            0 0 0 1px rgba(129, 140, 248, 0.15),
            0 0 60px rgba(129, 140, 248, 0.28),
            0 0 120px rgba(34, 211, 238, 0.15);
        }

        @keyframes morph {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          50%      { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: inherit;
          box-shadow: 0 24px 60px -16px rgba(0, 0, 0, 0.65);
          position: relative;
          z-index: 1;
          border: 3px solid #0f172a;
        }

        .home-section.is-light .profile-image {
          border-color: #ffffff;
        }

        /* Floating badges */
        .floating-badge {
          position: absolute;
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: rgba(30, 41, 59, 0.75);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(148, 163, 184, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          box-shadow:
            0 12px 28px -6px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          z-index: 3;
          animation: float 5s ease-in-out infinite;
        }

        .badge-1 { top: 8%;   left: -24px;  animation-delay: 0s; }
        .badge-2 { bottom: 12%; right: -24px; animation-delay: 1.6s; }
        .badge-3 { top: 62%;  left: -34px;  animation-delay: 3.2s; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-16px) rotate(4deg); }
        }

        /* =========================================
           THEME TOGGLE
           ========================================= */
        .theme-toggle-wrapper {
          position: absolute;
          top: 110px;
          right: 40px;
          z-index: 10;
        }

        .theme-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(30, 41, 59, 0.55);
          border: 1px solid rgba(148, 163, 184, 0.18);
          padding: 8px 14px;
          border-radius: 999px;
          cursor: pointer;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: all 0.3s var(--ease);
          font-family: var(--font-sans);
          color: #f1f5f9;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .theme-toggle:hover {
          background: rgba(30, 41, 59, 0.85);
          border-color: rgba(148, 163, 184, 0.35);
          transform: translateY(-1px);
        }

        .toggle-track {
          width: 38px;
          height: 22px;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.3);
          position: relative;
          transition: background 0.35s var(--ease);
        }

        .toggle-track.light { background: linear-gradient(135deg, #818cf8, #22d3ee); }

        .toggle-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          position: absolute;
          top: 2px;
          left: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s var(--ease-spring);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        }

        .toggle-track.light .toggle-thumb { transform: translateX(16px); }
        .toggle-thumb .icon { font-size: 10px; line-height: 1; }

        /* =========================================
           LIGHT MODE OVERRIDES
           ========================================= */
        .home-section.is-light .typed-heading { color: #0f172a; }
        .home-section.is-light .typed-heading :global(.typed-cursor) { color: #4f46e5; }

        .home-section.is-light .home-description { color: #475569; }
        .home-section.is-light .home-description strong { color: #0f172a; }
        .home-section.is-light .highlight { color: #4f46e5; }

        .home-section.is-light .greeting-badge {
          background: rgba(16, 185, 129, 0.12);
          color: #059669;
          border-color: rgba(16, 185, 129, 0.35);
        }

        .home-section.is-light .btn-secondary {
          background: rgba(148, 163, 184, 0.15);
          color: #0f172a;
          border-color: rgba(100, 116, 139, 0.25);
        }
        .home-section.is-light .btn-secondary:hover {
          background: rgba(148, 163, 184, 0.28);
        }

        .home-section.is-light .tech-tag {
          background: rgba(16, 185, 129, 0.12);
          color: #059669;
          border-color: rgba(16, 185, 129, 0.35);
        }
        .home-section.is-light .tech-tag:hover {
          background: rgba(16, 185, 129, 0.22);
          color: #047857;
        }

        .home-section.is-light .theme-toggle {
          background: rgba(255, 255, 255, 0.85);
          color: #1e293b;
          border-color: rgba(100, 116, 139, 0.25);
        }
        .home-section.is-light .theme-toggle:hover { background: #ffffff; }

        .home-section.is-light .floating-badge {
          background: rgba(255, 255, 255, 0.92);
          border-color: rgba(100, 116, 139, 0.2);
          color: #1e293b;
          box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.15);
        }

        /* =========================================
           RESPONSIVE
           ========================================= */
        @media (max-width: 992px) {
          .theme-toggle-wrapper { top: 88px; right: 24px; }
        }

        @media (max-width: 640px) {
          .home-section { padding: 110px 0 70px; }
          .theme-toggle-wrapper { top: 78px; right: 16px; }
          .typed-heading { min-height: 140px; }
          .cta-buttons { justify-content: center; width: 100%; }
          .tech-tags { justify-content: center; }
          .image-frame { max-width: 320px; }
          .floating-badge { width: 44px; height: 44px; font-size: 1.1rem; }
          .badge-1 { left: -12px; }
          .badge-2 { right: -12px; }
          .badge-3 { left: -16px; }
        }

        @media (max-width: 480px) {
          .btn { padding: 12px 20px; font-size: 0.9rem; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section className={`home-section ${!darkMode ? 'is-light' : ''}`} id="home">
        {/* Background Layers */}
        <div className="bg-layer" aria-hidden="true">
          <div className="bg-grid"></div>
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        {/* Theme Toggle */}
        <div className="theme-toggle-wrapper">
          <ThemeToggle isDark={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        </div>

        <div className="home-container">
          {/* Left Content */}
          <div className="home-content">
            <div className="greeting-badge">
              <span className="badge-dot"></span>
              <span>Available for work</span>
            </div>

            <h1 className="typed-heading">
              <span ref={typedRef}></span>
            </h1>

<p className="home-description">
  I'm <strong>Subrata Mandal</strong>, a passionate{' '}
  <span className="highlight">Software/Web Developer</span>, dedicated Teacher,
  and lifelong learner who enjoys transforming ideas into innovative digital
  solutions. I work with diverse technologies, programming languages, and
  modern development tools to build efficient, responsive, and user-friendly
  applications. As someone who believes in continuous learning and daily
  improvement, I constantly explore emerging technologies, sharpen my skills,
  and stay updated with the latest industry trends. Alongside development, I
  love teaching, sharing knowledge, and helping others grow through technology.
</p>

            <div className="cta-buttons">
              <a href={pdf} download="Resume.pdf" className="btn btn-primary">
                <span className="btn-icon">📄</span>
                Download Resume
              </a>
              <a href="#contact" className="btn btn-secondary">
                <span className="btn-icon">💬</span>
                Let's Talk
              </a>
            </div>

            <div className="tech-stack">
              <span className="tech-label">Tech Stack:</span>
              <div className="tech-tags">
                {['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript'].map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="home-image-wrapper">
            <div className="image-frame">
              <img
                src="/Photo.jpg"
                alt="Subrata Mandal - MERN Stack Developer"
                className="profile-image"
              />
              <div className="floating-badge badge-1">⚛️</div>
              <div className="floating-badge badge-2">🚀</div>
              <div className="floating-badge badge-3">💻</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};