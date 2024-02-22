import { Outlet } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import "../styles/Layout.css";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row>
          <Col className="sidebar bg-light d-none d-md-block px-3 py-2 " md={2}>
            <Sidebar />
          </Col>
          <Col md={10} className="main ms-sm-auto ">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
