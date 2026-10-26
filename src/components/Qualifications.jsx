import React, { useRef } from 'react';
import {
  FaSchool,
  FaGraduationCap,
  FaTools,
  FaUniversity,
  FaCalendarAlt,
  FaCheckCircle,
  FaSpinner,
} from 'react-icons/fa';

// --- Qualification Card with cursor shine + tilt ---
const QualificationCard = ({ qual, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);

    // Subtle 3D tilt (±3deg)
    const px = (x / rect.width - 0.5) * 3;
    const py = (y / rect.height - 0.5) * -3;
    card.style.setProperty('--rx', `${py}deg`);
    card.style.setProperty('--ry', `${px}deg`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  const isOngoing = qual.status === 'ongoing';

  return (
    <div
      ref={cardRef}
      className="qualification-card"
      style={{
        '--card-color': qual.color,
        '--delay': `${index * 90}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="card-shine" aria-hidden="true" />

      <div className="card-top">
        <div className="icon-wrapper" style={{ background: qual.color }}>
          <span className="icon-inner">{qual.icon}</span>
          <span className="icon-shine" aria-hidden="true" />
        </div>
        <div className="card-header-text">
          <h3 className="qualification-title">{qual.title}</h3>
          <div className="institution">{qual.institution}</div>
        </div>
      </div>

      <div className="card-meta">
        <span className="year-badge">
          <FaCalendarAlt />
          {qual.year}
        </span>
        <span className={`status-badge ${isOngoing ? 'status-ongoing' : 'status-completed'}`}>
          {isOngoing ? (
            <>
              <FaSpinner className="spinner" />
              Ongoing
            </>
          ) : (
            <>
              <FaCheckCircle />
              Completed
            </>
          )}
        </span>
      </div>

      <p className="description">{qual.description}</p>

      {/* Corner accent */}
      <span className="corner-accent" aria-hidden="true" />
    </div>
  );
};

export const Qualifications = () => {
  const qualifications = [
    {
      icon: <FaSchool />,
      title: 'Madhyamik Examination',
      institution: 'WBBSE',
      year: '2020',
      description:
        'Passed with an excellent academic record, building a strong foundation in core subjects.',
      color: '#ff6b6b',
      status: 'completed',
    },
    {
      icon: <FaGraduationCap />,
      title: 'Higher Secondary Examination',
      institution: 'WBSCTVESD',
      year: '2022',
      description:
        'Completed with a focus on science and technology, sharpening analytical thinking.',
      color: '#4ecdc4',
      status: 'completed',
    },
    {
      icon: <FaTools />,
      title: 'ITI Electronics Mechanic (NSQF)',
      institution: 'NCVT',
      year: '2023',
      description:
        'Specialized in electronics and practical mechanics with hands-on technical training.',
      color: '#45b7d1',
      status: 'completed',
    },
    {
      icon: <FaUniversity />,
      title: 'Bachelor of Computer Application (BCA)',
      institution: 'Maulana Abul Kalam Azad University of Technology',
      year: '2025',
      description:
        'Graduating with a comprehensive computer science education and modern development skills.',
      color: '#96ceb4',
      status: 'completed',
    },
    {
      icon: <FaUniversity />,
      title: 'Master of Computer Application (MCA)',
      institution: 'Swami Vivekananda University',
      year: 'Pursuing',
      description:
        'Advancing my expertise with in-depth computer science and software engineering studies.',
      color: '#a78bfa',
      status: 'ongoing',
    },
  ];

  const completed = qualifications.filter((q) => q.status === 'completed').length;
  const ongoing = qualifications.length - completed;

  return (
    <>
      <style jsx global>{`
        /* =========================================
           DESIGN TOKENS
           ========================================= */
        :root {
          --qual-accent: #6366f1;
          --qual-ease: cubic-bezier(0.4, 0, 0.2, 1);
          --qual-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* =========================================
           SECTION SHELL
           ========================================= */
        .qualifications-section {
          padding: 110px 0 120px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #1e1b4b 0%, #0f172a 45%, #020617 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        body.light-mode .qualifications-section {
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #eef2ff 0%, #f8fafc 45%, #ffffff 100%);
        }

        /* Grid */
        .qualifications-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99, 102, 241, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.06) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 78%);
          pointer-events: none;
        }

        body.light-mode .qualifications-section::before {
          background-image:
            linear-gradient(rgba(99, 102, 241, 0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.09) 1px, transparent 1px);
        }

        /* Aurora */
        .qualifications-section::after {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 40% 40%, rgba(99, 102, 241, 0.16), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1), transparent 60%);
          top: -260px;
          right: -220px;
          filter: blur(90px);
          pointer-events: none;
          animation: qualAurora 16s ease-in-out infinite alternate;
        }

        body.light-mode .qualifications-section::after { opacity: 0.5; }

        @keyframes qualAurora {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-40px, 40px) scale(1.1); }
          100% { transform: translate(30px, -20px) scale(0.94); }
        }

        /* =========================================
           CONTAINER
           ========================================= */
        .qualifications-container {
          max-width: 1220px;
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
          margin-bottom: 70px;
          animation: qualFadeUp 0.8s var(--qual-ease) both;
        }

        @keyframes qualFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.28);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #818cf8;
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
          background: #818cf8;
          box-shadow: 0 0 12px #818cf8;
        }

        .section-eyebrow .dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #818cf8;
          opacity: 0.5;
          animation: qualPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes qualPing {
          0% { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(2.2); opacity: 0; }
        }

        .section-title {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800;
          line-height: 1.12;
          margin: 0 0 18px 0;
          background: linear-gradient(135deg, #ffffff 0%, #c7d2fe 55%, #a5b4fc 100%);
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

        .section-header .accent-line {
          width: 72px;
          height: 4px;
          margin: 24px auto 0;
          border-radius: 999px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #22d3ee);
          box-shadow: 0 0 24px rgba(99, 102, 241, 0.6);
        }

        /* =========================================
           STATS BAR
           ========================================= */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px 28px;
          border-radius: 16px;
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(148, 163, 184, 0.14);
          transition: transform 0.3s var(--qual-spring), border-color 0.3s var(--qual-ease);
          min-width: 120px;
        }

        .stat-item:hover {
          transform: translateY(-3px);
          border-color: rgba(99, 102, 241, 0.4);
        }

        .stat-value {
          font-size: 1.85rem;
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, #a5b4fc, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 0.72rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1.6px;
          margin-top: 8px;
          font-weight: 600;
        }

        /* =========================================
           GRID
           ========================================= */
        .qualifications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
          gap: 24px;
        }

        /* =========================================
           CARD
           ========================================= */
        .qualification-card {
          --mx: 50%;
          --my: 50%;
          --rx: 0deg;
          --ry: 0deg;
          position: relative;
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.92));
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 22px;
          padding: 32px 28px 28px;
          border: 1px solid rgba(148, 163, 184, 0.12);
          overflow: hidden;
          transition:
            transform 0.4s var(--qual-ease),
            border-color 0.4s var(--qual-ease),
            box-shadow 0.4s var(--qual-ease);
          animation: cardEnter 0.7s var(--delay) var(--qual-ease) both;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(28px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .qualification-card:hover {
          border-color: color-mix(in srgb, var(--card-color) 45%, transparent);
          box-shadow:
            0 24px 60px -18px rgba(0, 0, 0, 0.6),
            0 0 0 1px color-mix(in srgb, var(--card-color) 20%, transparent) inset,
            0 0 40px -12px color-mix(in srgb, var(--card-color) 40%, transparent);
          transform: translateY(-6px) rotateX(var(--rx)) rotateY(var(--ry));
        }

        /* Top colored bar */
        .qualification-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--card-color), transparent);
          opacity: 0.9;
          transition: height 0.3s var(--qual-ease);
        }

        .qualification-card:hover::before { height: 4px; }

        /* Cursor shine */
        .card-shine {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            400px circle at var(--mx) var(--my),
            color-mix(in srgb, var(--card-color) 10%, transparent),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.4s var(--qual-ease);
          pointer-events: none;
        }

        .qualification-card:hover .card-shine { opacity: 1; }

        /* Corner accent */
        .corner-accent {
          position: absolute;
          bottom: -40px;
          right: -40px;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: var(--card-color);
          opacity: 0.05;
          filter: blur(40px);
          transition: opacity 0.4s var(--qual-ease);
          pointer-events: none;
        }

        .qualification-card:hover .corner-accent { opacity: 0.16; }

        /* =========================================
           CARD TOP
           ========================================= */
        .card-top {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }

        .icon-wrapper {
          position: relative;
          width: 60px;
          height: 60px;
          min-width: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.55rem;
          color: #ffffff;
          box-shadow:
            0 10px 24px -6px var(--card-color),
            0 0 0 1px rgba(255, 255, 255, 0.15) inset;
          transition: transform 0.4s var(--qual-spring);
          overflow: hidden;
        }

        .qualification-card:hover .icon-wrapper {
          transform: scale(1.08) rotate(-6deg);
        }

        .icon-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.35),
            transparent
          );
          transition: left 0.7s var(--qual-ease);
        }

        .qualification-card:hover .icon-shine { left: 100%; }

        .card-header-text { flex: 1; min-width: 0; }

        .qualification-title {
          font-size: 1.14rem;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.35;
          margin: 0 0 6px 0;
          letter-spacing: -0.01em;
        }

        .institution {
          font-size: 0.88rem;
          font-weight: 500;
          color: #94a3b8;
          line-height: 1.5;
        }

        /* =========================================
           META
           ========================================= */
        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .year-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.28);
          color: #a5b4fc;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
          letter-spacing: 0.2px;
          transition: all 0.3s var(--qual-ease);
        }

        .year-badge svg { font-size: 0.72rem; opacity: 0.85; }

        .qualification-card:hover .year-badge {
          background: rgba(99, 102, 241, 0.18);
          border-color: rgba(99, 102, 241, 0.45);
        }

        /* Status badges */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .status-completed {
          background: rgba(34, 197, 94, 0.12);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .status-ongoing {
          background: rgba(251, 191, 36, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.32);
          position: relative;
        }

        .status-ongoing::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 999px;
          border: 1px solid rgba(251, 191, 36, 0.3);
          animation: statusPulse 2.4s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%      { transform: scale(1.08); opacity: 0; }
        }

        .spinner { animation: spin 2s linear infinite; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Description */
        .description {
          color: #94a3b8;
          line-height: 1.68;
          font-size: 0.88rem;
          position: relative;
          z-index: 1;
          padding-top: 18px;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          margin: 0;
        }

        /* =========================================
           LIGHT MODE
           ========================================= */
        body.light-mode .section-title {
          background: linear-gradient(135deg, #0f172a 0%, #4f46e5 55%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        body.light-mode .section-subtitle { color: #64748b; }

        body.light-mode .stat-item {
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(148, 163, 184, 0.22);
          box-shadow: 0 4px 20px -6px rgba(0, 0, 0, 0.06);
        }

        body.light-mode .stat-value {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        body.light-mode .stat-label { color: #64748b; }

        body.light-mode .qualification-card {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(148, 163, 184, 0.22);
          box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.06);
        }

        body.light-mode .qualification-card:hover {
          box-shadow:
            0 24px 60px -18px rgba(0, 0, 0, 0.16),
            0 0 0 1px color-mix(in srgb, var(--card-color) 25%, transparent) inset;
        }

        body.light-mode .card-shine {
          background: radial-gradient(
            400px circle at var(--mx) var(--my),
            color-mix(in srgb, var(--card-color) 8%, transparent),
            transparent 60%
          );
        }

        body.light-mode .qualification-title { color: #0f172a; }
        body.light-mode .institution { color: #64748b; }

        body.light-mode .year-badge {
          background: rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.25);
          color: #4f46e5;
        }

        body.light-mode .status-completed {
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          border-color: rgba(34, 197, 94, 0.28);
        }

        body.light-mode .status-ongoing {
          background: rgba(251, 191, 36, 0.14);
          color: #d97706;
          border-color: rgba(251, 191, 36, 0.4);
        }

        body.light-mode .description {
          color: #64748b;
          border-top-color: rgba(148, 163, 184, 0.22);
        }

        /* =========================================
           RESPONSIVE
           ========================================= */
        @media (max-width: 768px) {
          .qualifications-section { padding: 80px 0 90px; }
          .section-header { margin-bottom: 48px; }
          .qualifications-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .qualification-card { padding: 26px 22px; }
          .stats-bar { gap: 10px; margin-top: 32px; }
          .stat-item { padding: 12px 20px; min-width: 100px; }
          .stat-value { font-size: 1.5rem; }
        }

        @media (max-width: 480px) {
          .qualifications-container { padding: 0 18px; }
          .qualification-card { padding: 22px 18px; }
          .icon-wrapper {
            width: 52px;
            height: 52px;
            min-width: 52px;
            font-size: 1.3rem;
            border-radius: 14px;
          }
          .qualification-title { font-size: 1.05rem; }
          .stat-item { padding: 10px 16px; min-width: 88px; }
          .stat-value { font-size: 1.3rem; }
          .stat-label { font-size: 0.66rem; }
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

      <section className="qualifications-section" id="qualifications">
        <div className="qualifications-container">
          {/* Header */}
          <div className="section-header">
            <span className="section-eyebrow">
              <span className="dot" />
              My Academic Path
            </span>
            <h2 className="section-title">Educational Journey</h2>
            <p className="section-subtitle">
              A timeline of my academic milestones and continuous growth in the world of technology
            </p>
            <div className="accent-line" />

            <div className="stats-bar">
              <div className="stat-item">
                <span className="stat-value">{qualifications.length}</span>
                <span className="stat-label">Qualifications</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{completed}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{ongoing}</span>
                <span className="stat-label">Ongoing</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">5+</span>
                <span className="stat-label">Years Learning</span>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="qualifications-grid">
            {qualifications.map((qual, index) => (
              <QualificationCard key={index} qual={qual} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};