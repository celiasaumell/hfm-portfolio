import { useState, useRef, useEffect } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
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
const Nav = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const navRef = useRef();
  const wrapperRef = useRef();
  const nodeRef = useRef(null);

  useEffect(() => {
    const navHeight = navRef.current.offsetHeight - 1 + "px";
    document.documentElement.style.setProperty("--scroll-padding", navHeight);
  }, []);

  useOutsideMinimizer(wrapperRef, () => setNavIsOpen(false));

  const handleLink = () => {
    setNavIsOpen((prevState) => !prevState);
    setDisableBtn(true);
    setTimeout(() => setDisableBtn(false), 300);
  };

  const { width } = useWindowDimensions();

  const pages = [
    { title: "About Me", anchor: "aboutme" },
    { title: "Presentations", anchor: "presentations" },
  ];

  return (
    <nav className="bg-neutral-100" ref={wrapperRef}>
      <section ref={navRef} className={`bg-neutral-100 ${styles["top-nav"]}`}>
        <Link href="/">
          <a
            tabIndex={0}
            onClick={navIsOpen ? handleLink : null}
            className={`${styles.logo} fw-bold fs-nav text-neutral-900`}
          >
            Hidahis Mesa
          </a>
        </Link>
        {width >= 1050 ? (
          <section className={`bg-neutral-100 ${styles["nav-links"]}`}>
            {pages.map((page, index) => (
              <NavLink
                key={`${page.title}+${index}`}
                anchor={page.anchor}
                title={page.title}
              />
            ))}
          </section>
        ) : (
          <button
            role="button"
            className={styles["button-nav"]}
            aria-expanded={navIsOpen}
            aria-label={"Menu"}
            onClick={handleLink}
            disabled={disableBtn}
          ></button>
        )}
      </section>
      {width < 1050 ? (
        <CSSTransition
          nodeRef={nodeRef}
          in={navIsOpen}
          timeout={500}
          classNames="nav-fade"
          mountOnEnter
          unmountOnExit
        >
          <section
            ref={nodeRef}
            className={`bg-neutral-100 ${styles["nav-links"]}`}
          >
            {pages.map((page, index) => (
              <NavLink
                key={`${page.title}+${index}`}
                anchor={page.anchor}
                title={page.title}
                onClick={handleLink}
              />
            ))}
          </section>
        </CSSTransition>
      ) : null}
    </nav>
  );
};

export default Nav;
