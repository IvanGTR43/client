import React, { useState, useEffect } from 'react';
import { notification, Spin } from "antd";
import { getCoursesApi } from "../../api/courses";
import CoursesList from "../../components/Admin/Courses/CoursesList";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [reloadCourses, setReloadCourses] = useState(false);
  console.log(courses);
  useEffect(() => {
    getCoursesApi().then( ( result ) => {
      if(result?.code !== 200){
        notification["warning"]({
          message: result.message,
          placement: "bottomRight"
        })
      }else{
        //setCourses(result.courses);
        setReloadCourses(false);
      }
    }).catch(err => {
      notification["error"]({
        message: "Error del Servidor",
        placement: "bottomRight"
      })
    })
  }, [reloadCourses])
  return (
    <div className="courses">
      <h1>Administar Cursos</h1>
        { !courses ? (<Spin tip="Cargando Cursos" />) : (
          <CoursesList courses={courses} setReloadCourses={setReloadCourses}/>
        )}
    </div>
  )
}
