//layouts
import LayoutAdmin  from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

//admins
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
import AdminCourses from "../pages/Admin/Courses";

//pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import Courses from "../pages/Courses";

//others
import Error404 from "../pages/Error404"
const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes:[
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact:  true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact: true
            },
            {
                path: "/admin/menu-web",
                component: AdminMenuWeb,
                exact: true
            },
            {
                path: "/admin/courses",
                component: AdminCourses,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes:[
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                path:"/projects",
                component: Projects,
                exact: true
            },
            {
                path: "/courses",
                component: Courses,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
];
export default routes;