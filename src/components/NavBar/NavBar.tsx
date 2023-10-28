import { Link } from "react-router-dom";

import classes from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <>
      <nav className={classes.nav}>
        <p>Todo List React </p>

        <div className={classes.buttonNav}>
          <Link to={"/home"}>Home</Link>
          <Link to="/home/settings"> Impostazioni</Link>
        </div>
      </nav>
    </>
  );
};

