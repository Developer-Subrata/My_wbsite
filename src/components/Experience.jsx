import React from 'react'
import experience from './data/experience.json'

export const Experience = () => {
  return (
    <>
      <div className="container ex" id="experience">
        <h1  data-aos="flip-left"
         data-aos-duration="1000">EXPERIENCE:</h1>
        {
          experience.map((data)=>{
            return(
              <>
                <div key={data.id} className='ex-items text-center my-5'  
                data-aos="zoom-in" data-aos-duration="1000">
                  <div className='left'>
                    <img src={`/public/${data.imageSrc}`} alt="" srcset="" />
                  </div>
                  <div className='right'>
                    <h2><span style={{color: 'yellow'}}>{data.role}</span></h2>
                    <h4>{data.startDate} {data.endDate} {data.location}</h4>
                    <h5>{data.experiences[0]}</h5>
                    <h5>{data.experiences[1]}</h5>
                  </div>
                </div>
              </>)
          })
        }
      </div>
    </>
  )
}
