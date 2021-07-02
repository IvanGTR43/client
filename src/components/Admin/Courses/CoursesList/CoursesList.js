import React, { useState, useEffect } from 'react';
import { List, Button, Modal as ModalCL, notification } from "antd";
import {  } from "@ant-design/icons";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import { getCourseDataUdemyApi } from "../../../../api/courses";


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
          <Course course={course}/>
        )
      })
    });
    setListCourses(listCoursesArray)
  }, [courses]);
  const onSort = (sortedList, dropEvent) => {
    console.log(sortedList);
  }
  return (
    <div className="courses-list">
      <div className="courses-list__header">
        <Button
          type="primary" onClick={()=> console.log("click")}>Nuevo Curso</Button>
      </div>
      <div className="courses-list__items">
        {listCourses.length === 0 && (
          <h2 style={{textAlign: "center"}}>No tienes Cursos Agregados</h2>
        )}
        <DragSortableList items={listCourses} onSort={onSort} type="vertical" />
          
      </div>
    </div>
  )
}
function Course(props){
  const { course } = props;
  return(
    <h1>Hola MUnod</h1>
  );
}