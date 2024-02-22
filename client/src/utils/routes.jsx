import { createBrowserRouter } from "react-router-dom";
// components
import Layout from "../components/Layout";

// pages
import Homepage from "../pages/Home";
import Books from "../pages/Books";
import Users from "../pages/Users";
import Customers from "../pages/Customers";
import Todos from "../pages/Todos";

export const links = [
  {
    target: "/",
    title: "home",
  },
  {
    target: "/books",
    title: "books",
  },
  {
    target: "/users",
    title: "users",
  },
  {
    target: "/customers",
    title: "customers",
  },
  {
    target: "/todos",
    title: "todos",
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "todos",
        element: <Todos />,
      },
    ],
  },
]);
