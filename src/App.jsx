import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaArrowUp } from 'react-icons/fa';

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Qualifications } from './components/Qualifications';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Project } from './components/Project';
import { Contact } from './components/Contact';

// --- Scroll progress bar (top of page) ---
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="scroll-progress-fill"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
};

// --- Back to top button ---
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={handleClick}
      aria-label="Back to top"
      title="Back to top"
    >
      <FaArrowUp />
    </button>
  );
};

const App = () => {
  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    AOS.init({
      duration: prefersReducedMotion ? 0 : 800,
      easing: 'ease-in-out-cubic',
      once: true,
      offset: 100,
      delay: 0,
      mirror: false,
      anchorPlacement: 'top-bottom',
      disable: prefersReducedMotion ? 'phone' : false,
    });

    // Throttled refresh on resize (avoids spam)
    let rafId = null;
    const handleResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        AOS.refresh();
        rafId = null;
      });
    };

    window.addEventListener('resize', handleResize);

    // Refresh AOS after images load (prevents layout shift on load)
    const handleLoad = () => AOS.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleLoad);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="app">
      <ScrollProgress />
      <Navbar />

      <main className="main-content" role="main" aria-label="Portfolio content">
        {/* Home already renders <section id="home"> internally —
            do NOT wrap again to avoid duplicate IDs. */}
        <Home />

        <Qualifications />
        <Experience />
        <Skills />
        <Project />
        <Contact />
      </main>

      <BackToTop />

      {/* ============================================================
          APP-LEVEL SCOPED STYLES
          (Only for the two global UI bits added here —
          everything else lives inside component files.)
         ============================================================ */}
      <style jsx global>{`
        /* =========================================
           SCROLL PROGRESS BAR
           ========================================= */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          z-index: 1100;
          pointer-events: none;
          background: transparent;
        }

        .scroll-progress-fill {
          height: 100%;
          width: 100%;
          transform-origin: 0 50%;
          transform: scaleX(0);
          background: linear-gradient(
            90deg,
            #6366f1 0%,
            #8b5cf6 35%,
            #ec4899 65%,
            #22d3ee 100%
          );
          box-shadow:
            0 0 12px rgba(139, 92, 246, 0.7),
            0 0 24px rgba(99, 102, 241, 0.4);
          transition: transform 0.15s linear;
          will-change: transform;
        }

        /* =========================================
           BACK TO TOP
           ========================================= */
        .back-to-top {
          position: fixed;
          right: 28px;
          bottom: 28px;
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #ffffff;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          z-index: 990;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px) scale(0.9);
          transition:
            opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            visibility 0.35s,
            box-shadow 0.3s ease;
          box-shadow:
            0 12px 28px -8px rgba(139, 92, 246, 0.7),
            0 0 0 1px rgba(255, 255, 255, 0.08) inset;
        }

        .back-to-top.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .back-to-top:hover {
          transform: translateY(-4px) scale(1.06);
          box-shadow:
            0 18px 40px -10px rgba(139, 92, 246, 0.9),
            0 0 0 1px rgba(255, 255, 255, 0.12) inset;
        }

        .back-to-top:active {
          transform: translateY(-2px) scale(1.02);
        }

        .back-to-top:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 3px;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .back-to-top {
            right: 18px;
            bottom: 18px;
            width: 46px;
            height: 46px;
            border-radius: 14px;
            font-size: 0.9rem;
          }
        }

        /* Light mode */
        body.light-mode .back-to-top {
          box-shadow:
            0 12px 28px -8px rgba(99, 102, 241, 0.45),
            0 0 0 1px rgba(255, 255, 255, 0.4) inset;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .scroll-progress-fill {
            transition: none;
          }
          .back-to-top {
            transition: opacity 0.01ms, visibility 0.01ms;
            transform: none;
          }
          .back-to-top.visible {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default App;