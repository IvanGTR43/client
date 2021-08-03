import React from 'react';
import  AcademyLogo from "../../../../assets/img/png/academy-logo.png";
import "./PresentationCourses.scss"
export default function PresentationCourses() {
  return (
    <div className="presentation-courses">
      <img src={AcademyLogo} alt="logo-academy"/>
      <p>Pagina de Cursos que he tomado para poder obtener los conocimimento de programación y haci poder
        laborar en uba empresa
      </p>
      <p>Echale Un Vistazo!!!</p>
    </div>
  )
}
