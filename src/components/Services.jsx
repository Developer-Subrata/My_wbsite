import React, { useMemo, useState, useRef } from 'react';
import {
  FaGlobe,
  FaLandmark,
  FaBuilding,
  FaLaptopCode,
  FaTools,
  FaVideo,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaWhatsapp,
  FaPhoneAlt,
} from 'react-icons/fa';

/* ============================================================
   SERVICE DATA
   ============================================================ */
const SERVICES = [
  // ---------- ONLINE DIGITAL ----------
  {
    id: 1,
    category: 'digital',
    icon: <FaGlobe />,
    color: '#22d3ee',
    title: 'Aadhaar & PAN Services',
    description:
      'Aadhaar card updates, corrections, PAN card application, and linking services — processed quickly with complete guidance.',
    features: ['Aadhaar update', 'PAN application', 'Aadhaar-PAN linking'],
    //price: 'From ₹50',
    popular: true,
  },
  {
    id: 2,
    category: 'digital',
    icon: <FaGlobe />,
    color: '#22d3ee',
    title: 'Voter ID & e-Shram',
    description:
      'New voter registration, corrections, and e-Shram card registration for unorganized sector workers.',
    features: ['Voter registration', 'e-Shram card', 'Address update'],
    //price: 'From ₹30',
  },
  {
    id: 3,
    category: 'digital',
    icon: <FaGlobe />,
    color: '#22d3ee',
    title: 'Online Form Filling',
    description:
      'Government & private online application forms, exam registrations, scholarship forms, and portal submissions.',
    features: ['Exam forms', 'Scholarships', 'Job applications'],
    //price: 'From ₹50',
  },
  {
    id: 4,
    category: 'digital',
    icon: <FaGlobe />,
    color: '#22d3ee',
    title: 'Print, Scan & Email',
    description:
      'Document printing, scanning, PDF creation, email sending — all handled at competitive rates.',
    features: ['Color/B&W prints', 'Document scan', 'Email dispatch'],
    //price: 'From ₹5',
  },

  // ---------- GOVT SERVICES ----------
  {
    id: 5,
    category: 'govt',
    icon: <FaLandmark />,
    color: '#f59e0b',
    title: 'Certificate Applications',
    description:
      'Income, caste, residence, and domicile certificates — submitted and tracked end-to-end.',
    features: ['Income certificate', 'Caste certificate', 'Domicile'],
    //price: 'From ₹100',
    popular: true,
  },
  {
    id: 6,
    category: 'govt',
    icon: <FaLandmark />,
    color: '#f59e0b',
    title: 'Land & Property Records',
    description:
      'Land records, mutation applications, property registration assistance with expert handling.',
    features: ['Land records', 'Mutation', 'Property tax'],
    //price: 'From ₹150',
  },
  {
    id: 7,
    category: 'govt',
    icon: <FaLandmark />,
    color: '#f59e0b',
    title: 'Pension & Scheme Enrollment',
    description:
      'Old-age pension, widow pension, farmer schemes, and other welfare program enrollments.',
    features: ['Pension schemes', 'Farmer schemes', 'Welfare plans'],
    //price: 'From ₹80',
  },
  {
    id: 8,
    category: 'govt',
    icon: <FaLandmark />,
    color: '#f59e0b',
    title: 'Driving License & RC',
    description:
      'Learner\'s license, DL renewal, RC transfer, and RTO-related services.',
    features: ['Learner\'s license', 'DL renewal', 'RC transfer'],
    //price: 'From ₹200',
  },

  // ---------- NON-GOVT ----------
  {
    id: 9,
    category: 'nongovt',
    icon: <FaBuilding />,
    color: '#ec4899',
    title: 'Private Portal Assistance',
    description:
      'Private job applications, insurance portals, bank forms, and other corporate submissions.',
    features: ['Job portals', 'Insurance forms', 'Bank submissions'],
    //price: 'From ₹60',
  },
  {
    id: 10,
    category: 'nongovt',
    icon: <FaBuilding />,
    color: '#ec4899',
    title: 'Resume & Bio-Data Design',
    description:
      'Professional resume creation, bio-data formatting, and cover letter writing — polished for modern recruiters.',
    features: ['Resume design', 'Bio-data', 'Cover letter'],
    //price: 'From ₹150',
    popular: true,
  },
  {
    id: 11,
    category: 'nongovt',
    icon: <FaBuilding />,
    color: '#ec4899',
    title: 'Photo & Signature Editing',
    description:
      'Passport-size photos, signature cropping, background removal, and passport-photo compliance edits.',
    features: ['Photo editing', 'Signature crop', 'Background removal'],
    //price: 'From ₹20',
  },

  // ---------- SOFTWARE ----------
  {
    id: 12,
    category: 'software',
    icon: <FaLaptopCode />,
    color: '#8b5cf6',
    title: 'Website Development',
    description:
      'Business websites, portfolios, landing pages — responsive, fast, and SEO-optimized built with modern frameworks.',
    features: ['Business sites', 'Landing pages', 'Portfolio sites'],
    //price: 'Custom Quote',
    popular: true,
  },
  {
    id: 13,
    category: 'software',
    icon: <FaLaptopCode />,
    color: '#8b5cf6',
    title: 'Web Application Development',
    description:
      'Full-stack MERN applications, dashboards, admin panels — from concept to deployment.',
    features: ['MERN stack', 'Dashboards', 'Deployment'],
    //price: 'Custom Quote',
  },
  {
    id: 14,
    category: 'software',
    icon: <FaLaptopCode />,
    color: '#8b5cf6',
    title: 'Software Installation',
    description:
      'Windows/Linux installation, MS Office, antivirus, and essential software setup with licensing guidance.',
    features: ['Windows/Linux', 'MS Office', 'Antivirus'],
    //price: 'From ₹100',
  },
  {
    id: 15,
    category: 'software',
    icon: <FaLaptopCode />,
    color: '#8b5cf6',
    title: 'Data Recovery & Backup',
    description:
      'File recovery, system backup setup, cloud sync configuration — protecting your important data.',
    features: ['File recovery', 'Backup setup', 'Cloud sync'],
    //price: 'From ₹200',
  },

  // ---------- HARDWARE ----------
  {
    id: 16,
    category: 'hardware',
    icon: <FaTools />,
    color: '#10b981',
    title: 'Computer & Laptop Repair',
    description:
      'Diagnosis, repair, and servicing for desktop computers and laptops — hardware and software issues both.',
    features: ['Diagnosis', 'Repair', 'Servicing'],
    //price: 'From ₹200',
    popular: true,
  },
  {
    id: 17,
    category: 'hardware',
    icon: <FaTools />,
    color: '#10b981',
    title: 'Hardware Upgrades',
    description:
      'RAM, SSD, HDD upgrades, GPU installation, and thermal paste replacement for peak performance.',
    features: ['RAM/SSD upgrade', 'GPU install', 'Thermal paste'],
    //price: 'From ₹150',
  },
  {
    id: 18,
    category: 'hardware',
    icon: <FaTools />,
    color: '#10b981',
    title: 'Custom PC Builds',
    description:
      'Custom-configured PCs for gaming, editing, or business use — parts sourced and assembled professionally.',
    features: ['Gaming PCs', 'Editing rigs', 'Business builds'],
    //price: 'Custom Quote',
  },
  {
    id: 19,
    category: 'hardware',
    icon: <FaTools />,
    color: '#10b981',
    title: 'Printer & Peripheral Setup',
    description:
      'Printer installation, network sharing, scanner setup, and peripheral configuration.',
    features: ['Printer setup', 'Network share', 'Scanner'],
    //price: 'From ₹100',
  },

  // ---------- CCTV ----------
  {
    id: 20,
    category: 'cctv',
    icon: <FaVideo />,
    color: '#ef4444',
    title: 'CCTV Installation',
    description:
      'Professional CCTV camera installation for homes, shops, and offices — wired and wireless solutions.',
    features: ['Home setup', 'Shop setup', 'Office setup'],
    //price: 'From ₹1,500',
    popular: true,
  },
  {
    id: 21,
    category: 'cctv',
    icon: <FaVideo />,
    color: '#ef4444',
    title: 'DVR/NVR Configuration',
    description:
      'DVR/NVR setup, remote viewing configuration, and mobile app integration for CCTV systems.',
    features: ['DVR/NVR setup', 'Remote view', 'Mobile app'],
    //price: 'From ₹500',
  },
  {
    id: 22,
    category: 'cctv',
    icon: <FaVideo />,
    color: '#ef4444',
    title: 'CCTV Maintenance',
    description:
      'Regular maintenance, cleaning, storage upgrades, and troubleshooting for existing CCTV systems.',
    features: ['Cleaning', 'Storage upgrade', 'Troubleshooting'],
    //price: 'From ₹300',
  },
  {
    id: 23,
    category: 'cctv',
    icon: <FaVideo />,
    color: '#ef4444',
    title: 'Security Consultation',
    description:
      'On-site consultation for optimal camera placement, coverage planning, and security system design.',
    features: ['Site survey', 'Camera placement', 'Coverage plan'],
    //price: 'Free Consultation',
  },
];

/* ============================================================
   CATEGORY METADATA
   ============================================================ */
const CATEGORY_META = {
  digital: { label: 'Online Digital', icon: <FaGlobe />, color: '#22d3ee' },
  govt: { label: 'Govt Services', icon: <FaLandmark />, color: '#f59e0b' },
  nongovt: { label: 'Non-Govt', icon: <FaBuilding />, color: '#ec4899' },
  software: { label: 'Software', icon: <FaLaptopCode />, color: '#8b5cf6' },
  hardware: { label: 'Hardware', icon: <FaTools />, color: '#10b981' },
  cctv: { label: 'CCTV & Security', icon: <FaVideo />, color: '#ef4444' },
};

/* ============================================================
   SERVICE CARD
   ============================================================ */
const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <article
      ref={cardRef}
      className="service-card"
      style={{
        '--service-color': service.color,
        '--delay': `${index * 60}ms`,
      }}
      onMouseMove={handleMouseMove}
    >
      <span className="card-shine" aria-hidden="true" />

      {service.popular && (
        <span className="popular-badge">
          <FaStar />
          Popular
        </span>
      )}

      <div className="service-icon-wrap">
        <span className="icon-halo" aria-hidden="true" />
        <span className="service-icon">{service.icon}</span>
      </div>

      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">{service.description}</p>

      <ul className="service-features">
        {service.features.map((f) => (
          <li key={f}>
            <FaCheckCircle />
            {f}
          </li>
        ))}
      </ul>

      <div className="service-footer">
        <span className="service-price">{service.price}</span>
        <a
          href="#contact"
          className="service-cta"
          aria-label={`Enquire about ${service.title}`}
        >
          Enquire
          <FaArrowRight />
        </a>
      </div>
    </article>
  );
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = useMemo(
    () => [
      {
        key: 'all',
        label: 'All Services',
        icon: <FaStar />,
        color: '#818cf8',
        count: SERVICES.length,
      },
      ...Object.entries(CATEGORY_META).map(([key, meta]) => ({
        key,
        ...meta,
        count: SERVICES.filter((s) => s.category === key).length,
      })),
    ],
    []
  );

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <>
      <style jsx global>{`
        /* =========================================
           SECTION SHELL
           ========================================= */
        .services-section {
          padding: 110px 0 120px;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #1a0b3a 0%, #0f172a 45%, #020617 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        body.light-mode .services-section {
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #fdf4ff 0%, #f8fafc 45%, #ffffff 100%);
        }

        .services-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(236, 72, 153, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236, 72, 153, 0.05) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 78%);
          pointer-events: none;
        }

        body.light-mode .services-section::before {
          background-image:
            linear-gradient(rgba(236, 72, 153, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236, 72, 153, 0.08) 1px, transparent 1px);
        }

        .services-section::after {
          content: '';
          position: absolute;
          width: 620px;
          height: 620px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.15), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.12), transparent 60%);
          top: -260px;
          right: -220px;
          filter: blur(90px);
          pointer-events: none;
          animation: servicesAurora 16s ease-in-out infinite alternate;
        }

        body.light-mode .services-section::after { opacity: 0.4; }

        @keyframes servicesAurora {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-40px, 40px) scale(1.1); }
          100% { transform: translate(30px, -20px) scale(0.94); }
        }

        /* =========================================
           CONTAINER
           ========================================= */
        .services-container {
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
          margin-bottom: 60px;
          animation: servicesFadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        @keyframes servicesFadeUp {
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
          animation: servicesPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes servicesPing {
          0% { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(2.2); opacity: 0; }
        }

        .section-title {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800;
          line-height: 1.12;
          margin: 0 0 18px 0;
          background: linear-gradient(135deg, #ffffff 0%, #f9a8d4 55%, #c4b5fd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-size: clamp(1rem, 1.8vw, 1.12rem);
          color: #94a3b8;
          max-width: 660px;
          margin: 0 auto;
          line-height: 1.75;
        }

        .section-header .accent-line {
          width: 72px;
          height: 4px;
          margin: 24px auto 0;
          border-radius: 999px;
          background: linear-gradient(90deg, #ec4899, #8b5cf6, #22d3ee);
          box-shadow: 0 0 24px rgba(236, 72, 153, 0.6);
        }

        /* =========================================
           QUICK CONTACT STRIP
           ========================================= */
        .quick-contact {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 36px;
        }

        .quick-contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 11px 20px;
          border-radius: 12px;
          font-size: 0.86rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1px solid transparent;
        }

        .quick-contact-btn.whatsapp {
          background: rgba(37, 211, 102, 0.12);
          color: #4ade80;
          border-color: rgba(37, 211, 102, 0.35);
        }

        .quick-contact-btn.whatsapp:hover {
          background: rgba(37, 211, 102, 0.22);
          border-color: rgba(37, 211, 102, 0.5);
          transform: translateY(-2px);
        }

        .quick-contact-btn.call {
          background: rgba(59, 130, 246, 0.12);
          color: #60a5fa;
          border-color: rgba(59, 130, 246, 0.35);
        }

        .quick-contact-btn.call:hover {
          background: rgba(59, 130, 246, 0.22);
          border-color: rgba(59, 130, 246, 0.5);
          transform: translateY(-2px);
        }

        .quick-contact-btn svg { font-size: 0.92rem; }

        /* =========================================
           FILTER TABS
           ========================================= */
        .filter-tabs {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 48px;
        }

        .filter-tab {
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: inherit;
        }

        .filter-tab:hover {
          background: rgba(148, 163, 184, 0.12);
          border-color: rgba(148, 163, 184, 0.3);
          transform: translateY(-2px);
          color: #f1f5f9;
        }

        .filter-tab:focus-visible {
          outline: 2px solid var(--cat-color);
          outline-offset: 3px;
        }

        .filter-tab.active {
          background: color-mix(in srgb, var(--cat-color) 15%, transparent);
          border-color: color-mix(in srgb, var(--cat-color) 50%, transparent);
          color: #ffffff;
          box-shadow:
            0 6px 20px -6px color-mix(in srgb, var(--cat-color) 55%, transparent),
            0 0 0 1px color-mix(in srgb, var(--cat-color) 20%, transparent) inset;
        }

        .filter-tab svg { font-size: 0.85rem; }

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

        .filter-tab.active .tab-count {
          background: color-mix(in srgb, var(--cat-color) 30%, transparent);
          color: #ffffff;
        }

        /* =========================================
           SERVICES GRID
           ========================================= */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 22px;
          margin-top: 48px;
        }

        /* =========================================
           SERVICE CARD
           ========================================= */
        .service-card {
          --mx: 50%;
          --my: 50%;
          position: relative;
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.92));
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 22px;
          padding: 26px 24px 22px;
          border: 1px solid rgba(148, 163, 184, 0.12);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition:
            transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            border-color 0.4s ease,
            box-shadow 0.4s ease;
          animation: serviceCardIn 0.6s var(--delay) cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        @keyframes serviceCardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .service-card:hover {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--service-color) 45%, transparent);
          box-shadow:
            0 24px 55px -16px rgba(0, 0, 0, 0.6),
            0 0 0 1px color-mix(in srgb, var(--service-color) 20%, transparent) inset,
            0 0 40px -12px color-mix(in srgb, var(--service-color) 40%, transparent);
        }

        .card-shine {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            400px circle at var(--mx) var(--my),
            color-mix(in srgb, var(--service-color) 12%, transparent),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .service-card:hover .card-shine { opacity: 1; }

        /* Popular badge */
        .popular-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          background: linear-gradient(135deg, #f59e0b, #ec4899);
          color: #ffffff;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          border-radius: 999px;
          box-shadow:
            0 6px 16px -4px rgba(236, 72, 153, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.15) inset;
          z-index: 3;
        }

        .popular-badge svg {
          font-size: 0.6rem;
          animation: starPulse 2s ease-in-out infinite;
        }

        @keyframes starPulse {
          0%, 100% { transform: rotate(0) scale(1); }
          50%      { transform: rotate(18deg) scale(1.15); }
        }

        /* Icon */
        .service-icon-wrap {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          background: color-mix(in srgb, var(--service-color) 15%, transparent);
          border: 1px solid color-mix(in srgb, var(--service-color) 30%, transparent);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 1;
        }

        .icon-halo {
          position: absolute;
          inset: -8px;
          border-radius: 22px;
          background: radial-gradient(circle, var(--service-color), transparent 70%);
          opacity: 0;
          filter: blur(14px);
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .service-card:hover .icon-halo { opacity: 0.4; }

        .service-card:hover .service-icon-wrap {
          transform: scale(1.08) rotate(-6deg);
        }

        .service-icon {
          font-size: 1.5rem;
          color: var(--service-color);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-card:hover .service-icon {
          transform: scale(1.1);
        }

        /* Title + description */
        .service-title {
          font-size: 1.12rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 10px 0;
          line-height: 1.35;
          letter-spacing: -0.01em;
          position: relative;
          z-index: 1;
          transition: color 0.25s ease;
        }

        .service-card:hover .service-title {
          color: var(--service-color);
        }

        .service-description {
          font-size: 0.87rem;
          line-height: 1.65;
          color: #94a3b8;
          margin: 0 0 16px 0;
          position: relative;
          z-index: 1;
        }

        /* Features */
        .service-features {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin: 0 0 20px 0;
          padding: 14px 0 0 0;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .service-features li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: #cbd5e1;
          line-height: 1.5;
        }

        .service-features svg {
          font-size: 0.7rem;
          color: var(--service-color);
          flex-shrink: 0;
        }

        /* Footer */
        .service-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          position: relative;
          z-index: 1;
        }

        .service-price {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--service-color);
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
          letter-spacing: -0.01em;
        }

        .service-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          background: color-mix(in srgb, var(--service-color) 15%, transparent);
          border: 1px solid color-mix(in srgb, var(--service-color) 35%, transparent);
          color: var(--service-color);
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-cta:hover {
          background: var(--service-color);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -6px var(--service-color);
        }

        .service-cta:focus-visible {
          outline: 2px solid var(--service-color);
          outline-offset: 2px;
        }

        .service-cta svg {
          font-size: 0.68rem;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-cta:hover svg {
          transform: translateX(3px);
        }

        /* =========================================
           LIGHT MODE
           ========================================= */
        body.light-mode .section-title {
          background: linear-gradient(135deg, #0f172a 0%, #db2777 55%, #7c3aed 100%);
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

        body.light-mode .tab-count {
          background: rgba(148, 163, 184, 0.2);
          color: #64748b;
        }

        body.light-mode .filter-tab.active .tab-count {
          background: color-mix(in srgb, var(--cat-color) 25%, white);
          color: #0f172a;
        }

        body.light-mode .service-card {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(148, 163, 184, 0.22);
          box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.06);
        }

        body.light-mode .service-card:hover {
          box-shadow:
            0 24px 55px -16px rgba(0, 0, 0, 0.15),
            0 0 0 1px color-mix(in srgb, var(--service-color) 25%, transparent) inset;
        }

        body.light-mode .card-shine {
          background: radial-gradient(
            400px circle at var(--mx) var(--my),
            color-mix(in srgb, var(--service-color) 8%, transparent),
            transparent 60%
          );
        }

        body.light-mode .service-title { color: #0f172a; }
        body.light-mode .service-description { color: #64748b; }
        body.light-mode .service-features { border-top-color: rgba(148, 163, 184, 0.22); }
        body.light-mode .service-features li { color: #475569; }
        body.light-mode .service-footer { border-top-color: rgba(148, 163, 184, 0.22); }

        /* =========================================
           RESPONSIVE
           ========================================= */
        @media (max-width: 768px) {
          .services-section { padding: 80px 0 90px; }
          .section-header { margin-bottom: 48px; }
          .services-grid {
            grid-template-columns: 1fr;
            gap: 18px;
            margin-top: 40px;
          }
          .service-card { padding: 22px 20px 20px; }
        }

        @media (max-width: 480px) {
          .services-container { padding: 0 18px; }
          .filter-tab { padding: 8px 13px; font-size: 0.78rem; gap: 6px; }
          .tab-count { font-size: 0.62rem; padding: 1px 5px; }
          .quick-contact-btn { padding: 10px 16px; font-size: 0.8rem; }
          .service-footer { flex-direction: column; align-items: stretch; gap: 10px; }
          .service-cta { justify-content: center; }
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

      <section className="services-section" id="services">
        <div className="services-container">
          {/* Header */}
          <div className="section-header">
            <span className="section-eyebrow">
              <span className="dot" />
              What I Offer
            </span>
            <h2 className="section-title">Services I Provide</h2>
            <p className="section-subtitle">
              From online digital services to software, hardware, and CCTV installation —
              a complete one-stop solution for all your digital and technical needs.
            </p>
            <div className="accent-line" />

            {/* Quick contact */}
            <div className="quick-contact">
              <a
                href="https://wa.me/918436879653"
                target="_blank"
                rel="noopener noreferrer"
                className="quick-contact-btn whatsapp"
              >
                <FaWhatsapp />
                WhatsApp Us
              </a>
              <a href="tel:+919999999999" className="quick-contact-btn call">
                <FaPhoneAlt />
                Call Now
              </a>
            </div>

            {/* Filter tabs */}
            <div className="filter-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`filter-tab ${activeCategory === cat.key ? 'active' : ''}`}
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

          {/* Grid */}
          <div className="services-grid">
            {filteredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};