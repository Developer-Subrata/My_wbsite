import React from 'react';
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";

export const Contact = () => {
  const iconWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '3rem 0',
    gap: '20px',
  };

  const itemStyle = {
    margin: '0 15px',
    height: '65px',
    width: '65px',
    borderRadius: '50%',
    border: '2.5px solid var(--contact-border)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: 'var(--contact-bg)',
    fontWeight: 700,
    fontSize: '28px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
  };

  return (
    <>
      <div className="container contact" id="contact" data-aos="flip-down" data-aos-duration="1000">
        <h1><br /><br /><br /><br />CONTACT ME:</h1>
        <div style={iconWrapperStyle}>
          <a href='https://www.facebook.com/Prince.Of.Mahakal/' style={itemStyle}>
            <FaFacebook style={{ color: '#1877f2' }} />
          </a>
          <a href='https://www.instagram.com/s_u_b__r__a__t__a/?__pwa=1#' style={itemStyle}>
            <FaInstagramSquare style={{ color: '#E1306C' }} />
          </a>
          <a href='https://www.linkedin.com/in/subrata-mandal-5155812a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' style={itemStyle}>
            <FaLinkedin style={{ color: '#0A66C2' }} />
          </a>
          <a href='https://github.com/Developer-Subrata' style={itemStyle}>
            <FaGithub style={{ color: '#FFFFFF' }} />
          </a>
          <a href='#NotAvailableAtTheMoment.....' style={itemStyle}>
            <FaTwitter style={{ color: '#1DA1F2' }} />
          </a>
          <a href='mailto:subrata.ind2@gmail.com' style={itemStyle}>
            <MdAttachEmail style={{ color: '#D93025' }} />
          </a>
        </div>
      </div>
    </>
  );
};
