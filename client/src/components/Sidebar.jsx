import { links } from "../utils/routes";
import LinkItem from "./LinkItem";

const Sidebar = () => {
  return (
    <div className="sidebar-sticky">
      <ul className="nav flex-column row-gap-3">
        {links.map((link) => (
          <LinkItem key={link.title} link={link} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
