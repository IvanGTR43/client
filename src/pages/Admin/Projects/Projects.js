import React, { useState, useEffect } from 'react';
import { Button, notification, Spin } from "antd";
import {} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import queryString from 'query-string';
import { getProjectsApi } from "../../../api/project";
import Modal from "../../../components/Modal";
import ProjectList from "../../../components/Admin/Project/ProjectList";
import AddProjectForm from "../../../components/Admin/Project/AddProjectForm";
import Pagination from '../../../components/Pagination';
import "./Projects.scss";
function Projects(props){
  const { location, history } = props;
  const [projects, setProjects] = useState({});
  const [modalTitle, setModalTitle] = useState("");
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [reloadProjects, setReloadProjects] = useState(false);
  const { page=1 } =queryString.parse(location.search);
//console.log(projects);
useEffect(()=> {
  getProjectsApi(5, page).then(response => {
    if(response?.code === 200){
      setProjects(response.projects)
    }else{
      notification["warning"]({
        message: response.message,
        placement: "bottomRight"
      })
    }
  });
  setReloadProjects(false);
}, [reloadProjects, page]);

  const addProject = () =>{
    setIsVisibleModal(true);
    setModalTitle("Agregar Proyecto");
    setModalContent(
      <AddProjectForm setIsVisibleModal={setIsVisibleModal} setReloadProjects={setReloadProjects}/>
    );
  }
  const editProject = project => {
    setIsVisibleModal(true);
    setModalTitle("Editar Proyecto");
    setModalContent(
      <AddProjectForm project={project} setIsVisibleModal={setIsVisibleModal} setReloadProjects={setReloadProjects}/>)
  }
  if(!projects){
    return <Spin style={{width: "100%", textAlign: "center"}}/>
  }
  return (
    <div className="projects">
      <Button type="primary" onClick={addProject} className="projects__btn-add">Agregar Proyecto</Button>
      <ProjectList
        projects={projects}
        setReloadProjects={setReloadProjects}
        editProject={editProject}
      />
      <Pagination
        location={location}
        history={history}
        posts={projects}/>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
        children={modalContent}/>
    </div>
  )
}
export default withRouter(Projects);