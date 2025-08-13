import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import AddFood from "../pages/Food/AddFood";
import AvailableFoods from "../pages/Food/avaliableFood";
import FoodDetails from "../components/FoodDetails";
import ManageFood from "../pages/Food/ManageFood";
import RequestedMyFood from "../pages/Food/RequestedMyFood";
import PrivateRouter from "./PrivateRouter";
import Error from "../pages/Error/Error";

const router = createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {   
                index:true,
                path:"/",
                Component:Home

            },
            {
                path:'/addFood',
                // Component:AddFood
                element:<PrivateRouter><AddFood></AddFood></PrivateRouter>
            },
            {
                path:'/availableFoods',
                Component:AvailableFoods
            },
            {
                path:'/foodDetails/:id',
                // Component:FoodDetails,  
                element:<PrivateRouter><FoodDetails></FoodDetails></PrivateRouter>
            },
            {
                path:'/manageMyFoods',
                // Component:ManageFood
               element:<PrivateRouter><ManageFood></ManageFood></PrivateRouter>
            },
            {
                path:'/requestedMyFood',
                // Component:RequestedMyFood
                element:<PrivateRouter><RequestedMyFood></RequestedMyFood></PrivateRouter>
            }
        ]
    },
     {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "/auth/register",
                Component: Register

            },
            {
                path: "/auth/login",
                Component: Login
            }
        ]
    },
    {
        path:"*",
        Component:Error
    }

])

 export default router