import React, { useRef, useState } from 'react';
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaPaperPlane,
  FaCopy,
  FaCheck,
} from 'react-icons/fa';
import { MdAttachEmail, MdArrowOutward } from 'react-icons/md';

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/Prince.Of.Mahakal/',
    icon: <FaFacebook />,
    color: '#1877f2',
    handle: '@Prince.Of.Mahakal',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/s_u_b__r__a__t__a/?__pwa=1#',
    icon: <FaInstagramSquare />,
    color: '#E1306C',
    handle: '@s_u_b__r__a__t__a',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/subrata-mandal-5155812a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    icon: <FaLinkedin />,
    color: '#0A66C2',
    handle: 'subrata-mandal',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Developer-Subrata',
    icon: <FaGithub />,
    color: '#8b5cf6',
    handle: 'Developer-Subrata',
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: <FaTwitter />,
    color: '#1DA1F2',
    handle: 'Coming soon',
    disabled: true,
  },
  {
    label: 'Email',
    href: 'mailto:subrata.ind2@gmail.com',
    icon: <MdAttachEmail />,
    color: '#EA4335',
    handle: 'subrata.ind2@gmail.com',
  },
];

// --- Social Card with cursor glow ---
const SocialCard = ({ social, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || social.disabled) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  return (
    <a
      ref={cardRef}
      href={social.disabled ? undefined : social.href}
      target={social.disabled ? undefined : '_blank'}
      rel={social.disabled ? undefined : 'noopener noreferrer'}
      className={`social-card ${social.disabled ? 'disabled' : ''}`}
      style={{ '--social-color': social.color, '--delay': `${index * 60}ms` }}
      onMouseMove={handleMouseMove}
      aria-label={`Connect via ${social.label}`}
      aria-disabled={social.disabled}
      onClick={(e) => social.disabled && e.preventDefault()}
    >
      <div className="social-icon-wrap">
        <span className="social-icon">{social.icon}</span>
      </div>
      <div className="social-info">
        <div className="social-label">{social.label}</div>
        <div className="social-handle">{social.handle}</div>
      </div>
      {!social.disabled && (
        <span className="social-arrow" aria-hidden="true">
          <MdArrowOutward />
        </span>
      )}
      <span className="cursor-glow" aria-hidden="true" />
    </a>
  );
};

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('subrata.ind2@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* no-op */
    }
  };

  return (
    <>
      <style jsx global>{`
        /* =========================================
           DESIGN TOKENS
           ========================================= */
        :root {
          --contact-accent-1: #ec4899;
          --contact-accent-2: #8b5cf6;
          --contact-accent-3: #22d3ee;
          --contact-ease: cubic-bezier(0.4, 0, 0.2, 1);
          --contact-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* =========================================
           SECTION SHELL
           ========================================= */
        .contact-section {
          padding: 110px 0 130px;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse 120% 80% at 50% 100%, #1a1033 0%, #0f172a 45%, #020617 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        body.light-mode .contact-section {
          background: radial-gradient(ellipse 120% 80% at 50% 100%, #fdf2f8 0%, #f8fafc 45%, #ffffff 100%);
        }

        /* =========================================
           BACKGROUND LAYERS
           ========================================= */
        .contact-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(236, 72, 153, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236, 72, 153, 0.06) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 78%);
          pointer-events: none;
        }

        body.light-mode .contact-section::before {
          background-image:
            linear-gradient(rgba(236, 72, 153, 0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236, 72, 153, 0.09) 1px, transparent 1px);
        }

        /* Aurora orbs */
        .contact-section::after {
          content: '';
          position: absolute;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.22), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.18), transparent 60%);
          bottom: -320px;
          left: 50%;
          transform: translateX(-50%);
          filter: blur(90px);
          pointer-events: none;
          animation: contactAurora 14s ease-in-out infinite alternate;
        }

        body.light-mode .contact-section::after { opacity: 0.4; }

        @keyframes contactAurora {
          0%   { transform: translateX(-50%) translateY(0) scale(1); }
          50%  { transform: translateX(-48%) translateY(-30px) scale(1.08); }
          100% { transform: translateX(-52%) translateY(10px) scale(0.96); }
        }

        /* =========================================
           CONTAINER
           ========================================= */
        .contact-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 28px;
          position: relative;
          z-index: 2;
          width: 100%;
        }

        /* =========================================
           HEADER
           ========================================= */
        .section-header {
          text-align: center;
          margin-bottom: 68px;
          animation: fadeUp 0.8s var(--contact-ease) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: rgba(236, 72, 153, 0.08);
          border: 1px solid rgba(236, 72, 153, 0.28);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #f472b6;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          margin-bottom: 22px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .section-eyebrow .dot {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #f472b6;
          box-shadow: 0 0 12px #f472b6;
        }

        .section-eyebrow .dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #f472b6;
          opacity: 0.5;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          0% { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(2.2); opacity: 0; }
        }

        .section-title {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800;
          line-height: 1.12;
          margin: 0 0 18px 0;
          background: linear-gradient(135deg, #ffffff 0%, #f9a8d4 45%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-size: clamp(1rem, 1.8vw, 1.12rem);
          color: #94a3b8;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.75;
        }

        /* Gradient underline */
        .section-header .accent-line {
          width: 72px;
          height: 4px;
          margin: 24px auto 0;
          border-radius: 999px;
          background: linear-gradient(90deg, #ec4899, #8b5cf6, #22d3ee);
          box-shadow: 0 0 24px rgba(236, 72, 153, 0.6);
        }

        /* =========================================
           EMAIL CARD
           ========================================= */
        .email-card {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 28px 32px;
          max-width: 760px;
          margin: 0 auto 72px;
          border-radius: 24px;
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.9));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(236, 72, 153, 0.22);
          box-shadow:
            0 24px 60px -20px rgba(236, 72, 153, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.03) inset;
          flex-wrap: wrap;
          overflow: hidden;
          transition: transform 0.4s var(--contact-ease),
                      box-shadow 0.4s var(--contact-ease);
          animation: fadeUp 0.8s 0.15s var(--contact-ease) both;
        }

        /* Animated gradient top border */
        .email-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ec4899, #8b5cf6, #22d3ee, #ec4899);
          background-size: 300% 100%;
          animation: shimmerBorder 6s linear infinite;
        }

        @keyframes shimmerBorder {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        .email-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 30px 70px -20px rgba(236, 72, 153, 0.5),
            0 0 0 1px rgba(236, 72, 153, 0.15) inset;
        }

        .email-info {
          display: flex;
          align-items: center;
          gap: 18px;
          flex: 1;
          min-width: 240px;
        }

        .email-icon {
          width: 58px;
          height: 58px;
          min-width: 58px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          color: #ffffff;
          font-size: 1.5rem;
          box-shadow:
            0 12px 28px -8px rgba(236, 72, 153, 0.7),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          animation: iconFloat 4s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }

        .email-text { min-width: 0; }

        .email-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.6px;
          color: #f472b6;
          margin-bottom: 6px;
        }

        .email-address {
          font-size: 1.06rem;
          font-weight: 700;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: -0.01em;
        }

        .email-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* =========================================
           BUTTONS
           ========================================= */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.3s var(--contact-spring);
          font-family: inherit;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }

        .cta-btn:focus-visible {
          outline: 2px solid #f472b6;
          outline-offset: 3px;
        }

        .cta-btn.primary {
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          color: #ffffff;
          box-shadow: 0 8px 22px -8px rgba(236, 72, 153, 0.7);
        }

        .cta-btn.primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
          transform: translateX(-100%);
          transition: transform 0.7s var(--contact-ease);
        }

        .cta-btn.primary:hover::before { transform: translateX(100%); }

        .cta-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -8px rgba(236, 72, 153, 0.85);
        }

        .cta-btn.ghost {
          background: rgba(148, 163, 184, 0.08);
          border-color: rgba(148, 163, 184, 0.2);
          color: #cbd5e1;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .cta-btn.ghost:hover {
          background: rgba(148, 163, 184, 0.16);
          border-color: rgba(148, 163, 184, 0.35);
          color: #f1f5f9;
          transform: translateY(-2px);
        }

        .cta-btn.copied {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.45);
          color: #6ee7b7;
          animation: copiedPop 0.5s var(--contact-spring);
        }

        @keyframes copiedPop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }

        /* =========================================
           SOCIALS GRID
           ========================================= */
        .socials-heading {
          text-align: center;
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.4px;
          color: #64748b;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          animation: fadeUp 0.8s 0.25s var(--contact-ease) both;
        }

        .socials-heading::before,
        .socials-heading::after {
          content: '';
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.4), transparent);
        }

        .socials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }

        .social-card {
          --mx: 50%;
          --my: 50%;
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 22px;
          border-radius: 18px;
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.55), rgba(15, 23, 42, 0.85));
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(148, 163, 184, 0.12);
          text-decoration: none;
          transition:
            transform 0.35s var(--contact-ease),
            border-color 0.35s var(--contact-ease),
            box-shadow 0.35s var(--contact-ease);
          overflow: hidden;
          animation: fadeUp 0.7s var(--delay) var(--contact-ease) both;
        }

        /* Cursor-tracking glow */
        .social-card .cursor-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            180px circle at var(--mx) var(--my),
            color-mix(in srgb, var(--social-color) 22%, transparent),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.3s var(--contact-ease);
          pointer-events: none;
        }

        .social-card:hover .cursor-glow { opacity: 1; }

        .social-card:hover {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--social-color) 45%, transparent);
          box-shadow:
            0 16px 40px -14px rgba(0, 0, 0, 0.5),
            0 0 0 1px color-mix(in srgb, var(--social-color) 25%, transparent) inset;
        }

        .social-card:focus-visible {
          outline: 2px solid var(--social-color);
          outline-offset: 3px;
        }

        .social-card.disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .social-card.disabled:hover {
          transform: none;
          box-shadow: none;
          border-color: rgba(148, 163, 184, 0.12);
        }

        .social-card.disabled .cursor-glow { display: none; }

        /* Icon */
        .social-icon-wrap {
          position: relative;
          z-index: 1;
          width: 46px;
          height: 46px;
          min-width: 46px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--social-color) 14%, transparent);
          border: 1px solid color-mix(in srgb, var(--social-color) 30%, transparent);
          transition: transform 0.4s var(--contact-spring);
        }

        .social-icon {
          font-size: 1.3rem;
          color: var(--social-color);
          transition: transform 0.4s var(--contact-spring);
        }

        .social-card:hover .social-icon-wrap {
          transform: scale(1.06);
          background: color-mix(in srgb, var(--social-color) 22%, transparent);
        }

        .social-card:hover .social-icon {
          transform: rotate(-6deg) scale(1.1);
        }

        /* Info */
        .social-info {
          min-width: 0;
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .social-label {
          font-size: 0.94rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 3px;
          transition: color 0.3s var(--contact-ease);
        }

        .social-handle {
          font-size: 0.78rem;
          color: #94a3b8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.3s var(--contact-ease);
        }

        .social-card:hover .social-label { color: #ffffff; }

        /* Arrow */
        .social-arrow {
          position: relative;
          z-index: 1;
          font-size: 1.1rem;
          color: #64748b;
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.35s var(--contact-ease);
        }

        .social-card:hover .social-arrow {
          opacity: 1;
          transform: translateX(0);
          color: var(--social-color);
        }

        /* =========================================
           FOOTER NOTE
           ========================================= */
        .contact-note {
          margin-top: 56px;
          text-align: center;
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.75;
          animation: fadeUp 0.8s 0.45s var(--contact-ease) both;
        }

        .contact-note strong {
          background: linear-gradient(135deg, #f472b6, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        /* =========================================
           LIGHT MODE
           ========================================= */
        body.light-mode .section-title {
          background: linear-gradient(135deg, #0f172a 0%, #ec4899 55%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        body.light-mode .section-subtitle { color: #64748b; }

        body.light-mode .email-card {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
          border-color: rgba(236, 72, 153, 0.22);
          box-shadow:
            0 24px 60px -20px rgba(236, 72, 153, 0.22),
            0 0 0 1px rgba(0, 0, 0, 0.02) inset;
        }

        body.light-mode .email-address { color: #0f172a; }

        body.light-mode .cta-btn.ghost {
          background: rgba(148, 163, 184, 0.12);
          border-color: rgba(148, 163, 184, 0.28);
          color: #475569;
        }

        body.light-mode .cta-btn.ghost:hover {
          background: rgba(148, 163, 184, 0.22);
          color: #0f172a;
        }

        body.light-mode .socials-heading { color: #64748b; }

        body.light-mode .social-card {
          background: #ffffff;
          border-color: rgba(148, 163, 184, 0.22);
          box-shadow: 0 4px 20px -6px rgba(0, 0, 0, 0.06);
        }

        body.light-mode .social-card:hover {
          box-shadow:
            0 16px 40px -14px rgba(0, 0, 0, 0.15),
            0 0 0 1px color-mix(in srgb, var(--social-color) 25%, transparent) inset;
        }

        body.light-mode .social-label { color: #0f172a; }
        body.light-mode .social-handle { color: #64748b; }
        body.light-mode .social-card:hover .social-label { color: #0f172a; }

        body.light-mode .social-arrow { color: #94a3b8; }

        body.light-mode .contact-note { color: #64748b; }

        /* =========================================
           RESPONSIVE
           ========================================= */
        @media (max-width: 768px) {
          .contact-section { padding: 80px 0 100px; }
          .section-header { margin-bottom: 48px; }
          .email-card { padding: 24px 22px; margin-bottom: 52px; gap: 20px; }
          .email-actions { width: 100%; }
          .cta-btn { flex: 1; justify-content: center; }
          .socials-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .contact-container { padding: 0 18px; }
          .email-address { font-size: 0.92rem; }
          .email-icon {
            width: 48px; height: 48px; min-width: 48px;
            font-size: 1.25rem;
          }
          .social-card { padding: 16px 18px; }
          .social-arrow { display: none; }
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

      <section className="contact-section" id="contact">
        <div className="contact-container">
          {/* Header */}
          <div className="section-header">
            <span className="section-eyebrow">
              <span className="dot"></span>
              Let's Connect
            </span>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Have a project in mind, a question, or just want to say hello?
              I'm always open to new opportunities and collaborations.
            </p>
            <div className="accent-line" />
          </div>

          {/* Primary Email CTA */}
          <div className="email-card">
            <div className="email-info">
              <div className="email-icon">
                <MdAttachEmail />
              </div>
              <div className="email-text">
                <div className="email-label">Primary Email</div>
                <div className="email-address">subrata.ind2@gmail.com</div>
              </div>
            </div>
            <div className="email-actions">
              <a
                href="mailto:subrata.ind2@gmail.com"
                className="cta-btn primary"
              >
                <FaPaperPlane /> Send Email
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className={`cta-btn ghost ${copied ? 'copied' : ''}`}
                aria-live="polite"
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Socials */}
          <p className="socials-heading">Find me on</p>
          <div className="socials-grid">
            {SOCIALS.map((social, index) => (
              <SocialCard key={social.label} social={social} index={index} />
            ))}
          </div>

          {/* Footer note */}
          <p className="contact-note">
            Let's create something <strong>amazing</strong> together — feel free to
            reach out through any platform above.
          </p>
        </div>
      </section>
    </>
  );
};