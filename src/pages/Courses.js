import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, notification } from "antd";
import PresentationCourses from "../components/Web/Courses/PresentationCourses";
import CoursesList from "../components/Web/Courses/CoursesList";
import { getCoursesApi } from "../api/courses";
export default function Projects() {
  const [courses, setCourses] = useState(null);
  console.log(courses);
  useEffect(() => {
    getCoursesApi().then(response => {
      if(response?.code!== 200){
        notification["warning"]({
          message: response.message,
          placement: "bottomRight"
        });
      }else{
        setCourses(response.courses)
      }
    }).catch(err => {
      notification["error"]({
        message: err,
        placement: "bottomRight"
      })
    })
  }, []);
  return (
    <Row>
      <Col md={4} />
      <Col md={16}>
      <PresentationCourses/>
      {!courses ? (
          <Spin tip="Cargando Cursos" style={{textAlign: "center", padding: "20px", width: "100%"}}/>
        ) : (
          <CoursesList courses={courses}/>
      )}
      </Col>
      <Col md={4} />
    </Row>
  )
}
