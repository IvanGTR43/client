import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Spin } from "antd"
import { getProjectsApi } from "../../../api/project";
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
      {projects.forEach(element => (
      <CardProject element={element}/>
      ))}
    </div>
  )
}
function CardProject(props){
  const { element } = props;
  console.log(element);
  return(
    <Col md={8}>
      <Card title={element.title}>
        {element.descrpition}
        <Button onClick={element.link}>Descargar</Button>
    </Card>
    </Col>
    
  );
}
