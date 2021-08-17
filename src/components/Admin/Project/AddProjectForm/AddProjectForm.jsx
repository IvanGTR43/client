import React, { useState, useEffect } from 'react';
import { Form, Button, Input, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import { addProjectApi, updateProjectApi } from "../../../../api/project";
import "./AddProjectForm.scss";
export default function AddProjectForm(props) {
  const { project, setIsVisibleModal, setReloadProjects } = props;
  const [projectData, setProjectData] = useState({});
  useEffect(() => {
    project ? setProjectData(project) : setProjectData({});
  }, [project]);
  const processProject = () => {
    //console.log(projectData);
    const { title, link, description } = projectData;
    if(!title || !link || !description){
      notification["warning"]({
        message: "Todos los Campos son Obligatorios",
        placement: "bottomRight"
      });
    }else{
      if(!project){
        addProject(projectData)
      }else{
        editProject(project._id, projectData);
      }
      //setProjectData({});
      }
    }

    const addProject = (projectData) => {
      const token = getAccessTokenApi();
      addProjectApi(token, projectData).then(response => {
        if(response?.code !== 200){
          notification["warning"]({
            message: response.message,
            placement: "bottomRight"
          })
        }else{
          notification["success"]({
            message: response.message,
            placement: "bottomRight"
          });
          setIsVisibleModal(false);
          setReloadProjects(true);
          setProjectData({});
        }
      }).catch((err)=> {
        console.log(err);
        notification["error"]({
          message: "NO jala XD",
          placement: "bottomRight"
        })
      })
    }
    const editProject = (id, project) => {
      const token = getAccessTokenApi();
      updateProjectApi(token, id, project).then(response => {
        if(response?.code !== 200){
          notification["warning"]({
            message: response.message,
            placement: "bottomRight"
          })
        }else{
          notification["success"]({
            message: response.message,
            placement: "bottomRight"
          });
          setIsVisibleModal(false);
          setReloadProjects(true);
          setProjectData({});
        }
      }).catch(()=>{
        notification["error"]({
          message: "No jalo",
          placement: "bottomRight"
        })
      })
    }
  return (
    <Form onFinish={processProject} className="add-project-form">
      <Form.Item>
        <Input
          placeholder="Titulo"
          value={projectData.title}
          onChange={(e)=> setProjectData({...projectData, title: e.target.value})}
          type="text" />
      </Form.Item>
      <Form.Item>
        <Input
        placeholder="Link"
        value={projectData.link}
        onChange={(e)=> setProjectData({...projectData, link: e.target.value})}
          type="text" />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Descripción"
          value={projectData.description}
          onChange={(e)=> setProjectData({...projectData, description: e.target.value})}
          type="text" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {!project ? "Agregar": "Actualizar"}
        </Button>
      </Form.Item>
    </Form>
  )
}
