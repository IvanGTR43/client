import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Spin } from "antd";
import { getProjectsApi } from "../../../api/project";
import "./ProjectCard.scss";
export default function ProjectCard(props) {
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    getProjectsApi(99, 1).then(response => {
      if(response?.code === 200){
        setProjects(response.projects.docs);
      }else{
        console.log(response.message);
      }
    });
  }, []);
  if(!projects){
    return(
      <Spin style={{width: "100%"}}/>
    );
  }
  return (
    <div className="project-card">
      {projects.map((element, index) => (
        <CardProject element={element} key={index}/>
      ))}
    </div>
  )
}
function CardProject(props){
  const { element } = props;
  console.log(element);
  return(
    <Card title={element.title} key={element._id}>
      <p>{element.description}</p>
      <a href={element.link} target="_blank" rel="noreferrer">DESCARGAR</a>
  </Card>
  );
}
