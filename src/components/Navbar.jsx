import React, { useState, useEffect, useCallback, useRef } from 'react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#qualifications', label: 'Qualifications' },
  { href: '#experience', label: 'Experience' },
  { href: '#services', label: 'Services' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const navLinksRef = useRef(null);

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  // Sliding pill indicator
  useEffect(() => {
    const container = navLinksRef.current;
    if (!container) return;

    const updateIndicator = () => {
      const activeEl = container.querySelector('.nav-link.active');
      if (!activeEl) {
        setIndicator((prev) => ({ ...prev, visible: false }));
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      setIndicator({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
        visible: true,
      });
    };

    updateIndicator();
    const t = setTimeout(updateIndicator, 100); // after fonts load
    window.addEventListener('resize', updateIndicator);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeSection]);

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Escape key closes menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const handleLinkClick = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <style jsx global>{`
        /* =========================================
           DESIGN TOKENS
           ========================================= */
        :root {
          --nav-ease: cubic-bezier(0.4, 0, 0.2, 1);
          --nav-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* =========================================
           WRAPPER
           ========================================= */
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 999;
          padding: 18px 24px;
          display: flex;
          justify-content: center;
          transition: padding 0.35s var(--nav-ease);
          pointer-events: none;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .navbar-wrapper.scrolled { padding: 10px 24px; }

        /* =========================================
           NAV PILL
           ========================================= */
        .navbar {
          pointer-events: auto;
          width: 100%;
          max-width: 1180px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px 10px 20px;
          border-radius: 20px;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(148, 163, 184, 0.14);
          box-shadow:
            0 8px 32px -8px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.02) inset;
          transition:
            background 0.4s var(--nav-ease),
            box-shadow 0.4s var(--nav-ease),
            border-color 0.4s var(--nav-ease);
        }

        .navbar.scrolled {
          background: rgba(15, 23, 42, 0.82);
          box-shadow:
            0 16px 44px -10px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(255, 255, 255, 0.03) inset;
          border-color: rgba(148, 163, 184, 0.22);
        }

        /* =========================================
           LOGO
           ========================================= */
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #f1f5f9;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.35s var(--nav-spring);
        }

        .logo:hover { transform: translateY(-1px); }

        .logo-mark {
          width: 36px;
          height: 36px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #ffffff;
          font-size: 1rem;
          font-weight: 800;
          box-shadow:
            0 8px 22px -6px rgba(139, 92, 246, 0.65),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s var(--nav-spring);
        }

        .logo:hover .logo-mark {
          transform: rotate(-8deg) scale(1.05);
        }

        .logo-mark::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          transition: left 0.6s var(--nav-ease);
        }

        .logo:hover .logo-mark::after { left: 100%; }

        .logo-text {
          background: linear-gradient(135deg, #f1f5f9 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-text span {
          color: #818cf8;
          -webkit-text-fill-color: #818cf8;
        }

        /* =========================================
           DESKTOP NAV + SLIDING INDICATOR
           ========================================= */
        .nav-links {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px;
          border-radius: 14px;
        }

        /* The sliding pill behind the active link */
        .nav-indicator {
          position: absolute;
          top: 4px;
          bottom: 4px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.22), rgba(139, 92, 246, 0.18));
          border: 1px solid rgba(139, 92, 246, 0.3);
          box-shadow:
            0 4px 16px -4px rgba(139, 92, 246, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.04) inset;
          transition:
            left 0.45s var(--nav-spring),
            width 0.45s var(--nav-spring),
            opacity 0.3s var(--nav-ease);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
        }

        .nav-indicator.visible { opacity: 1; }

        .nav-link {
          position: relative;
          z-index: 1;
          padding: 9px 16px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #cbd5e1;
          text-decoration: none;
          border-radius: 10px;
          transition: color 0.25s var(--nav-ease);
          white-space: nowrap;
        }

        .nav-link:hover { color: #f1f5f9; }
        .nav-link.active { color: #e0e7ff; }

        .nav-link:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 2px;
        }

        /* =========================================
           CTA BUTTON
           ========================================= */
        .nav-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          margin-left: 10px;
          font-size: 0.86rem;
          font-weight: 700;
          color: #ffffff;
          text-decoration: none;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 13px;
          box-shadow:
            0 8px 22px -8px rgba(139, 92, 246, 0.7),
            0 0 0 1px rgba(255, 255, 255, 0.08) inset;
          transition:
            transform 0.3s var(--nav-spring),
            box-shadow 0.3s var(--nav-ease);
          white-space: nowrap;
          overflow: hidden;
          letter-spacing: 0.2px;
        }

        .nav-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
          transition: left 0.7s var(--nav-ease);
        }

        .nav-cta:hover::before { left: 100%; }

        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow:
            0 14px 30px -8px rgba(139, 92, 246, 0.85),
            0 0 0 1px rgba(255, 255, 255, 0.12) inset;
        }

        .nav-cta:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 3px;
        }

        .nav-cta .arrow {
          transition: transform 0.3s var(--nav-spring);
        }

        .nav-cta:hover .arrow { transform: translateX(3px); }

        /* =========================================
           HAMBURGER (custom animated)
           ========================================= */
        .hamburger {
          display: none;
          width: 44px;
          height: 44px;
          border-radius: 13px;
          align-items: center;
          justify-content: center;
          background: rgba(148, 163, 184, 0.1);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #f1f5f9;
          cursor: pointer;
          transition: all 0.3s var(--nav-ease);
          padding: 0;
        }

        .hamburger:hover {
          background: rgba(148, 163, 184, 0.18);
          border-color: rgba(148, 163, 184, 0.35);
        }

        .hamburger:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 3px;
        }

        .hamburger-lines {
          position: relative;
          width: 18px;
          height: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger-lines span {
          display: block;
          height: 2px;
          width: 100%;
          border-radius: 2px;
          background: currentColor;
          transition: all 0.35s var(--nav-spring);
          transform-origin: center;
        }

        .hamburger-lines span:nth-child(1) { width: 100%; }
        .hamburger-lines span:nth-child(2) { width: 80%; }
        .hamburger-lines span:nth-child(3) { width: 65%; }

        .hamburger:hover .hamburger-lines span:nth-child(2),
        .hamburger:hover .hamburger-lines span:nth-child(3) {
          width: 100%;
        }

        /* =========================================
           MOBILE OVERLAY
           ========================================= */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 998;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s var(--nav-ease);
        }

        .mobile-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        /* =========================================
           MOBILE DRAWER
           ========================================= */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          height: 100dvh;
          width: min(360px, 88vw);
          z-index: 999;
          background: linear-gradient(160deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.99));
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border-left: 1px solid rgba(148, 163, 184, 0.15);
          padding: 24px 24px 32px;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.42s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -24px 0 70px -20px rgba(0, 0, 0, 0.7);
        }

        .mobile-menu.open { transform: translateX(0); }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.15);
        }

        .mobile-close {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(148, 163, 184, 0.1);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #f1f5f9;
          font-size: 1.05rem;
          cursor: pointer;
          transition: all 0.3s var(--nav-ease);
        }

        .mobile-close:hover {
          background: rgba(239, 68, 68, 0.18);
          border-color: rgba(239, 68, 68, 0.4);
          color: #fca5a5;
          transform: rotate(90deg);
        }

        .mobile-close:focus-visible {
          outline: 2px solid #f87171;
          outline-offset: 2px;
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          overflow-y: auto;
          padding: 4px 0;
        }

        .mobile-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 13px;
          font-size: 0.98rem;
          font-weight: 600;
          color: #cbd5e1;
          text-decoration: none;
          transition:
            background 0.3s var(--nav-ease),
            color 0.3s var(--nav-ease),
            transform 0.3s var(--nav-spring);
          border-left: 3px solid transparent;
          opacity: 0;
          transform: translateX(20px);
        }

        .mobile-menu.open .mobile-link {
          animation: mobileLinkIn 0.5s var(--nav-ease) forwards;
          animation-delay: calc(0.08s + var(--i, 0) * 0.05s);
        }

        @keyframes mobileLinkIn {
          to { opacity: 1; transform: translateX(0); }
        }

        .mobile-link:hover {
          background: rgba(148, 163, 184, 0.08);
          color: #f1f5f9;
          border-left-color: #6366f1;
          transform: translateX(4px);
        }

        .mobile-link.active {
          background: rgba(99, 102, 241, 0.14);
          color: #c7d2fe;
          border-left-color: #818cf8;
        }

        .mobile-link:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 2px;
        }

        .mobile-link-index {
          font-size: 0.7rem;
          font-weight: 700;
          color: #64748b;
          min-width: 22px;
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
          letter-spacing: 0.5px;
        }

        .mobile-link.active .mobile-link-index { color: #818cf8; }

        .mobile-cta {
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px;
          font-size: 0.92rem;
          font-weight: 700;
          color: #ffffff;
          text-decoration: none;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 13px;
          box-shadow: 0 10px 26px -8px rgba(139, 92, 246, 0.7);
          transition: transform 0.3s var(--nav-spring), box-shadow 0.3s var(--nav-ease);
          letter-spacing: 0.2px;
        }

        .mobile-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px -8px rgba(139, 92, 246, 0.9);
        }

        /* =========================================
           RESPONSIVE
           ========================================= */
        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
        }

        @media (max-width: 480px) {
          .navbar-wrapper { padding: 12px 16px; }
          .navbar-wrapper.scrolled { padding: 8px 16px; }
          .navbar {
            padding: 8px 10px 8px 16px;
            border-radius: 16px;
          }
          .logo { font-size: 1.05rem; gap: 8px; }
          .logo-mark { width: 32px; height: 32px; font-size: 0.9rem; }
        }

        /* =========================================
           LIGHT MODE
           ========================================= */
        body.light-mode .navbar {
          background: rgba(255, 255, 255, 0.72);
          border-color: rgba(148, 163, 184, 0.28);
          box-shadow:
            0 8px 32px -8px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.6) inset;
        }

        body.light-mode .navbar.scrolled {
          background: rgba(255, 255, 255, 0.92);
          box-shadow:
            0 16px 44px -10px rgba(0, 0, 0, 0.16),
            0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          border-color: rgba(148, 163, 184, 0.4);
        }

        body.light-mode .logo { color: #1e293b; }

        body.light-mode .logo-text {
          background: linear-gradient(135deg, #1e293b 0%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        body.light-mode .logo-text span {
          color: #4f46e5;
          -webkit-text-fill-color: #4f46e5;
        }

        body.light-mode .nav-indicator {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(139, 92, 246, 0.14));
          border-color: rgba(99, 102, 241, 0.35);
          box-shadow:
            0 4px 16px -4px rgba(99, 102, 241, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
        }

        body.light-mode .nav-link { color: #475569; }
        body.light-mode .nav-link:hover { color: #1e293b; }
        body.light-mode .nav-link.active { color: #4338ca; }

        body.light-mode .hamburger {
          background: rgba(148, 163, 184, 0.15);
          border-color: rgba(148, 163, 184, 0.3);
          color: #1e293b;
        }

        body.light-mode .mobile-menu {
          background: linear-gradient(160deg, rgba(255, 255, 255, 0.99), rgba(248, 250, 252, 0.99));
          border-left-color: rgba(148, 163, 184, 0.3);
          box-shadow: -24px 0 70px -20px rgba(0, 0, 0, 0.18);
        }

        body.light-mode .mobile-menu-header {
          border-bottom-color: rgba(148, 163, 184, 0.25);
        }

        body.light-mode .mobile-close {
          background: rgba(148, 163, 184, 0.15);
          border-color: rgba(148, 163, 184, 0.3);
          color: #1e293b;
        }

        body.light-mode .mobile-link { color: #475569; }
        body.light-mode .mobile-link:hover {
          background: rgba(148, 163, 184, 0.12);
          color: #1e293b;
        }

        body.light-mode .mobile-link.active {
          background: rgba(99, 102, 241, 0.12);
          color: #4338ca;
        }

        body.light-mode .mobile-link-index { color: #94a3b8; }
        body.light-mode .mobile-link.active .mobile-link-index { color: #6366f1; }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
          {/* Logo */}
          <a href="#home" className="logo" aria-label="Portfolio home"> 
            <span className="logo-mark">S</span>
            <span className="logo-text">SUBRATA<span></span></span>
          </a>

          {/* Desktop Nav with sliding pill */}
          <div className="nav-links" ref={navLinksRef}>
            <span
              className={`nav-indicator ${indicator.visible ? 'visible' : ''}`}
              style={{ left: indicator.left, width: indicator.width }}
              aria-hidden="true"
            />
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <a href="#contact" className="nav-cta">
            Let's Talk <span className="arrow">→</span>
          </a>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <aside
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-header">
          <a href="#home" className="logo" onClick={handleLinkClick}>
            <span className="logo-mark">S</span>
            <span className="logo-text">Subrata<span>.</span></span>
          </a>
          <button
            className="mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="mobile-links">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`mobile-link ${isActive ? 'active' : ''}`}
                onClick={handleLinkClick}
                aria-current={isActive ? 'page' : undefined}
                style={{ '--i': i }}
              >
                <span className="mobile-link-index">0{i + 1}</span>
                {link.label}
              </a>
            );
          })}
        </nav>

        <a href="#contact" className="mobile-cta" onClick={handleLinkClick}>
          Let's Talk <span className="arrow">→</span>
        </a>
      </aside>
    </>
  );
};