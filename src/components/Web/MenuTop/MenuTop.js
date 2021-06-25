import React, { useState, useEffect } from 'react';
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { getMenuApi } from "../../../api/menu";
import SocialLinks from "../SocialLinks";
import Logo from "../../../assets/img/png/logo-ivan.png";

import "./MenuTop.scss";
export default function MenuTop(props) {
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    getMenuApi().then(response => {
      const arrayMenu = [];
      response.menu.forEach(element => {
        element.active && arrayMenu.push(element);
      });
      setMenuData(arrayMenu)
    });
  }, []);
  console.log(menuData);
  return(
    <Menu className="menu-top-web" mode="horizontal">
      <Menu.Item className="menu-top-web__logo">
        <Link to={"/"}>
          <img src={Logo} alt="logo"/>
        </Link>
      </Menu.Item>
      {menuData.map(element => {
        const external = element.url.indexOf("http")  > -1 ? true : false;
        if(external){
          return(
            <Menu.Item className="menu-top-web__item" key={element._id}>
              <a href={element.url} target="_blank" rel="noreferrer">{element.title}</a>
          </Menu.Item>
          );
        }
        return(
          <Menu.Item className="menu-top-web__item" key={element._id}>
            <Link to={element.url}>{element.title}</Link>
        </Menu.Item>
        );
      })}
      <div>
        <SocialLinks />
      </div>
    </Menu>
  );
};
