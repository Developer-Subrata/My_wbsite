import React, { useMemo, useState, useRef } from 'react';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowRight,
  FaStar,
  FaFolderOpen,
} from 'react-icons/fa';
import project from './data/projects.json';

// --- Project Card with cursor shine + tilt ---
const ProjectCard = ({ data, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);

    // Subtle 3D tilt
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
    <article
      ref={cardRef}
      className="project-card"
      style={{ '--delay': `${index * 80}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="card-shine" aria-hidden="true" />

      {/* Image */}
      <div className="project-image-wrap">
        {data.featured && (
          <span className="featured-badge">
            <FaStar />
            Featured
          </span>
        )}
        <img
          src={data.imageSrc}
          alt={data.title}
          className="project-image"
          loading="lazy"
        />
        <div className="image-shine" aria-hidden="true" />
        <div className="image-overlay">
          {data.demo && (
            <a
              href={data.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="overlay-btn"
              title="View Live Demo"
              aria-label="View Live Demo"
            >
              <FaExternalLinkAlt />
            </a>
          )}
          {data.source && (
            <a
              href={data.source}
              target="_blank"
              rel="noopener noreferrer"
              className="overlay-btn"
              title="View Source Code"
              aria-label="View Source Code"
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="project-body">
        <h3 className="project-title">{data.title}</h3>
        <p className="project-description">{data.description}</p>

        {data.tech.length > 0 && (
          <div className="tech-tags">
            {data.tech.slice(0, 4).map((t) => (
              <span key={t} className="tech-tag">
                {t}
              </span>
            ))}
            {data.tech.length > 4 && (
              <span className="tech-tag more">+{data.tech.length - 4}</span>
            )}
          </div>
        )}

        <div className="project-actions">
          {data.demo && (
            <a
              href={data.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn primary"
            >
              <FaExternalLinkAlt />
              <span>Live Demo</span>
              <FaArrowRight className="arrow" />
            </a>
          )}
          {data.source && (
            <a
              href={data.source}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn secondary"
            >
              <FaGithub />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export const Project = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const normalizedProjects = useMemo(
    () =>
      project.map((p) => ({
        ...p,
        tech: p.tech || [],
        featured: p.featured || false,
        category: p.category || 'fullstack',
      })),
    []
  );

  const filters = useMemo(() => {
    const cats = new Set(normalizedProjects.map((p) => p.category));
    return [
      { key: 'all', label: 'All', count: normalizedProjects.length },
      ...Array.from(cats).map((c) => ({
        key: c,
        label: c.charAt(0).toUpperCase() + c.slice(1),
        count: normalizedProjects.filter((p) => p.category === c).length,
      })),
    ];
  }, [normalizedProjects]);

  const filteredProjects =
    activeFilter === 'all'
      ? normalizedProjects
      : normalizedProjects.filter((p) => p.category === activeFilter);

  return (
    <>
      <style jsx global>{`
        /* =========================================
           DESIGN TOKENS
           ========================================= */
        :root {
          --proj-accent: #10b981;
          --proj-ease: cubic-bezier(0.4, 0, 0.2, 1);
          --proj-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* =========================================
           SECTION SHELL
           ========================================= */
        .projects-section {
          padding: 110px 0 120px;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #042f2e 0%, #0f172a 45%, #020617 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        body.light-mode .projects-section {
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #ecfdf5 0%, #f8fafc 45%, #ffffff 100%);
        }

        /* Grid */
        .projects-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(16, 185, 129, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.06) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 78%);
          pointer-events: none;
        }

        body.light-mode .projects-section::before {
          background-image:
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
        }

        /* Aurora */
        .projects-section::after {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.16), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.1), transparent 60%);
          top: -260px;
          right: -220px;
          filter: blur(90px);
          pointer-events: none;
          animation: projAurora 15s ease-in-out infinite alternate;
        }

        body.light-mode .projects-section::after { opacity: 0.4; }

        @keyframes projAurora {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-40px, 40px) scale(1.1); }
          100% { transform: translate(30px, -20px) scale(0.94); }
        }

        /* =========================================
           CONTAINER
           ========================================= */
        .projects-container {
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
          animation: projFadeUp 0.8s var(--proj-ease) both;
        }

        @keyframes projFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.28);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #34d399;
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
          background: #34d399;
          box-shadow: 0 0 12px #34d399;
        }

        .section-eyebrow .dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #34d399;
          opacity: 0.5;
          animation: projPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes projPing {
          0% { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(2.2); opacity: 0; }
        }

        .section-title {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800;
          line-height: 1.12;
          margin: 0 0 18px 0;
          background: linear-gradient(135deg, #ffffff 0%, #6ee7b7 55%, #34d399 100%);
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
          background: linear-gradient(90deg, #10b981, #22d3ee, #3b82f6);
          box-shadow: 0 0 24px rgba(16, 185, 129, 0.6);
        }

        /* =========================================
           FILTER TABS
           ========================================= */
        .filter-tabs {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 40px;
        }

        .filter-tab {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 0.86rem;
          font-weight: 600;
          cursor: pointer;
          background: rgba(148, 163, 184, 0.06);
          border: 1px solid rgba(148, 163, 184, 0.16);
          color: #cbd5e1;
          transition: all 0.3s var(--proj-ease);
          font-family: inherit;
        }

        .filter-tab:hover {
          background: rgba(148, 163, 184, 0.12);
          border-color: rgba(148, 163, 184, 0.3);
          transform: translateY(-2px);
          color: #f1f5f9;
        }

        .filter-tab:focus-visible {
          outline: 2px solid #34d399;
          outline-offset: 3px;
        }

        .filter-tab.active {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(34, 211, 238, 0.15));
          border-color: rgba(16, 185, 129, 0.5);
          color: #6ee7b7;
          box-shadow:
            0 6px 20px -6px rgba(16, 185, 129, 0.5),
            0 0 0 1px rgba(16, 185, 129, 0.15) inset;
        }

        .filter-count {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.15);
          color: inherit;
          min-width: 20px;
          text-align: center;
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
        }

        .filter-tab.active .filter-count {
          background: rgba(16, 185, 129, 0.3);
          color: #d1fae5;
        }

        /* =========================================
           GRID
           ========================================= */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 26px;
          margin-top: 52px;
        }

        /* =========================================
           PROJECT CARD
           ========================================= */
        .project-card {
          --mx: 50%;
          --my: 50%;
          --rx: 0deg;
          --ry: 0deg;
          position: relative;
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.92));
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 22px;
          border: 1px solid rgba(148, 163, 184, 0.12);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition:
            transform 0.5s var(--proj-ease),
            border-color 0.4s var(--proj-ease),
            box-shadow 0.4s var(--proj-ease);
          animation: cardIn 0.6s var(--delay) var(--proj-ease) both;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .project-card:hover {
          border-color: rgba(16, 185, 129, 0.4);
          box-shadow:
            0 28px 60px -18px rgba(0, 0, 0, 0.65),
            0 0 0 1px rgba(16, 185, 129, 0.18) inset,
            0 0 40px -10px rgba(16, 185, 129, 0.3);
          transform: translateY(-6px) rotateX(var(--rx)) rotateY(var(--ry));
        }

        /* Cursor shine overlay */
        .card-shine {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            500px circle at var(--mx) var(--my),
            rgba(16, 185, 129, 0.1),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.4s var(--proj-ease);
          pointer-events: none;
          z-index: 3;
        }

        .project-card:hover .card-shine { opacity: 1; }

        /* =========================================
           IMAGE AREA
           ========================================= */
        .project-image-wrap {
          position: relative;
          width: 100%;
          height: 210px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(59, 130, 246, 0.08));
        }

        .project-image-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 45%, rgba(15, 23, 42, 0.9) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s var(--proj-ease);
        }

        .project-card:hover .project-image {
          transform: scale(1.08);
        }

        /* Shine sweep on image */
        .image-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            100deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          transform: skewX(-20deg);
          pointer-events: none;
          z-index: 2;
          transition: left 0.8s var(--proj-ease);
        }

        .project-card:hover .image-shine { left: 150%; }

        /* Featured badge */
        .featured-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          border-radius: 999px;
          box-shadow:
            0 6px 18px -4px rgba(16, 185, 129, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.15) inset;
        }

        .featured-badge svg {
          font-size: 0.65rem;
          animation: starPulse 2s ease-in-out infinite;
        }

        @keyframes starPulse {
          0%, 100% { transform: rotate(0) scale(1); }
          50%      { transform: rotate(18deg) scale(1.15); }
        }

        /* Overlay actions */
        .image-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          z-index: 4;
          opacity: 0;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.85));
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: opacity 0.35s var(--proj-ease);
        }

        .project-card:hover .image-overlay { opacity: 1; }

        .overlay-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #ffffff;
          font-size: 1.05rem;
          text-decoration: none;
          transition: all 0.35s var(--proj-spring);
          transform: translateY(12px);
          opacity: 0;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .project-card:hover .overlay-btn {
          transform: translateY(0);
          opacity: 1;
        }

        .project-card:hover .overlay-btn:nth-child(1) { transition-delay: 0.05s; }
        .project-card:hover .overlay-btn:nth-child(2) { transition-delay: 0.12s; }

        .overlay-btn:hover {
          background: linear-gradient(135deg, #10b981, #059669);
          border-color: #10b981;
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 12px 28px -6px rgba(16, 185, 129, 0.7);
        }

        .overlay-btn:focus-visible {
          outline: 2px solid #34d399;
          outline-offset: 3px;
        }

        /* =========================================
           CARD BODY
           ========================================= */
        .project-body {
          padding: 26px 24px 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .project-title {
          font-size: 1.16rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 10px 0;
          line-height: 1.35;
          letter-spacing: -0.01em;
          transition: color 0.25s var(--proj-ease);
        }

        .project-card:hover .project-title { color: #6ee7b7; }

        .project-description {
          font-size: 0.87rem;
          line-height: 1.68;
          color: #94a3b8;
          margin: 0 0 18px 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Tech tags */
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .tech-tag {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.22);
          color: #6ee7b7;
          letter-spacing: 0.3px;
          transition: all 0.25s var(--proj-ease);
        }

        .tech-tag:hover {
          background: rgba(16, 185, 129, 0.18);
          border-color: rgba(16, 185, 129, 0.4);
          transform: translateY(-1px);
        }

        .tech-tag.more {
          background: rgba(148, 163, 184, 0.1);
          border-color: rgba(148, 163, 184, 0.2);
          color: #cbd5e1;
        }

        /* Actions */
        .project-actions {
          display: flex;
          gap: 10px;
          padding-top: 18px;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
        }

        .action-btn {
          position: relative;
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 14px;
          border-radius: 12px;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s var(--proj-spring);
          cursor: pointer;
          border: 1px solid transparent;
          overflow: hidden;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #10b981, #059669);
          color: #ffffff;
          box-shadow: 0 6px 18px -6px rgba(16, 185, 129, 0.5);
        }

        .action-btn.primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), transparent);
          transition: left 0.6s var(--proj-ease);
        }

        .action-btn.primary:hover::before { left: 100%; }

        .action-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px -6px rgba(16, 185, 129, 0.7);
        }

        .action-btn.primary .arrow {
          font-size: 0.72rem;
          margin-left: auto;
          transition: transform 0.3s var(--proj-spring);
        }

        .action-btn.primary:hover .arrow { transform: translateX(3px); }

        .action-btn.secondary {
          background: rgba(148, 163, 184, 0.08);
          border-color: rgba(148, 163, 184, 0.2);
          color: #cbd5e1;
        }

        .action-btn.secondary:hover {
          background: rgba(148, 163, 184, 0.18);
          border-color: rgba(148, 163, 184, 0.4);
          color: #f1f5f9;
          transform: translateY(-2px);
        }

        .action-btn:focus-visible {
          outline: 2px solid #34d399;
          outline-offset: 3px;
        }

        .action-btn svg { font-size: 0.85rem; flex-shrink: 0; }

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
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(34, 211, 238, 0.1));
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #34d399;
          font-size: 1.8rem;
          box-shadow: 0 12px 32px -8px rgba(16, 185, 129, 0.4);
        }

        .empty-state p {
          margin: 0;
          font-size: 0.95rem;
        }

        /* =========================================
           LIGHT MODE
           ========================================= */
        body.light-mode .section-title {
          background: linear-gradient(135deg, #0f172a 0%, #059669 55%, #0891b2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        body.light-mode .section-subtitle { color: #64748b; }

        body.light-mode .filter-tab {
          background: rgba(148, 163, 184, 0.1);
          border-color: rgba(148, 163, 184, 0.22);
          color: #475569;
        }

        body.light-mode .filter-tab:hover {
          background: rgba(148, 163, 184, 0.18);
          color: #1e293b;
        }

        body.light-mode .filter-tab.active {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(34, 211, 238, 0.12));
          border-color: rgba(16, 185, 129, 0.4);
          color: #047857;
        }

        body.light-mode .filter-count {
          background: rgba(148, 163, 184, 0.2);
          color: #64748b;
        }

        body.light-mode .filter-tab.active .filter-count {
          background: rgba(16, 185, 129, 0.25);
          color: #065f46;
        }

        body.light-mode .project-card {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(148, 163, 184, 0.22);
          box-shadow: 0 4px 20px -6px rgba(0, 0, 0, 0.06);
        }

        body.light-mode .project-card:hover {
          box-shadow:
            0 28px 60px -18px rgba(0, 0, 0, 0.16),
            0 0 0 1px rgba(16, 185, 129, 0.2) inset;
        }

        body.light-mode .project-image-wrap::after {
          background: linear-gradient(180deg, transparent 45%, rgba(248, 250, 252, 0.9) 100%);
        }

        body.light-mode .card-shine {
          background: radial-gradient(
            500px circle at var(--mx) var(--my),
            rgba(16, 185, 129, 0.07),
            transparent 60%
          );
        }

        body.light-mode .project-title { color: #0f172a; }
        body.light-mode .project-card:hover .project-title { color: #047857; }

        body.light-mode .project-description { color: #64748b; }

        body.light-mode .tech-tag {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.28);
          color: #047857;
        }

        body.light-mode .tech-tag.more {
          background: rgba(148, 163, 184, 0.12);
          border-color: rgba(148, 163, 184, 0.25);
          color: #64748b;
        }

        body.light-mode .project-actions {
          border-top-color: rgba(148, 163, 184, 0.2);
        }

        body.light-mode .action-btn.secondary {
          background: rgba(148, 163, 184, 0.1);
          border-color: rgba(148, 163, 184, 0.22);
          color: #475569;
        }

        body.light-mode .action-btn.secondary:hover {
          background: rgba(148, 163, 184, 0.2);
          color: #0f172a;
        }

        body.light-mode .empty-state { color: #64748b; }

        /* =========================================
           RESPONSIVE
           ========================================= */
        @media (max-width: 768px) {
          .projects-section { padding: 80px 0 90px; }
          .section-header { margin-bottom: 48px; }
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-top: 40px;
          }
          .project-image-wrap { height: 200px; }
        }

        @media (max-width: 480px) {
          .projects-container { padding: 0 18px; }
          .project-body { padding: 20px 18px; }
          .filter-tab { padding: 8px 14px; font-size: 0.78rem; }
          .filter-count { font-size: 0.64rem; }
          .project-actions { flex-direction: column; }
          .action-btn { width: 100%; }
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

      <section className="projects-section" id="projects">
        <div className="projects-container">
          {/* Header */}
          <div className="section-header">
            <span className="section-eyebrow">
              <span className="dot" />
              Portfolio Showcase
            </span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              A selection of real-world applications I've designed and built —
              from concept to deployment
            </p>
            <div className="accent-line" />

            {/* Filter Tabs */}
            <div className="filter-tabs">
              {filters.map((f) => (
                <button
                  key={f.key}
                  className={`filter-tab ${activeFilter === f.key ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f.key)}
                  aria-pressed={activeFilter === f.key}
                >
                  {f.label}
                  <span className="filter-count">{f.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="projects-grid">
            {filteredProjects.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FaFolderOpen />
                </div>
                <p>No projects in this category yet. Stay tuned!</p>
              </div>
            ) : (
              filteredProjects.map((data, index) => (
                <ProjectCard key={data.id} data={data} index={index} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};