import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";
import NavLink from "./NavLink";
import { CSSTransition } from "react-transition-group";

const useOutsideMinimizer = (ref, handler) =>
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
{
}

const Nav = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const navRef = useRef();
  const wrapperRef = useRef();
  useEffect(() => {
    const navHeight = navRef.current.offsetHeight - 1 + "px";
    document.documentElement.style.setProperty("--scroll-padding", navHeight);
  }, []);

  useOutsideMinimizer(wrapperRef, () => setNavIsOpen(false));

  const handleLink = () => {
    setNavIsOpen((prevState) => !prevState);
  };

  const pages = [
    { title: "About Me", anchor: "aboutme" },
    { title: "Presentations", anchor: "presentations" },
    { title: "Publications", anchor: "presentations" },
    { title: "Visuals", anchor: "presentations" },
    { title: "GitHub", anchor: "presentations" },
  ];

  return (
    <nav ref={wrapperRef}>
      <section
        ref={navRef}
        className={`bg-neutral-100 ${styles["top-nav"]} ${
          navIsOpen ? styles["no-shadow"] : ""
        }`}
      >
        <Link href="/">
          <a
            onClick={navIsOpen ? handleLink : null}
            className={`fw-bold fs-nav text-neutral-900`}
          >
            Hidahis Mesa
          </a>
        </Link>
        <button
          className={styles["button-nav"]}
          aria-expanded={navIsOpen}
          onClick={handleLink}
        ></button>
      </section>
      <CSSTransition
        in={navIsOpen}
        timeout={500}
        classNames="nav-fade"
        mountOnEnter
        unmountOnExit
      >
        <section className={`bg-neutral-100 ${styles["nav-links"]}`}>
          {pages.map((page) => (
            <NavLink
              anchor={page.anchor}
              title={page.title}
              onClick={() => setNavIsOpen((prevState) => !prevState)}
            />
          ))}
        </section>
      </CSSTransition>
    </nav>
  );
};

export default Nav;
