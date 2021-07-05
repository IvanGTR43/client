import React, { useState, useEffect } from 'react';
import { List, Button, Modal as ModalCL, notification } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import DragSortableList from "react-drag-sortable";
import AddEditCourseForm from "../AddEditCourseForm";
import Modal from "../../../Modal";
import { getCourseDataUdemyApi, deleteCourseApi } from "../../../../api/courses";
import { getAccessTokenApi } from "../../../../api/auth";


import "./CoursesList.scss";
const { confirm } = ModalCL;
export default function CoursesList(props) {
  const {courses, setReloadCourses} = props;
  const [listCourses, setListCourses] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listCoursesArray = [];
    courses.forEach((course)=>{
      listCoursesArray.push({
        content: (
          <Course course={course} deleteCourse={deleteCourse} addCourseModal={addCourseModal}/>
        )
      })
    });
    setListCourses(listCoursesArray)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);
  const onSort = (sortedList, dropEvent) => {
    console.log(sortedList);
  }
  const addCourseModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Crear nuevo Curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
      />
    );
  }
  const deleteCourse = (course) => {
    const token = getAccessTokenApi();
    confirm({
      title: "Eliminar Curso",
      content: `¿Estas seguro que quieres eliminar el curso ${course.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk(){
        deleteCourseApi(token, course._id).then(response => {
          const typeNotification = response.code === 200 ? "success" : "error";
          notification[typeNotification]({
            message: response.message
          });
          setReloadCourses(true);
        }).catch(() => {
          notification["error"]({
            message: "Error del Servidor, Intentelo mas tarde",
            placement: "bottomRight"
          });
        })
      }
    })

  }
  return (
    <div className="courses-list">
      <div className="courses-list__header">
        <Button
          type="primary" onClick={addCourseModal}>Nuevo Curso</Button>
      </div>
      <div className="courses-list__items">
        {listCourses.length === 0 && (
          <h2 style={{textAlign: "center"}}>No tienes Cursos Agregados</h2>
        )}
        <DragSortableList items={listCourses} onSort={onSort} type="vertical" />
          <Modal
            title={modalTitle}
            isVisible={isVisibleModal}
            setIsVisible={setIsVisibleModal}
            children={modalContent}/>
      </div>
    </div>
  )
}
function Course(props){
  const { course, deleteCourse } = props;
  const [coursesData, setCoursesData] = useState(null);
  useEffect(() => {
    getCourseDataUdemyApi(course.idCourse).then( (response) => {
      if(response.code !==200){
        notification["warning"]({
          message: `El curso con el ID: ${course.idCourse} no se ha encontrado`,
          placement: "bottomRight"
        })
      }
      setCoursesData(response.data);
    })
  }, [course]);
  if(!coursesData){
    return null;
  }
  return(
    <List.Item
      actions={[
        <Button
          type="primary"
          onClick={ () => console.log("Editar Item")}>
            <EditFilled />
        </Button>,
        <Button
          type="danger"
          onClick={() => deleteCourse(course)}>
          <DeleteFilled />
        </Button>
      ]}>
        <img
          src={coursesData.image_480x270}
          alt={coursesData.title}
          style={{width: "100px", marginRight: "20px"}}
        />
        <List.Item.Meta
          title={`${coursesData.title} | ID: ${course.idCourse}`}
          description={coursesData.headline}/>
    </List.Item>
  );
}