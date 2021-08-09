import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Menu, Layout } from "antd";
import { HomeOutlined, MenuOutlined, UserSwitchOutlined, BookFilled, MessageOutlined } from "@ant-design/icons"
import "./MenuSider.scss";

function MenuSider(props) {
    const { location, menuCollapsed } = props;
    const { Sider } = Layout;
    return(
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={location.pathname}>
                <Menu.Item key="/admin" >
                    <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/menu-web">
                    <Link to={"/admin/menu-web"}>
                        <MenuOutlined />
                        <span className="nav-text">Menú Web</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/users">
                    <Link to={"/admin/users"}>
                    <UserSwitchOutlined />
                    <span className="nav-text">Usuarios</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/courses">
                    <Link to={"/admin/courses"}>
                    <BookFilled />
                    <span className="nav-text">Cursos</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/blog">
                    <Link to={"/admin/blog"}>
                    <MessageOutlined />
                    <span className="nav-text">Blog</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
};
export default withRouter(MenuSider);