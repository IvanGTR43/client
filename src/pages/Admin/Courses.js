import React, { useState, useEffect } from 'react';
import { notification } from "antd";
import { getCoursesApi } from "../../api/courses";
import CoursesList from "../../components/Admin/Courses/CoursesList";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [reloadCourses, setReloadCourses] = useState(false);
  //console.log(courses);
  useEffect(() => {
    getCoursesApi().then( ( result ) => {
      setCourses(result.courses);
      setReloadCourses(false);
    })
  }, [reloadCourses])
  return (
    <div className="courses">
      <h1>Administar Cursos</h1>
      <CoursesList courses={courses} setReloadCourses={setReloadCourses}/>
    </div>
  )
}
