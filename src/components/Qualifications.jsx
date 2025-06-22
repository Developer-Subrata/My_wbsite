import React from 'react';
import { FaSchool, FaGraduationCap, FaTools, FaUniversity } from 'react-icons/fa'; // Icons from react-icons

export const Qualifications = () => {
  return (
    <>
      <div className="container qualifications" id="qualifications">
        <div className="left" data-aos="fade-up-right" data-aos-duration="1000">
          <h1>
            <br/><br/><br/>
            Qualifications:<br/><br/>

            <div className='table' data-aos="zoom-in" data-aos-duration="3000">
              <FaSchool style={{ marginRight: '10px', color: '#ffd700' }} />
              I have Passed Out Madhyamik Examination From WBBSE In The Year 2020
            </div>

            <div className='table' data-aos="zoom-in" data-aos-duration="1000">
              <FaGraduationCap style={{ marginRight: '10px', color: '#9ae66e' }} />
              I have Passed Out Higher Examination From WBSCTVESD In The Year 2022
            </div>

            <div className='table' data-aos="zoom-in" data-aos-duration="3000">
              <FaTools style={{ marginRight: '10px', color: '#00ffff' }} />
              I have Completed ITI ELECTRONICS MECHANIC(NSQF) From NCVT In The Year 2023
            </div>

            <div className='table' data-aos="zoom-in" data-aos-duration="1000">
              <FaUniversity style={{ marginRight: '10px', color: '#ff7f50' }} />
              Completed Graduation from Maulana Abul Kalam Azad University of Technology 
              (MAKAUT) University on the department of Bachelor Of Computer Application (BCA), In The Year 2025
            </div>

          </h1>
        </div>
      </div>
    </>
  );
};
