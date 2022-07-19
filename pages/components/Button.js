import styles from "./Button.module.css";
const Button = (props) => {
  return (
    <button
      className={`${
        props.secondary
          ? styles["secondary__button"]
          : props.primary
          ? styles["primary__button"]
          : null
      } fs-button ${props.style} text-neutral-100`}
      type={props.type}
      onClick={props.scrollHandler}
    >
      {props.children}
    </button>
  );
};

export default Button;
