import React from 'react';
import { Button, List, Modal as ModalConfirm, notification } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";
import { deleteProjectApi } from "../../../../api/project";

export default function ProjectList(props) {
  const { projects, setReloadProjects, editProject } = props;
  const { confirm } = ModalConfirm;

  const deleteProject= (project) => {
  // console.log(projects);
    confirm({
      title: "ELiminar Post",
      okText: "ELiminar",
      okType: "danger",
      cancelText: "Cancelar",
      content: `Estas Seguro que quieres Eliminar el Proytecto ${project.title} ?`,
      onOk(){
        const token = getAccessTokenApi();
        deleteProjectApi(token, project._id).then(response => {
          if(response?.code !== 200){
            notification["warning"]({
              message: response.message,
              placement: "bottomRight"
            });
          }else{
            notification["success"]({
              message: response.message,
              placement: "bottomRight"
            });
            setReloadProjects(true);
          }
        })
      }
    });
  }
  return (
    <List
      dataSource={projects.docs}
      renderItem={(project)=> (<Project project={project} deleteProject={deleteProject} editProject={editProject}/>)}>
    </List>
  )
}

function Project(props){
  const { project, deleteProject, editProject } = props;
  return(
    <List.Item
      key={project._id}
      title={project.link}
      actions={[
        <Button type="primary" onClick={()=> editProject(project)}>
          <EditFilled />
        </Button>,
        <Button type="danger" onClick={()=> deleteProject(project)}>
          <DeleteFilled />
        </Button>
      ]}>
        <List.Item.Meta title={project.title}/>
    </List.Item>
  );
}