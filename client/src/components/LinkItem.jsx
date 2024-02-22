import { NavLink } from "react-router-dom";

const LinkItem = ({ link }) => {
  return (
    <li className="nav-item">
      <NavLink
        style={style}
        className={({ isActive }) =>
          isActive ? "bg-primary text-white border-primary " : ""
        }
        to={link.target}
      >
        {link.title}
      </NavLink>
    </li>
  );
};

const style = {
  textDecoration: "none",
  color: "#000",
  display: "inline-block",
  width: "100%",
  textTransform: "capitalize",
  borderRadius: "3px",
  padding: 4,
  fontWeight: 600,
};

export default LinkItem;
