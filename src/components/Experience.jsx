import React, { useEffect, useRef, useState } from 'react';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaBriefcase,
  FaArrowRight,
} from 'react-icons/fa';

// --- Experience Card with cursor shine ---
const ExperienceCard = ({ exp, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const isLive = exp.endDate === 'Present';

  return (
    <div
      className="experience-item"
      style={{ '--item-color': exp.color, '--delay': `${index * 100}ms` }}
    >
      <div className="timeline-node">
        <span className="node-ring" aria-hidden="true" />
        <div className="timeline-icon" style={{ background: exp.color }}>
          {exp.icon}
        </div>
      </div>

      <div
        ref={cardRef}
        className="experience-content"
        onMouseMove={handleMouseMove}
      >
        <span className="card-shine" aria-hidden="true" />

        <div className="role-header">
          <div className="role-main">
            <h3 className="role-title">{exp.role}</h3>
            <div className="organisation">
              <FaBriefcase />
              <span>{exp.organisation}</span>
            </div>
          </div>
          <div className={`date-badge ${isLive ? 'live' : ''}`}>
            {isLive && <span className="live-dot" />}
            <FaCalendarAlt />
            <span>
              {exp.startDate} — {exp.endDate}
            </span>
          </div>
        </div>

        <div className="experience-meta">
          <div className="meta-item">
            <FaMapMarkerAlt />
            {exp.location}
          </div>
          <div className="meta-item">
            <FaArrowRight />
            {exp.experiences.length} Key Contributions
          </div>
        </div>

        <ul className="experience-list">
          {exp.experiences.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Experience = () => {
  const timelineRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const experiences = [
    {
      id: 1,
      role: 'Computer Science Teacher',
      organisation: 'Merit Academy High School',
      startDate: 'Sep, 2025',
      endDate: 'Present',
      location: 'Bhagwangola, Murshidabad, West Bengal',
      experiences: [
        'Teaching computer science fundamentals to high school students including programming basics, algorithms, and computer applications',
        'Developing comprehensive lesson plans and curriculum for grades 9-12',
        'Mentoring students in coding competitions and technology projects',
        'Integrating modern teaching methodologies with hands-on practical sessions',
      ],
      icon: <FaChalkboardTeacher />,
      color: '#3b82f6',
    },
    {
      id: 2,
      role: 'Freelance Web Developer',
      organisation: 'Self-Employed',
      startDate: 'Mar, 2023',
      endDate: 'Present',
      location: 'Remote',
      experiences: [
        'Developing responsive and modern websites for clients across various industries',
        'Building full-stack applications using React, Node.js, and modern frameworks',
        'Collaborating with clients to understand requirements and deliver customized solutions',
        'Implementing SEO best practices and performance optimization techniques',
      ],
      icon: <FaLaptopCode />,
      color: '#10b981',
    },
    {
      id: 3,
      role: 'Teacher & Incharge',
      organisation: 'Care Academy Computer & Skill Training Centre',
      startDate: 'Jan, 2025',
      endDate: 'Present',
      location: 'Bhagwangola, Murshidabad',
      experiences: [
        'Designing and delivering engaging computer training programs for students of all proficiency levels, fostering strong digital literacy and practical IT skills.',
        'Providing academic and career counseling to students, guiding them in selecting appropriate learning paths and preparing for future opportunities.',
        'Overseeing daily institutional operations, including academic scheduling, student admissions, and administrative management to ensure smooth and effective center functioning.',
      ],
      icon: <FaChalkboardTeacher />,
      color: '#f59e0b',
    },
    {
      id: 4,
      role: 'AI-Enhanced Development Specialist',
      organisation: 'Self-Driven Innovation',
      startDate: 'Jan, 2024',
      endDate: 'Present',
      location: 'Remote',
      experiences: [
        'Using AI in a very effective and professional way, applying it across diverse domains with creativity and precision.',
        'Leveraging AI tools like ChatGPT, Midjourney & GitHub Copilot to accelerate coding, automate tasks, and ideate smarter solutions.',
        'Seamlessly integrating AI-powered workflows to enhance productivity and enrich web applications with intelligent features.',
        'Commitment to continuous learning, applying AI to solve complex problems and elevate software quality.',
      ],
      icon: <FaLaptopCode />,
      color: '#8b5cf6',
    },
  ];

  const ongoingCount = experiences.filter((e) => e.endDate === 'Present').length;

  // Scroll-linked timeline progress
  useEffect(() => {
    const onScroll = () => {
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.5;
      const scrolled = vh * 0.75 - rect.top;
      const pct = Math.max(0, Math.min(1, scrolled / total));
      setProgress(pct * 100);
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
    <>
      <style jsx global>{`
        /* =========================================
           DESIGN TOKENS
           ========================================= */
        :root {
          --exp-accent: #8b5cf6;
          --exp-ease: cubic-bezier(0.4, 0, 0.2, 1);
          --exp-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* =========================================
           SECTION SHELL
           ========================================= */
        .experience-section {
          padding: 110px 0 120px;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #1e1b4b 0%, #0f172a 45%, #020617 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        body.light-mode .experience-section {
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #f5f3ff 0%, #f8fafc 45%, #ffffff 100%);
        }

        /* Grid overlay */
        .experience-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(139, 92, 246, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.06) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 78%);
          pointer-events: none;
        }

        body.light-mode .experience-section::before {
          background-image:
            linear-gradient(rgba(139, 92, 246, 0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.09) 1px, transparent 1px);
        }

        /* Aurora orbs */
        .experience-section::after {
          content: '';
          position: absolute;
          width: 620px;
          height: 620px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.18), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.12), transparent 60%);
          bottom: -280px;
          left: -180px;
          filter: blur(90px);
          pointer-events: none;
          animation: expAurora 16s ease-in-out infinite alternate;
        }

        body.light-mode .experience-section::after { opacity: 0.5; }

        @keyframes expAurora {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(40px, -40px) scale(1.1); }
          100% { transform: translate(-30px, 20px) scale(0.94); }
        }

        /* =========================================
           CONTAINER
           ========================================= */
        .experience-container {
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
          margin-bottom: 72px;
          animation: expFadeUp 0.8s var(--exp-ease) both;
        }

        @keyframes expFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.28);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #a78bfa;
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
          background: #a78bfa;
          box-shadow: 0 0 12px #a78bfa;
        }

        .section-eyebrow .dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #a78bfa;
          opacity: 0.5;
          animation: expPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes expPing {
          0% { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(2.2); opacity: 0; }
        }

        .section-title {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800;
          line-height: 1.12;
          margin: 0 0 18px 0;
          background: linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #a5b4fc 100%);
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
          background: linear-gradient(90deg, #8b5cf6, #3b82f6, #10b981);
          box-shadow: 0 0 24px rgba(139, 92, 246, 0.6);
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
          transition: transform 0.3s var(--exp-spring), border-color 0.3s var(--exp-ease);
          min-width: 120px;
        }

        .stat-item:hover {
          transform: translateY(-3px);
          border-color: rgba(139, 92, 246, 0.4);
        }

        .stat-value {
          font-size: 1.85rem;
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
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
           TIMELINE
           ========================================= */
        .experience-timeline {
          position: relative;
          max-width: 1020px;
          margin: 0 auto;
          padding-left: 8px;
        }

        /* Base rail */
        .experience-timeline::before {
          content: '';
          position: absolute;
          left: 32px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(59, 130, 246, 0.25) 5%,
            rgba(16, 185, 129, 0.25) 35%,
            rgba(245, 158, 11, 0.25) 65%,
            rgba(139, 92, 246, 0.25) 95%,
            transparent
          );
          border-radius: 2px;
        }

        /* Animated fill */
        .timeline-progress {
          position: absolute;
          left: 32px;
          top: 0;
          width: 2px;
          height: var(--progress, 0%);
          background: linear-gradient(
            to bottom,
            #3b82f6,
            #10b981 40%,
            #f59e0b 70%,
            #8b5cf6 100%
          );
          border-radius: 2px;
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.7);
          transition: height 0.2s ease-out;
          z-index: 1;
        }

        /* Moving particle at fill head */
        .timeline-progress::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow:
            0 0 14px #a78bfa,
            0 0 30px rgba(167, 139, 250, 0.6);
          animation: expParticlePulse 2s ease-in-out infinite;
        }

        @keyframes expParticlePulse {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50%      { transform: translateX(-50%) scale(1.3); }
        }

        /* Item */
        .experience-item {
          display: flex;
          gap: 40px;
          margin-bottom: 44px;
          position: relative;
          animation: expFadeUp 0.8s var(--delay) var(--exp-ease) both;
        }

        .experience-item:last-child { margin-bottom: 0; }

        /* =========================================
           TIMELINE NODE
           ========================================= */
        .timeline-node {
          position: relative;
          flex-shrink: 0;
          width: 64px;
          display: flex;
          justify-content: center;
          z-index: 2;
        }

        .node-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 90px;
          height: 90px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, var(--item-color), transparent 70%);
          opacity: 0;
          filter: blur(12px);
          transition: opacity 0.5s var(--exp-ease);
        }

        .experience-item:hover .node-ring { opacity: 0.35; }

        .timeline-icon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #ffffff;
          position: relative;
          z-index: 2;
          box-shadow:
            0 12px 30px -8px var(--item-color),
            0 0 0 5px rgba(15, 23, 42, 0.95),
            0 0 0 6px rgba(148, 163, 184, 0.15);
          transition: transform 0.4s var(--exp-spring),
                      box-shadow 0.4s var(--exp-ease);
        }

        .experience-item:hover .timeline-icon {
          transform: scale(1.08) rotate(-6deg);
          box-shadow:
            0 16px 40px -8px var(--item-color),
            0 0 0 5px rgba(15, 23, 42, 0.95),
            0 0 0 6px var(--item-color);
        }

        /* =========================================
           CARD
           ========================================= */
        .experience-content {
          --mx: 50%;
          --my: 50%;
          flex: 1;
          min-width: 0;
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.92));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 22px;
          padding: 32px 32px 30px;
          border: 1px solid rgba(148, 163, 184, 0.12);
          position: relative;
          overflow: hidden;
          transition: transform 0.4s var(--exp-ease),
                      border-color 0.4s var(--exp-ease),
                      box-shadow 0.4s var(--exp-ease);
        }

        /* Colored left accent */
        .experience-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(to bottom, var(--item-color), transparent);
          opacity: 0.9;
        }

        /* Cursor shine */
        .card-shine {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            400px circle at var(--mx) var(--my),
            color-mix(in srgb, var(--item-color) 12%, transparent),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.4s var(--exp-ease);
          pointer-events: none;
        }

        .experience-item:hover .card-shine { opacity: 1; }

        .experience-item:hover .experience-content {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--item-color) 40%, transparent);
          box-shadow:
            0 24px 55px -16px rgba(0, 0, 0, 0.6),
            0 0 0 1px color-mix(in srgb, var(--item-color) 15%, transparent) inset;
        }

        /* =========================================
           CARD HEADER
           ========================================= */
        .role-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 18px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .role-main { min-width: 0; flex: 1; }

        .role-title {
          font-size: 1.32rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 8px 0;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        .organisation {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--item-color);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .organisation svg { font-size: 0.82rem; }

        /* Date badge */
        .date-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          white-space: nowrap;
          background: rgba(148, 163, 184, 0.1);
          color: #cbd5e1;
          border: 1px solid rgba(148, 163, 184, 0.2);
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
          letter-spacing: -0.01em;
        }

        .date-badge.live {
          background: rgba(16, 185, 129, 0.12);
          border-color: rgba(16, 185, 129, 0.35);
          color: #6ee7b7;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 10px #34d399;
          animation: expPing 1.8s ease-in-out infinite;
        }

        /* =========================================
           META ROW
           ========================================= */
        .experience-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #94a3b8;
          background: rgba(148, 163, 184, 0.06);
          border: 1px solid rgba(148, 163, 184, 0.14);
          padding: 7px 14px;
          border-radius: 999px;
          transition: all 0.3s var(--exp-ease);
        }

        .meta-item svg { opacity: 0.7; font-size: 0.78rem; }

        .experience-item:hover .meta-item {
          border-color: color-mix(in srgb, var(--item-color) 30%, transparent);
          color: #cbd5e1;
        }

        /* =========================================
           LIST
           ========================================= */
        .experience-list {
          list-style: none;
          padding: 20px 0 0 0;
          margin: 0;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          position: relative;
          z-index: 1;
        }

        .experience-list li {
          position: relative;
          padding-left: 26px;
          margin-bottom: 12px;
          line-height: 1.7;
          color: #cbd5e1;
          font-size: 0.92rem;
        }

        .experience-list li:last-child { margin-bottom: 0; }

        .experience-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--item-color);
          box-shadow:
            0 0 8px var(--item-color),
            0 0 0 3px color-mix(in srgb, var(--item-color) 15%, transparent);
          transition: transform 0.3s var(--exp-spring);
        }

        .experience-item:hover .experience-list li::before {
          transform: scale(1.2);
        }

        /* =========================================
           LIGHT MODE
           ========================================= */
        body.light-mode .section-title {
          background: linear-gradient(135deg, #0f172a 0%, #7c3aed 55%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        body.light-mode .section-subtitle { color: #64748b; }

        body.light-mode .stat-item {
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(148, 163, 184, 0.25);
          box-shadow: 0 4px 20px -6px rgba(0, 0, 0, 0.06);
        }

        body.light-mode .stat-value {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        body.light-mode .stat-label { color: #64748b; }

        body.light-mode .experience-content {
          background: rgba(255, 255, 255, 0.92);
          border-color: rgba(148, 163, 184, 0.22);
          box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.08);
        }

        body.light-mode .experience-item:hover .experience-content {
          box-shadow:
            0 24px 55px -16px rgba(0, 0, 0, 0.15),
            0 0 0 1px color-mix(in srgb, var(--item-color) 20%, transparent) inset;
        }

        body.light-mode .role-title { color: #0f172a; }
        body.light-mode .experience-list li { color: #475569; }
        body.light-mode .experience-list {
          border-top-color: rgba(148, 163, 184, 0.22);
        }

        body.light-mode .meta-item {
          color: #64748b;
          background: rgba(148, 163, 184, 0.1);
          border-color: rgba(148, 163, 184, 0.22);
        }

        body.light-mode .date-badge {
          background: rgba(148, 163, 184, 0.14);
          border-color: rgba(148, 163, 184, 0.28);
          color: #475569;
        }

        body.light-mode .date-badge.live {
          background: rgba(16, 185, 129, 0.12);
          border-color: rgba(16, 185, 129, 0.35);
          color: #059669;
        }

        body.light-mode .timeline-icon {
          box-shadow:
            0 12px 30px -8px var(--item-color),
            0 0 0 5px #f8fafc,
            0 0 0 6px rgba(148, 163, 184, 0.25);
        }

        body.light-mode .experience-item:hover .timeline-icon {
          box-shadow:
            0 16px 40px -8px var(--item-color),
            0 0 0 5px #f8fafc,
            0 0 0 6px var(--item-color);
        }

        /* =========================================
           RESPONSIVE
           ========================================= */
        @media (max-width: 768px) {
          .experience-section { padding: 80px 0 90px; }
          .section-header { margin-bottom: 52px; }
          .stats-bar { gap: 10px; margin-top: 32px; }
          .stat-item { padding: 12px 20px; min-width: 100px; }
          .stat-value { font-size: 1.5rem; }

          .experience-timeline::before,
          .timeline-progress {
            left: 24px;
          }

          .experience-item { gap: 24px; margin-bottom: 28px; }

          .timeline-node { width: 48px; }

          .timeline-icon {
            width: 48px;
            height: 48px;
            border-radius: 14px;
            font-size: 1.15rem;
          }

          .experience-content { padding: 24px 22px; }
          .role-title { font-size: 1.12rem; }
        }

        @media (max-width: 480px) {
          .experience-container { padding: 0 18px; }

          .experience-timeline::before,
          .timeline-progress { left: 20px; }

          .experience-item { gap: 16px; }

          .timeline-node { width: 40px; }

          .timeline-icon {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            font-size: 1rem;
          }

          .experience-content { padding: 20px 18px; }

          .role-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .date-badge { font-size: 0.72rem; }
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
          .timeline-progress { transition: none; }
        }
      `}</style>

      <section className="experience-section" id="experience">
        <div className="experience-container">
          {/* Header */}
          <div className="section-header">
            <span className="section-eyebrow">
              <span className="dot" />
              Career Timeline
            </span>
            <h2 className="section-title">Professional Experience</h2>
            <p className="section-subtitle">
              A journey through teaching, development, and continuous learning in the tech industry
            </p>
            <div className="accent-line" />

            <div className="stats-bar">
              <div className="stat-item">
                <span className="stat-value">{experiences.length}</span>
                <span className="stat-label">Roles</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{ongoingCount}</span>
                <span className="stat-label">Ongoing</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">2+</span>
                <span className="stat-label">Years Active</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="experience-timeline" ref={timelineRef}>
            {/* Scroll-linked progress fill */}
            <div
              className="timeline-progress"
              style={{ '--progress': `${progress}%` }}
              aria-hidden="true"
            />

            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};