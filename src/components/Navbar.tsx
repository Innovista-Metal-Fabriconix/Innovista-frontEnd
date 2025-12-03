import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/Images/logo/CompanyLogo.png";
import styles from "../cssModules/Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Company Logo" />
      </div>
      <div className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          About
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <span>
            Products
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </NavLink>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/OrderCart"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/badges/48/shopping-cart.png"
            alt="shopping-cart"
          />
        </NavLink>
      </div>
      <button className={styles.quoteBtn}>Get a Free Quote</button>

      <div
        className={styles.showButton}
        onClick={() => setIsOpen(true)}
        style={isOpen ? { visibility: "hidden" } : { visibility: "visible" }}
      >
        <FontAwesomeIcon icon={faBars} size="2xl" />
      </div>

      {isOpen && (
        <div className={styles.mobileMenu} ref={menuRef}>
          <div className={styles.mobileMenuHeader}>
            <img src={logo} alt="Company Logo" className={styles.mobileLogo} />
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>
          <div className={styles.mobileLinks}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={handleLinkClick}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={handleLinkClick}
            >
              About
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={handleLinkClick}
            >
              <span>
                Products
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={handleLinkClick}
            >
              Blogs
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={handleLinkClick}
            >
              Projects
            </NavLink>
            <button className={styles.mobileQuoteBtn} onClick={handleLinkClick}>
              Get a Free Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
