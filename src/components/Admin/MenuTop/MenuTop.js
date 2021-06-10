import React from 'react';
import { Button } from "antd";
import {MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined } from "@ant-design/icons";
import { logOut } from "../../../api/auth";
import "./MenuTop.scss"
import LogoIvan from "../../../assets/img/png/logo-ivan.png"
export default function MenuTop({menuCollapsed, setMenuCollapsed}) {

    const logOutUser = () => {
        logOut();
        window.location.reload();
    }
    return(
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo"
                    src={LogoIvan} alt="Ivan Gabriel Tacuapan Reyes"
                />
                <Button type="link"
                    onClick={()=> setMenuCollapsed(!menuCollapsed)}>
                        {menuCollapsed ? <MenuUnfoldOutlined /> :<MenuFoldOutlined/> }
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={logOutUser}>
                    <PoweroffOutlined/>
                </Button>
            </div>
        </div>
    );
};
