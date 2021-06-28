import React from 'react';
import Logo from "../../../../assets/img/png/logo-ivan.png";
import SocialLinks from "../../SocialLinks";
import "./myInfo.scss";

export default function MyInfo() {
  return (
    <div className="my-info">
      <img src={Logo} alt="Ivan Gabriel Tacuapan Reyes" />
      <h4>Desarrollo Web y Movil</h4>
      <SocialLinks />
    </div>
  )
}
