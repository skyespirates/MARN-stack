import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";

// pages
import Homepage from "./pages/Home";
import Books from "./pages/Books";
import Users from "./pages/Users";
import Customers from "./pages/Customers";
import Todos from "./pages/Todos";

const router = createBrowserRouter([
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

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
