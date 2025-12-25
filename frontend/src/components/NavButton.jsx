import { Link } from "react-router-dom";

const NavButton = ({ text,to }) => (
  <Link to={to}
    className="
    text-lg
    px-4 py-1.5 rounded-full
    bg-red-950/70
    text-white
    border border-white/10
    hover:bg-red-900
    transition-all duration-300
    hover:scale-105
    "
  >
    {text}
  </Link>
);

export default NavButton