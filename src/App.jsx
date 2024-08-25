import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import { Qualifications } from './components/Qualifications'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Project } from './components/Project'
import { Contact } from './components/Contact'
import Aos from 'aos'
import "aos/dist/aos.css"


const App =()=> {
  useEffect(()=>{
    Aos.init();
  },[])
  return (
      <>
        <Navbar/>
          <div className="container">
            <Home/>
            <Qualifications/>
            {/* <Experience/> */}
            <Skills/>
            <Project/>
            <Contact/>
          </div>
      </>
  )
}

export default App
