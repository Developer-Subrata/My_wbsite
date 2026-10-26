import React, { useMemo, useState, useRef, useEffect } from 'react';
import { FaCode, FaLayerGroup, FaServer, FaTools, FaFolderOpen } from 'react-icons/fa';
import skills from './data/skills.json';

const CATEGORY_META = {
  frontend: { label: 'Frontend', icon: <FaCode />, color: '#61dafb' },
  backend: { label: 'Backend', icon: <FaServer />, color: '#68a063' },
  fullstack: { label: 'Full Stack', icon: <FaLayerGroup />, color: '#8b5cf6' },
  tools: { label: 'Tools & Others', icon: <FaTools />, color: '#f59e0b' },
};

// --- Circular proficiency ring ---
const ProgressRing = ({ value, color }) => {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // slight delay so width transition feels natural
          setTimeout(() => setAnimated(true), 120);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - ((animated ? value : 0) / 100) * circumference;

  return (
    <div className="progress-ring" ref={ref} style={{ '--ring-color': color }}>
      <svg viewBox="0 0 72 72" className="ring-svg">
        <circle
          className="ring-track"
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          strokeWidth="6"
        />
        <circle
          className="ring-fill"
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 36 36)"
        />
      </svg>
      <span className="ring-label">{value}%</span>
    </div>
  );
};

// --- Skill Card ---
const SkillCard = ({ data, index }) => {
  const cardRef = useRef(null);
  const color = CATEGORY_META[data.category]?.color || '#818cf8';

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);

    const px = (x / rect.width - 0.5) * 4;
    const py = (y / rect.height - 0.5) * -4;
    card.style.setProperty('--rx', `${py}deg`);
    card.style.setProperty('--ry', `${px}deg`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={cardRef}
      className="skill-card"
      style={{
        '--skill-color': color,
        '--delay': `${index * 55}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="card-shine" aria-hidden="true" />

      <div className="skill-icon-wrap">
        <span className="icon-halo" aria-hidden="true" />
        <img src={data.imageSrc} alt={data.title} loading="lazy" />
      </div>

      <h3 className="skill-title">{data.title}</h3>

      <div className="skill-progress">
        <ProgressRing value={data.level} color={color} />
      </div>
    </div>
  );
};

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const normalizedSkills = useMemo(
    () =>
      skills.map((s) => ({
        ...s,
        category: s.category || 'fullstack',
        level: typeof s.level === 'number' ? s.level : 85,
      })),
    []
  );

  const categories = useMemo(() => {
    const map = new Map();
    normalizedSkills.forEach((s) => {
      if (!map.has(s.category)) {
        map.set(s.category, CATEGORY_META[s.category] || CATEGORY_META.tools);
      }
    });
    return [
      {
        key: 'all',
        label: 'All Skills',
        icon: <FaLayerGroup />,
        color: '#818cf8',
        count: normalizedSkills.length,
      },
      ...Array.from(map.entries()).map(([key, meta]) => ({
        key,
        ...meta,
        count: normalizedSkills.filter((s) => s.category === key).length,
      })),
    ];
  }, [normalizedSkills]);

  const filteredSkills =
    activeCategory === 'all'
      ? normalizedSkills
      : normalizedSkills.filter((s) => s.category === activeCategory);

  return (
    <>
      <style jsx global>{`
        /* =========================================
           DESIGN TOKENS
           ========================================= */
        :root {
          --skills-ease: cubic-bezier(0.4, 0, 0.2, 1);
          --skills-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* =========================================
           SECTION SHELL
           ========================================= */
        .skills-section {
          padding: 110px 0 120px;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #1e1b4b 0%, #0f172a 45%, #020617 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        body.light-mode .skills-section {
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #eef2ff 0%, #f8fafc 45%, #ffffff 100%);
        }

        .skills-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(129, 140, 248, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(129, 140, 248, 0.06) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 78%);
          pointer-events: none;
        }

        body.light-mode .skills-section::before {
          background-image:
            linear-gradient(rgba(129, 140, 248, 0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(129, 140, 248, 0.09) 1px, transparent 1px);
        }

        .skills-section::after {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 40% 40%, rgba(129, 140, 248, 0.16), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1), transparent 60%);
          top: -260px;
          left: -220px;
          filter: blur(90px);
          pointer-events: none;
          animation: skillsAurora 16s ease-in-out infinite alternate;
        }

        body.light-mode .skills-section::after { opacity: 0.5; }

        @keyframes skillsAurora {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(40px, 30px) scale(1.1); }
          100% { transform: translate(-30px, -20px) scale(0.94); }
        }

        /* =========================================
           CONTAINER
           ========================================= */
        .skills-container {
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
          margin-bottom: 68px;
          animation: skillsFadeUp 0.8s var(--skills-ease) both;
        }

        @keyframes skillsFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: rgba(129, 140, 248, 0.08);
          border: 1px solid rgba(129, 140, 248, 0.28);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #a5b4fc;
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
          background: #a5b4fc;
          box-shadow: 0 0 12px #a5b4fc;
        }

        .section-eyebrow .dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #a5b4fc;
          opacity: 0.5;
          animation: skillsPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes skillsPing {
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
          background: linear-gradient(90deg, #818cf8, #8b5cf6, #22d3ee);
          box-shadow: 0 0 24px rgba(129, 140, 248, 0.6);
        }

        /* =========================================
           CATEGORY TABS
           ========================================= */
        .category-tabs {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 40px;
        }

        .category-tab {
          --cat-color: #818cf8;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 0.86rem;
          font-weight: 600;
          cursor: pointer;
          background: rgba(148, 163, 184, 0.06);
          border: 1px solid rgba(148, 163, 184, 0.16);
          color: #cbd5e1;
          transition: all 0.3s var(--skills-ease);
          font-family: inherit;
        }

        .category-tab:hover {
          background: rgba(148, 163, 184, 0.12);
          border-color: rgba(148, 163, 184, 0.3);
          transform: translateY(-2px);
          color: #f1f5f9;
        }

        .category-tab:focus-visible {
          outline: 2px solid var(--cat-color);
          outline-offset: 3px;
        }

        .category-tab.active {
          background: color-mix(in srgb, var(--cat-color) 15%, transparent);
          border-color: color-mix(in srgb, var(--cat-color) 50%, transparent);
          color: #ffffff;
          box-shadow:
            0 6px 20px -6px color-mix(in srgb, var(--cat-color) 55%, transparent),
            0 0 0 1px color-mix(in srgb, var(--cat-color) 20%, transparent) inset;
        }

        .category-tab svg { font-size: 0.85rem; }

        .tab-count {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.15);
          color: inherit;
          min-width: 20px;
          text-align: center;
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
        }

        .category-tab.active .tab-count {
          background: color-mix(in srgb, var(--cat-color) 30%, transparent);
          color: #ffffff;
        }

        /* =========================================
           GRID
           ========================================= */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 18px;
          margin-top: 52px;
        }

        /* =========================================
           SKILL CARD
           ========================================= */
        .skill-card {
          --mx: 50%;
          --my: 50%;
          --rx: 0deg;
          --ry: 0deg;
          position: relative;
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.92));
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 22px;
          padding: 26px 18px 22px;
          border: 1px solid rgba(148, 163, 184, 0.12);
          text-align: center;
          overflow: hidden;
          transition:
            transform 0.4s var(--skills-ease),
            border-color 0.4s var(--skills-ease),
            box-shadow 0.4s var(--skills-ease);
          animation: skillCardIn 0.55s var(--delay) var(--skills-ease) both;
          transform-style: preserve-3d;
          perspective: 800px;
        }

        @keyframes skillCardIn {
          from { opacity: 0; transform: translateY(22px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--skill-color), transparent);
          opacity: 0.85;
          transition: height 0.3s var(--skills-ease);
        }

        .skill-card:hover {
          border-color: color-mix(in srgb, var(--skill-color) 45%, transparent);
          box-shadow:
            0 22px 55px -16px rgba(0, 0, 0, 0.6),
            0 0 0 1px color-mix(in srgb, var(--skill-color) 20%, transparent) inset,
            0 0 40px -12px color-mix(in srgb, var(--skill-color) 40%, transparent);
          transform: translateY(-6px) rotateX(var(--rx)) rotateY(var(--ry));
        }

        .skill-card:hover::before { height: 4px; }

        /* Cursor shine */
        .card-shine {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            300px circle at var(--mx) var(--my),
            color-mix(in srgb, var(--skill-color) 12%, transparent),
            transparent 65%
          );
          opacity: 0;
          transition: opacity 0.4s var(--skills-ease);
          pointer-events: none;
        }

        .skill-card:hover .card-shine { opacity: 1; }

        /* =========================================
           ICON
           ========================================= */
        .skill-icon-wrap {
          position: relative;
          width: 74px;
          height: 74px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          background: rgba(148, 163, 184, 0.06);
          border: 1px solid rgba(148, 163, 184, 0.14);
          z-index: 1;
          transition: transform 0.4s var(--skills-spring);
        }

        .icon-halo {
          position: absolute;
          inset: -6px;
          border-radius: 24px;
          background: radial-gradient(circle, var(--skill-color), transparent 70%);
          opacity: 0;
          filter: blur(12px);
          transition: opacity 0.4s var(--skills-ease);
          pointer-events: none;
        }

        .skill-card:hover .icon-halo { opacity: 0.35; }

        .skill-card:hover .skill-icon-wrap {
          transform: scale(1.08) rotate(-5deg);
        }

        .skill-icon-wrap img {
          width: 46px;
          height: 46px;
          object-fit: contain;
          filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.35));
          position: relative;
          z-index: 1;
          transition: transform 0.4s var(--skills-spring);
        }

        .skill-card:hover .skill-icon-wrap img {
          transform: scale(1.05);
        }

        .skill-title {
          font-size: 0.94rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 16px 0;
          line-height: 1.35;
          letter-spacing: -0.01em;
          position: relative;
          z-index: 1;
        }

        /* =========================================
           PROGRESS RING
           ========================================= */
        .skill-progress {
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .progress-ring {
          position: relative;
          width: 72px;
          height: 72px;
        }

        .ring-svg {
          width: 100%;
          height: 100%;
          transform: rotate(0deg);
        }

        .ring-track {
          stroke: rgba(148, 163, 184, 0.15);
        }

        body.light-mode .ring-track {
          stroke: rgba(148, 163, 184, 0.25);
        }

        .ring-fill {
          stroke: var(--ring-color);
          filter: drop-shadow(0 0 4px var(--ring-color));
          transition: stroke-dashoffset 1.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ring-label {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--ring-color);
          letter-spacing: -0.02em;
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
        }

        /* =========================================
           EMPTY STATE
           ========================================= */
        .empty-state {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 80px 24px;
          color: #94a3b8;
          text-align: center;
        }

        .empty-state-icon {
          width: 72px;
          height: 72px;
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(129, 140, 248, 0.15), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(129, 140, 248, 0.25);
          color: #a5b4fc;
          font-size: 1.8rem;
          box-shadow: 0 12px 32px -8px rgba(129, 140, 248, 0.4);
        }

        .empty-state p {
          margin: 0;
          font-size: 0.95rem;
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

        body.light-mode .category-tab {
          background: rgba(148, 163, 184, 0.1);
          border-color: rgba(148, 163, 184, 0.22);
          color: #475569;
        }

        body.light-mode .category-tab:hover {
          background: rgba(148, 163, 184, 0.18);
          color: #1e293b;
        }

        body.light-mode .tab-count {
          background: rgba(148, 163, 184, 0.2);
          color: #64748b;
        }

        body.light-mode .category-tab.active .tab-count {
          background: color-mix(in srgb, var(--cat-color) 25%, white);
          color: #0f172a;
        }

        body.light-mode .skill-card {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(148, 163, 184, 0.22);
          box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.06);
        }

        body.light-mode .skill-card:hover {
          box-shadow:
            0 22px 55px -16px rgba(0, 0, 0, 0.15),
            0 0 0 1px color-mix(in srgb, var(--skill-color) 25%, transparent) inset;
        }

        body.light-mode .card-shine {
          background: radial-gradient(
            300px circle at var(--mx) var(--my),
            color-mix(in srgb, var(--skill-color) 8%, transparent),
            transparent 65%
          );
        }

        body.light-mode .skill-title { color: #0f172a; }

        body.light-mode .skill-icon-wrap {
          background: rgba(148, 163, 184, 0.1);
          border-color: rgba(148, 163, 184, 0.2);
        }

        /* =========================================
           RESPONSIVE
           ========================================= */
        @media (max-width: 768px) {
          .skills-section { padding: 80px 0 90px; }
          .section-header { margin-bottom: 48px; }
          .skills-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 14px;
            margin-top: 40px;
          }
          .skill-card { padding: 22px 14px 18px; }
          .skill-icon-wrap { width: 62px; height: 62px; border-radius: 16px; }
          .skill-icon-wrap img { width: 38px; height: 38px; }
          .skill-title { font-size: 0.86rem; }
          .progress-ring { width: 64px; height: 64px; }
          .ring-label { font-size: 0.72rem; }
        }

        @media (max-width: 480px) {
          .skills-container { padding: 0 18px; }
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .category-tabs { gap: 8px; }
          .category-tab { padding: 8px 13px; font-size: 0.78rem; gap: 6px; }
          .tab-count { font-size: 0.62rem; padding: 1px 5px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          .ring-fill { transition: none; }
        }
      `}</style>

      <section className="skills-section" id="skills">
        <div className="skills-container">
          {/* Header */}
          <div className="section-header">
            <span className="section-eyebrow">
              <span className="dot" />
              My Expertise
            </span>
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-subtitle">
              A curated toolkit of technologies I use to design, build, and ship
              modern full-stack applications
            </p>
            <div className="accent-line" />

            {/* Category Tabs */}
            <div className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`category-tab ${activeCategory === cat.key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.key)}
                  style={{ '--cat-color': cat.color }}
                  aria-pressed={activeCategory === cat.key}
                >
                  {cat.icon}
                  {cat.label}
                  <span className="tab-count">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="skills-grid">
            {filteredSkills.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FaFolderOpen />
                </div>
                <p>No skills in this category yet. Stay tuned!</p>
              </div>
            ) : (
              filteredSkills.map((data, index) => (
                <SkillCard key={data.id} data={data} index={index} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};