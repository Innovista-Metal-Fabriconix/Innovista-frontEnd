import { Link, NavLink } from "react-router-dom";
import { Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import companyLogo from "../assets/Images/logo/CompanyLogo.png";

function Footer() {
  const footerLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Products", to: "/products" },
    { label: "Blogs", to: "/blogs" },
    { label: "Projects", to: "/projects" },
  ];

  const socialLinks = [
    {
      icon: <FontAwesomeIcon icon={faFacebookF} />,
      label: "Facebook",
      href: "https://www.facebook.com/share/1CN1SBPycg/",
    },
    {
      icon: <FontAwesomeIcon icon={faInstagram} />,
      label: "Instagram",
      href: "https://www.instagram.com/innovista_fabriconx_aluminium?igsh=OXU0MndxZWMwNHo2",
    },
    {
      icon: <FontAwesomeIcon icon={faWhatsapp} />,
      label: "WhatsApp",
      href: "https://wa.me/94760818098",
    },
    {
      icon: <FontAwesomeIcon icon={faPhone} />,
      label: "Phone",
      href: "tel:+94760818098",
    },
    {
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      label: "Email",
      href: "mailto:innovistametal@gmail.com",
    },
  ];

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%)",
        padding: "72px 24px 40px",
        color: "#101010",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Link
          to="/"
          aria-label="Go to home page"
          style={{ display: "inline-flex", justifyContent: "center" }}
        >
          <img
            src={companyLogo}
            alt="Innovista Metal Fabriconix Logo"
            style={{
              width: "clamp(220px, 28vw, 360px)",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Link>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "22px 54px",
            marginTop: "40px",
          }}
        >
          {footerLinks.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              style={({ isActive }) => ({
                color: isActive ? "#d81f26" : "#101010",
                textDecoration: "none",
                fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
                fontWeight: 500,
                letterSpacing: "0.01em",
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div
          aria-hidden="true"
          style={{
            width: "220px",
            height: "18px",
            margin: "38px auto 34px",
            background:
              "repeating-linear-gradient(135deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 10px)",
            opacity: 0.28,
            clipPath: "polygon(0 42%, 100% 42%, 100% 58%, 0 58%)",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "28px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              style={{
                color: "#161616",
                fontSize: "2rem",
                lineHeight: 1,
                transition: "transform 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "translateY(-2px) scale(1.06)";
                event.currentTarget.style.color = "#d81f26";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "translateY(0) scale(1)";
                event.currentTarget.style.color = "#161616";
              }}
            >
              {item.icon}
            </a>
          ))}
        </div>

        <div style={{ marginTop: "30px", color: "#475569", fontSize: "0.95rem", lineHeight: "1.6" }}>
          <p style={{ margin: "4px 0", fontWeight: 500 }}>Innovista Metal Fabriconix (PVT) Ltd</p>
          <p style={{ margin: "4px 0" }}>📍 Western Province, Sri Lanka</p>
          <p style={{ margin: "4px 0" }}>📞 +94 76 081 8098 &nbsp;|&nbsp; ✉️ innovistametal@gmail.com</p>
        </div>

        <Typography.Text
          style={{
            display: "block",
            marginTop: "30px",
            color: "#35506a",
            fontSize: "1rem",
            letterSpacing: "0.01em",
          }}
        >
          © Copyright {new Date().getFullYear()}, All Rights Reserved
        </Typography.Text>
      </div>
    </footer>
  );
}

export default Footer;
