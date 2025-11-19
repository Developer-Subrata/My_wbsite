import React from 'react';
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";

export const Contact = () => {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, var(--contact-bg) 0%, #1a1a2e 50%, #16213e 100%)',
    padding: '2rem 1rem',
    position: 'relative',
    overflow: 'hidden',
  };

  const titleStyle = {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 800,
    background: 'linear-gradient(45deg, #ffffff, #a8b9ff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '3rem',
    textAlign: 'center',
    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
    position: 'relative',
  };

  const iconWrapperStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '2rem',
    maxWidth: '800px',
    width: '100%',
    padding: '2rem',
  };

  const itemStyle = {
    height: '80px',
    width: '80px',
    borderRadius: '20px',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    fontSize: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  };

  const hoverEffect = {
    transform: 'translateY(-8px) scale(1.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
  };

  const iconStyle = {
    transition: 'transform 0.3s ease, filter 0.3s ease',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = hoverEffect.transform;
    e.currentTarget.style.backgroundColor = hoverEffect.backgroundColor;
    e.currentTarget.style.borderColor = hoverEffect.borderColor;
    e.currentTarget.style.boxShadow = hoverEffect.boxShadow;
    e.currentTarget.querySelector('svg').style.transform = 'scale(1.2)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.backgroundColor = itemStyle.backgroundColor;
    e.currentTarget.style.borderColor = itemStyle.borderColor;
    e.currentTarget.style.boxShadow = itemStyle.boxShadow;
    e.currentTarget.querySelector('svg').style.transform = 'scale(1)';
  };

  const socialLinks = [
    { href: 'https://www.facebook.com/Prince.Of.Mahakal/', icon: <FaFacebook />, color: '#1877f2' },
    { href: 'https://www.instagram.com/s_u_b__r__a__t__a/?__pwa=1#', icon: <FaInstagramSquare />, color: '#E1306C' },
    { href: 'https://www.linkedin.com/in/subrata-mandal-5155812a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: <FaLinkedin />, color: '#0A66C2' },
    { href: 'https://github.com/Developer-Subrata', icon: <FaGithub />, color: '#FFFFFF' },
    { href: '#NotAvailableAtTheMoment.....', icon: <FaTwitter />, color: '#1DA1F2' },
    { href: 'mailto:subrata.ind2@gmail.com', icon: <MdAttachEmail />, color: '#D93025' }
  ];

  return (
    <>
      <div className="container contact" id="contact" data-aos="flip-down" data-aos-duration="1000" style={containerStyle}>
        <h1 style={titleStyle}>GET IN TOUCH</h1>
        
        <div style={iconWrapperStyle}>
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              style={itemStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Connect via ${social.icon.type.name}`}
            >
              <div style={{ ...iconStyle, color: social.color }}>
                {social.icon}
              </div>
            </a>
          ))}
        </div>

        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '1.1rem',
          fontWeight: 300,
          letterSpacing: '0.5px'
        }}>
          <p>Let's create something amazing together</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
            Feel free to reach out through any platform
          </p>
        </div>
      </div>
    </>
  );
};