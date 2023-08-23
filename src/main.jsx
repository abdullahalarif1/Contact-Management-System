import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Shared/Login.jsx";
import AuthProvider from "./Router/AuthProvider.jsx";
import Register from "./Shared/Register.jsx";
import AllContact from "./Pages/ContactList/AllContact.jsx";
import MyContact from "./Pages/ContactList/MyContact.jsx";
import UpdateContacts from "./Pages/ContactList/UpdateContacts.jsx";
import AddContacts from "./Pages/ContactList/AddContacts.jsx";
import PermissionManagement from "./Pages/ShareContact/PermissionManagement.jsx";
// import PrivateRoute from "./Router/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",

        element: <Home />,
      },
      {
        path: "/allContacts",
        element: <AllContact />,
      },
      {
        path: "/addContacts",
        element: <AddContacts/>,
      },
      {
        path: "/myContacts",
        element: <MyContact />,
      },
      {
        path: "/permissionManage",
        element: <PermissionManagement/>,
      },
      {
        path: "/updateContacts/:id",
        element: <UpdateContacts />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/contacts/${params.id}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {" "}
    <div className="bg min-h-screen">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </React.StrictMode>
);
