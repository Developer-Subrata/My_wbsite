import React from 'react'
import project from './data/projects.json'

export const Project = () => {
  return (
    <>
      <div className="container projects my-3" id="projects">
        <h1  data-aos="flip-left"
         data-aos-duration="1000"><br/><br/>PROJECTS: </h1>
        <div className="row d-flex justify-content-center align-content-center">
          {project.map((data) => (
            <>
              <div key={data.id} className="my-3 col-sm-6 col-md-4 col-lg-3 mx-3"  data-aos="flip-down"
         data-aos-duration="1000">
                <div className="card bg-dark text-light"
                  style={{
                    width: '18rem',
                    border: "4px solid green",
                    borderRadius: "5px",
                    boxShadow:"2px 2px 10px 5px rgba(23, 160, 255)"
                  }}
                >
                  <div className='img d-flex justify-content-center align-content-center'>
                    <img src={data.imageSrc} className="card-img-top" alt="..." 
                      style={{
                        width:"250px",
                        height:"170px",
                        padding:"10px",
                      }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.description}</p>
                    <a href="#"/*{data.demo}*/ className="btn btn-primary mx-3">Demo</a>
                    <a href={data.source} className="btn btn-warning">Code</a>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  )
}
