import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaLaptopCode, FaChalkboardTeacher } from 'react-icons/fa';

export const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: "Computer Science Teacher",
      organisation: "Merit Academy High School",
      startDate: "Sep, 2025",
      endDate: "Present",
      location: "Bhagwangola, Murshidabad, West Bengal",
      experiences: [
        "Teaching computer science fundamentals to high school students including programming basics, algorithms, and computer applications",
        "Developing comprehensive lesson plans and curriculum for grades 9-12",
        "Mentoring students in coding competitions and technology projects",
        "Integrating modern teaching methodologies with hands-on practical sessions"
      ],
      icon: <FaChalkboardTeacher />,
      color: "#3b82f6"
    },
    {
      id: 2,
      role: "Freelance Web Developer",
      organisation: "Self-Employed",
      startDate: "Mar, 2023",
      endDate: "Present",
      location: "Remote",
      experiences: [
        "Developing responsive and modern websites for clients across various industries",
        "Building full-stack applications using React, Node.js, and modern frameworks",
        "Collaborating with clients to understand requirements and deliver customized solutions",
        "Implementing SEO best practices and performance optimization techniques"
      ],
      icon: <FaLaptopCode />,
      color: "#10b981"
    },
    {
      id: 3,
      role: "Teacher & Incharge",
      organisation: "Care Academy Computer & Skill Training Centre",
      startDate: "Jan, 2025",
      endDate: "Present",
      location: "Bhagwangola, Murshidabad",
      experiences: [
        "Designing and delivering engaging computer training programs for students of all proficiency levels, fostering strong digital literacy and practical IT skills.",
        "Providing academic and career counseling to students, guiding them in selecting appropriate learning paths and preparing for future opportunities.",
        "Overseeing daily institutional operations, including academic scheduling, student admissions, and administrative management to ensure smooth and effective center functioning."
      ],
      icon: <FaChalkboardTeacher />,
      color: "#f59e0b"
    },
    {
      id: 4,
      role: "AI-Enhanced Development Specialist",
      organisation: "Self-Driven Innovation",
      startDate: "Jan, 2024",
      endDate: "Present",
      location: "Remote",
      experiences: [
        "Using AI in a very effective and professional way, applying it across diverse domains with creativity and precision.",
        "Leveraging AI tools like ChatGPT, Midjourney & GitHub Copilot to accelerate coding, automate tasks, and ideate smarter solutions.",
        "Seamlessly integrating AI-powered workflows to enhance productivity and enrich web applications with intelligent features.",
        "Commitment to continuous learning, applying AI to solve complex problems and elevate software quality."
      ],
      icon: <FaLaptopCode />,
      color: "#8b5cf6"
    }
  ];

  return (
    <>
      <style jsx>{`
        .experience-section {
          padding: 100px 0;
         // background: #f8fafc;
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 16px;
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .experience-timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        .experience-timeline::before {
          content: '';
          position: absolute;
          left: 30px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6, #10b981, #f59e0b);
          border-radius: 2px;
        }

        .experience-item {
          display: flex;
          margin-bottom: 60px;
          position: relative;
        }

        .timeline-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
          margin-right: 40px;
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .experience-content {
          flex: 1;
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #113558ff;
          transition: all 0.3s ease;
        }

        .experience-content:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }

        .role-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .role-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .organisation {
          font-size: 1.2rem;
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 10px;
        }

        .experience-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          color: #6b7280;
          background: #cee7ddff;
          padding: 8px 16px;
          border-radius: 20px;
        }

        .experience-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .experience-list li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 12px;
          line-height: 1.6;
          color: #000000ff;
        }

        .experience-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--item-color);
        }

        .date-badge {
          background: var(--item-color);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        @media (max-width: 768px) {
          .experience-section {
            padding: 60px 0;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .experience-timeline::before {
            left: 25px;
          }
          
          .timeline-icon {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            margin-right: 30px;
          }
          
          .experience-content {
            padding: 30px 25px;
          }
          
          .role-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .experience-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.8rem;
          }
          
          .experience-content {
            padding: 25px 20px;
          }
          
          .timeline-icon {
            width: 45px;
            height: 45px;
            margin-right: 25px;
          }
        }
      `}</style>

      <section className="experience-section" id="experience">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Professional Experience</h2>
            <p className="section-subtitle">
              My journey through teaching, development, and continuous learning in the tech industry
            </p>
          </div>

          <div className="experience-timeline">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="experience-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
              >
                <div 
                  className="timeline-icon"
                  style={{ 
                    background: exp.color,
                    '--item-color': exp.color
                  }}
                >
                  {exp.icon}
                </div>
                
                <div className="experience-content">
                  <div className="role-header">
                    <div>
                      <h3 className="role-title">{exp.role}</h3>
                      <div className="organisation">{exp.organisation}</div>
                    </div>
                    <div className="date-badge">
                      <FaCalendarAlt />
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  
                  <div className="experience-meta">
                    <div className="meta-item">
                      <FaMapMarkerAlt />
                      {exp.location}
                    </div>
                  </div>
                  
                  <ul className="experience-list">
                    {exp.experiences.map((experience, idx) => (
                      <li key={idx}>{experience}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};