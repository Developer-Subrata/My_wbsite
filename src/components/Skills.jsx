import React from 'react'
import skills from './data/skills.json'

export const Skills = () => {
  return (
    <>
      <div className="container skills" id="skills">
        <h1 data-aos="flip-left"
         data-aos-duration="1000"><br/><br/>SKILLS:</h1>
        <div className="items">
          {skills.map((data) => (
            <>
              <div className="item" key={data.id}  data-aos="flip-left"
         data-aos-duration="1000">
                <img src={`/public/${data.imageSrc}`} alt="" srcset="" />
                <h3>{data.title}</h3>
              </div>
            </>
          ))}
        </div >
      </div>
    </>
  );
}
