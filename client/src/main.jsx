import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

// components
import Layout from "./components/Layout.jsx";
import Book from "./components/Book.jsx";
import Register from "./components/Register.jsx";
import EditBook from "./components/EditBook.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Book />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: ":book_id",
        element: <EditBook />,
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
