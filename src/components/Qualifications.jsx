import React from 'react';
import { FaSchool, FaGraduationCap, FaTools, FaUniversity, FaAward, FaCalendarAlt } from 'react-icons/fa';

export const Qualifications = () => {
  const qualifications = [
    {
      icon: <FaSchool />,
      title: "Madhyamik Examination",
      institution: "WBBSE",
      year: "2020",
      description: "Passed with excellent academic record",
      color: "#ff6b6b"
    },
    {
      icon: <FaGraduationCap />,
      title: "Higher Secondary Examination",
      institution: "WBSCTVESD",
      year: "2022",
      description: "Completed with focus on science and technology",
      color: "#4ecdc4"
    },
    {
      icon: <FaTools />,
      title: "ITI Electronics Mechanic (NSQF)",
      institution: "NCVT",
      year: "2023",
      description: "Specialized in electronics and practical mechanics",
      color: "#45b7d1"
    },
    {
      icon: <FaUniversity />,
      title: "Bachelor of Computer Application (BCA)",
      institution: "Maulana Abul Kalam Azad University of Technology",
      year: "2025",
      description: "Graduating with comprehensive computer science education",
      color: "#96ceb4"
    },
    {
      icon: <FaUniversity />,
      title: "Master of Computer Application (BCA)",
      institution: "Swami Vivekananda University",
      year: "Pursuing",
      description: "Mastering with comprehensive computer science education",
      color: "#96ceb4"
    }
  ];

  return (
    <>
      <style jsx>{`
        .qualifications-section {
          padding: 100px 0;
         // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .qualifications-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(45deg, #ffffff, #e0e0e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          text-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .qualifications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .qualification-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px 30px;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .qualification-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--card-color), transparent);
          transition: all 0.3s ease;
        }

        .qualification-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .qualification-card:hover::before {
          height: 6px;
        }

        .icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          font-size: 2rem;
          color: white;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .qualification-card:hover .icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .qualification-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 15px;
          line-height: 1.3;
        }

        .institution {
          font-size: 1.1rem;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 10px;
        }

        .year {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .description {
          color: #718096;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 50px auto 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-50%);
        }

        @media (max-width: 768px) {
          .qualifications-section {
            padding: 60px 0;
          }
          
          .section-title {
            font-size: 2.5rem;
          }
          
          .qualifications-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .qualification-card {
            padding: 30px 20px;
          }
          
          .timeline::before {
            left: 30px;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 2rem;
          }
          
          .qualification-card {
            padding: 25px 15px;
          }
        }
      `}</style>

      <section className="qualifications-section" id="qualifications">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Educational Journey</h2>
            <p className="section-subtitle">
              A timeline of my academic achievements and professional qualifications
            </p>
          </div>

          <div className="qualifications-grid">
            {qualifications.map((qual, index) => (
              <div
                key={index}
                className="qualification-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
                style={{ '--card-color': qual.color }}
              >
                <div 
                  className="icon-wrapper"
                  style={{ background: qual.color }}
                >
                  {qual.icon}
                </div>
                
                <h3 className="qualification-title">{qual.title}</h3>
                
                <div className="institution">{qual.institution}</div>
                
                <div className="year">
                  <FaCalendarAlt />
                  {qual.year}
                </div>
                
                <p className="description">{qual.description}</p>
              </div>
            ))}
          </div>

          <div className="timeline" data-aos="fade-up" data-aos-duration="1200">
            {/* Timeline visualization can be added here */}
          </div>
        </div>
      </section>
    </>
  );
};