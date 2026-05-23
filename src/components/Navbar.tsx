import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/Images/logo/CompanyLogo.png";
import styles from "../cssModules/Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";

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
        <Link to="/" className="cursor-target" aria-label="Go to home page">
          <img src={logo} alt="Company Logo" />
        </Link>
      </div>
      <div className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? styles.activeLink : styles.link} cursor-target`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${isActive ? styles.activeLink : styles.link} cursor-target`
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `${isActive ? styles.activeLink : styles.link} cursor-target`
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
            `${isActive ? styles.activeLink : styles.link} cursor-target`
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${isActive ? styles.activeLink : styles.link} cursor-target`
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/OrderCart"
          className={({ isActive }) =>
            `${isActive ? styles.activeLink : styles.link} cursor-target`
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
      <NavLink
        to="/request-quote"
        className={`${styles.quoteBtn} cursor-target`}
      >
        Get a Free Quote
      </NavLink>

      <div
        className={`${styles.showButton} ${isOpen ? styles.hidden : styles.visible} cursor-target`}
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label="Open navigation menu"
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faBars} size="2xl" />
      </div>

      {isOpen && (
        <div className={styles.mobileMenu} ref={menuRef}>
          <div className={styles.mobileMenuHeader}>
            <Link
              to="/"
              className={`${styles.mobileLogo} cursor-target`}
              aria-label="Go to home page"
              onClick={handleLinkClick}
            >
              <img src={logo} alt="Company Logo" />
            </Link>
            <Button
              className={`${styles.closeBtn} cursor-target`}
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </Button>
          </div>
          <div className={styles.mobileLinks}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? styles.activeLink : styles.link} cursor-target`
              }
              onClick={handleLinkClick}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${isActive ? styles.activeLink : styles.link} cursor-target`
              }
              onClick={handleLinkClick}
            >
              About Us
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${isActive ? styles.activeLink : styles.link} cursor-target`
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
                `${isActive ? styles.activeLink : styles.link} cursor-target`
              }
              onClick={handleLinkClick}
            >
              Blogs
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `${isActive ? styles.activeLink : styles.link} cursor-target`
              }
              onClick={handleLinkClick}
            >
              Projects
            </NavLink>
            <NavLink
              to="/request-quote"
              className={`${styles.mobileQuoteBtn} cursor-target`}
              onClick={handleLinkClick}
            >
              Get a Free Quote
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
