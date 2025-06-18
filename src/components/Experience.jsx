import React from 'react';
import experience from './data/experience.json';

export const Experience = () => {
  const containerStyle = {
    maxWidth: '1100px',
    margin: '4rem auto',
    padding: '0 1.5rem',
    fontFamily: `'Segoe UI', sans-serif`,
    color: '#ffffff',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '3rem',
    marginBottom: '3rem',
    fontWeight: 'bold',
    textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };

  const itemStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2.5rem',
    padding: '2rem',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1.5px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(12px)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const itemHoverStyle = {
    ...itemStyle,
    transform: 'scale(1.03)',
    boxShadow: '0 10px 40px rgba(154, 230, 110, 0.4)',
  };

  const leftStyle = {
    flex: '1',
    minWidth: '120px',
    textAlign: 'center',
  };

  const imageStyle = {
    width: '110px',
    height: '110px',
    objectFit: 'contain',
    borderRadius: '50%',
    border: '3px solid #9ae66e',
    boxShadow: '0 0 20px #9ae66e',
  };

  const rightStyle = {
    flex: '3',
    paddingLeft: '2rem',
    minWidth: '250px',
  };

  const roleStyle = {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#ffde59',
    marginBottom: '0.5rem',
  };

  const detailStyle = {
    fontSize: '1rem',
    marginBottom: '0.5rem',
    color: '#ccc',
  };

  const experienceTextStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#f0f0f0',
  };

  return (
    <div style={containerStyle} id="experience">
      <h1 style={headingStyle} data-aos="flip-left" data-aos-duration="1000">EXPERIENCE:</h1>
      {experience.map((data, idx) => (
        <div
          key={data.id}
          style={itemStyle}
          onMouseEnter={e => Object.assign(e.currentTarget.style, itemHoverStyle)}
          onMouseLeave={e => Object.assign(e.currentTarget.style, itemStyle)}
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <div style={leftStyle}>
            <img src={`/${data.imageSrc}`} alt={data.organisation} style={imageStyle} />
          </div>
          <div style={rightStyle}>
            <h2 style={roleStyle}>{data.role}</h2>
            <h4 style={detailStyle}>{data.startDate} - {data.endDate} | {data.location}</h4>
            {data.experiences.map((exp, index) => (
              <p style={experienceTextStyle} key={index}>• {exp}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
