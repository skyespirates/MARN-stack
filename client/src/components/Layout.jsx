import { NavLink, Outlet } from "react-router-dom";

const links = [
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
        {links.map(({ target, title }, i) => (
          <NavLink
            key={i}
            to={target}
            className={({ isActive }) =>
              `text-decoration-none ${isActive ? "text-danger" : ""}`
            }
          >
            {title}
          </NavLink>
        ))}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
