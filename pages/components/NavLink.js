import Link from "next/link";

import styles from "./NavLink.module.css";

const NavLink = (props) => {
  return (
    <Link href={`#${props.anchor}`}>
      <a onClick={props.onClick} className={`${styles.link}`}>
        {props.title}
      </a>
    </Link>
  );
};

export default NavLink;
