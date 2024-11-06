import { createBrowserRouter }  from "react-router-dom";

import Main from "../pages/main.jsx";
import Mall from "../pages/mall/index.jsx";
import User from "../pages/user/index.jsx";
import PageOne from "../pages/other/pageOne.jsx";
import PageTwo from "../pages/other/pageTwo.jsx";
import { Navigate } from "react-router-dom";
import HomeContent from "../pages/home/HomeContent.jsx";
import Home from "../pages/home/Home.jsx";
import { redirect } from "react-router-dom";


// 路由文件配置
const routers = [
    {
        path: '/',
        Component:Main,
        children:[
            //重定向
            {
                path: '/',
                element: <Navigate to="home" replace />,
            },
            {
                path: 'home',
                Component:Home,
                children: [
                     //重定向
                    {
                        path: '/home',
                        element: <Navigate to="/home/homeContent" replace />,
                    },
                    {
                        path: 'homeContent',
                        Component:HomeContent,        
                    },
                    {
                        path: 'mall',
                        Component:Mall,        
                    },
                    {
                        path: 'user',
                        Component:User,        
                    },
                    {
                        path: 'other',
                        children:[
                            {
                                path: 'pageone',
                                Component: PageOne
                            },
                            {
                                path: 'pagetwo',
                                Component: PageTwo
                            }
                        ]
                    }
                ]        
            },
        ]
    }
]
export default createBrowserRouter(routers)