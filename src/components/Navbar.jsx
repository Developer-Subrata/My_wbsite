import React, { useState, useEffect } from 'react';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    navbar: {
      width: '100%',
      padding: '1rem 2rem',
      background: '#121212',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 999,
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#ffc107',
      cursor: 'pointer',
    },
    links: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center',
    },
    link: {
      textDecoration: 'none',
      color: '#fff',
      fontWeight: '500',
      fontSize: '1rem',
      transition: 'color 0.3s ease',
    },
    hamburger: {
      display: windowWidth <= 768 ? 'flex' : 'none',
      flexDirection: 'column',
      cursor: 'pointer',
    },
    bar: {
      height: '3px',
      width: '25px',
      backgroundColor: '#ffc107',
      margin: '4px 0',
      borderRadius: '2px',
    },
    mobileMenu: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: '60px',
      right: '20px',
      backgroundColor: '#121212',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
    },
    mobileLink: {
      color: '#fff',
      textDecoration: 'none',
      padding: '0.5rem 0',
      fontWeight: '500',
    },
  };

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className="navbar"
      style={styles.navbar}
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <div className="logo" style={styles.logo}>
        Portfolio
      </div>

      {windowWidth > 768 && (
        <div style={styles.links}>
          <a href="#home" style={styles.link}>Home</a>
          <a href="#qualifications" style={styles.link}>Qualifications</a>
          <a href="#experience" style={styles.link}>Experience</a>
          <a href="#skills" style={styles.link}>Skills</a>
          <a href="#projects" style={styles.link}>Projects</a>
          <a href="#contact" style={styles.link}>Contact</a>
        </div>
      )}

      {/* Hamburger menu */}
      <div className="hamburger" style={styles.hamburger} onClick={handleToggle}>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
      </div>

      {menuOpen && windowWidth <= 768 && (
        <div className="mobileMenu" style={styles.mobileMenu}>
          <a href="#home" style={styles.mobileLink} onClick={handleToggle}>Home</a>
          <a href="#qualifications" style={styles.mobileLink} onClick={handleToggle}>Qualifications</a>
          <a href="#experience" style={styles.mobileLink} onClick={handleToggle}>Experience</a>
          <a href="#skills" style={styles.mobileLink} onClick={handleToggle}>Skills</a>
          <a href="#projects" style={styles.mobileLink} onClick={handleToggle}>Projects</a>
          <a href="#contact" style={styles.mobileLink} onClick={handleToggle}>Contact</a>
        </div>
      )}
    </div>
  );
};
