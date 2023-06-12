import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Dashboard/Dashboard";
import MangeUsers from "../Dashboard/Pages/MangeUsers";
import AddClass from "../Dashboard/Pages/AddClass";
import MyClasses from "../Dashboard/Pages/MyClasses";
import ManageClasses from "../Dashboard/Pages/ManageClasses";
import Classes from "../Pages/Classes/Classes";
import SelectedClass from "../Dashboard/Pages/SelectedClass";
import Pay from "../Dashboard/Payment/Pay";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/classes/approved",
        element: <Classes></Classes>,
      },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "users",
            element: <MangeUsers></MangeUsers>,
          },
          {
            path: "addclass",
            element: <AddClass></AddClass>,
          },
          {
            path: "myclass",
            element: <MyClasses></MyClasses>,
          },
          {
            path: "manageclass",
            element: <ManageClasses></ManageClasses>,
          },
          {
            path: "selectedclasses",
            element: <SelectedClass></SelectedClass>,
          },
          {
            path: "pay",
            element: <Pay></Pay>,
          },
        ],
      },
    ],
  },
]);
