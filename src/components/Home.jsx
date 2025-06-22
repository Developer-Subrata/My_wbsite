import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import pdf from '../pdf/resume.pdf';

export const Home = () => {
  const typedRef = useRef(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const options = {
      strings: [
        "Welcome To My Profile...",
        "I'm Subrata Mandal.",
        "A Passionate MERN Stack Developer.",
        "Crafting Full-Stack Web Experiences.",
        "Let's Build Something Awesome Together!"
      ],
      typeSpeed: 60,
      backSpeed: 30,
      loop: true
    };

    const typed = new Typed(typedRef.current, options);
    return () => typed.destroy();
  }, []);

  // Toggle Theme by updating body class
  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  return (
    <>
      {/* Toggle Switch */}
      <div className="theme-toggle-container">
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider" />
        </label>
        <span className="mode-label">{darkMode ? 'Dark Mode 🌙' : 'Light Mode ☀️'}</span>
      </div>

      {/* Intro Paragraph Section */}
      <div className="intro-container">
        <p className="intro-text mt-3">
          I'm <strong>Subrata Mandal</strong>, a dedicated and energetic <strong>MERN Stack Developer</strong> who loves turning complex problems into clean, efficient code.
          With hands-on experience in <strong>MongoDB, Express.js, React.js, and Node.js</strong>, I build scalable full-stack applications that deliver real value.
          Whether you're looking to launch a startup idea or optimize an existing platform, I'm here to help you bring it to life — one line of code at a time.
        </p>
      </div>

      {/* Home Section */}
      <div className="container home" id="home">
        <div className="right">
          <div className="img" data-aos="fade-up-left" data-aos-duration="1000">
            <img src="/Photo.jpg" alt="Profile" />
          </div>
        </div>

        <div className="left" data-aos="fade-up-right" data-aos-duration="1000">
          <h1 ref={typedRef}></h1>
          <a href={pdf} download="Resume.pdf" className="btn btn-outline-warning my-3">
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
};
