import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";

export const Contact = () => {
  return (
    <>
      <div className="container contact" id="contact" data-aos="flip-down"
         data-aos-duration="1000">
        <h1><br/><br/><br/><br/>CONTACT ME:</h1>
        <div className="contact-icon">
            <a href='https://www.facebook.com/Prince.Of.Mahakal/' className="items">
              <FaFacebook className='icons'/>
            </a>
            <a href='https://www.instagram.com/s_u_b_rat_a?igsh=OGVqZWRwcml6dWFn' className="items">
              <FaInstagramSquare className='icons'/>
            </a>
            <a href='https://www.linkedin.com/in/subrata-mandal-5155812a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' className="items">
              <FaLinkedin className='icons'/>
            </a>
            <a href='https://github.com/Developer-Subrata' className="items">
              <FaGithub className='icons'/>
            </a>
            <a href='#NotAvailableAtTheMoment.....' className="items">
              <FaTwitter className='icons'/>
            </a>
            <a href='mailto:subrata.ind2@gmail.com' className="items">
              <MdAttachEmail className='icons'/>
            </a>
          </div>
        </div>
    </>
  )
}
