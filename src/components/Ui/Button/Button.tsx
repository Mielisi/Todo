import classes from "./Button.module.css";
import { ButtonProps } from "../../../types/button/button";

export const Button = ({ className, children, ...rest }: ButtonProps) => {
  return (
    <button className={`${classes.button} ${className}`} {...rest}>
      {children}
    </button>
  );
};
