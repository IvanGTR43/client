//layouts
import LayoutAdmin  from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

//admins
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";

//pages
import Home from "../pages/Home";
import Contact from "../pages/Contact"

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
            }
        ]
    }
];
export default routes;