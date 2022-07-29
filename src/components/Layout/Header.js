import { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImg from "../../assets/images/meals.jpeg";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton count="5" onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="Meals" />
      </div>
    </Fragment>
  );
};

export default Header;
