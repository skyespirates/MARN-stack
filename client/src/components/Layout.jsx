import { NavLink, Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "16px",
          border: "1px solid black",
          padding: "16px 0",
          marginBottom: "24px",
        }}
      >
        <NavLink to="/">book</NavLink>
        <NavLink to="/register">register</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
