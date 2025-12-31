import { Link } from "react-router-dom";

const NavButton = ({ text,to }) => (
  <Link to={to}
    className="
    text-lg
    px-4 py-1 rounded-full
    bg-primary
    text-black
    border border-white/20
    hover:bg-accent
   dark:hover:bg-red-950/50
    dark:bg-surface
    dark:text-white
    transition-all duration-300
    hover:scale-105
    "
  >
    {text}
  </Link>
);

export default NavButton