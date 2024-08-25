import React, { useEffect, useRef } from 'react'
import pdf from '../pdf/resume.pdf'
import Typed from 'typed.js'
useEffect

export const Home = () => {
  const typedRef=useRef(null)
  useEffect(()=>{
    const options ={
      strings:["Welcome To My Profile...","I'm Subrata Mandal..."],
      typeSpeed:60,
      backSpeed:30,
      loop:true
    }
    const typed = new Typed(typedRef.current,options)
    return ()=>{
      typed.destroy()
    }
  },[])
  return (
    <>
      <div className="container home" id="home">
        <div className="left"  data-aos="fade-up-right"
         data-aos-duration="1000">

          <h1 ref={typedRef}>
            
          </h1>
      
          <a href={pdf} download='Resume.pdf' className='btn btn-outline-warning my-3'>Download</a>
        </div>
        <div className="right">
          <div className="img"  data-aos="fade-up-left"
         data-aos-duration="1000">
            <img src="/Photo.jpg" alt="" srcset="" />
          </div>
        </div>
      </div>
    </>
  )
}
