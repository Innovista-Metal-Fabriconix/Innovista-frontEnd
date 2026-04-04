import { useEffect } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaGlobe,
  FaTimes,
} from "react-icons/fa";
import styles from "../cssModules/ContactModal.module.css";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ContactItem = {
  id: string;
  label: string;
  text: string;
  href: string;
  external?: boolean;
  Icon: React.ComponentType<{ className?: string }>;
};

const contactItems: ContactItem[] = [
  {
    id: "phone",
    label: "Phone",
    text: "+94760818098",
    href: "tel:+94760818098",
    Icon: FaPhoneAlt,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    text: "Chat with us",
    href: "https://wa.me/94760818098",
    external: true,
    Icon: FaWhatsapp,
  },
  {
    id: "email",
    label: "Email",
    text: "innovistametal@gmail.com",
    href: "mailto:innovistametal@gmail.com",
    Icon: FaEnvelope,
  },
  {
    id: "facebook",
    label: "Facebook",
    text: "Visit Facebook Page",
    href: "https://www.facebook.com/share/1CN1SBPycg/",
    external: true,
    Icon: FaFacebookF,
  },
  {
    id: "instagram",
    label: "Instagram",
    text: "Visit Instagram Page",
    href: "https://www.instagram.com/innovista_fabriconx_aluminium?igsh=OXU0MndxZWMwNHo2",
    external: true,
    Icon: FaInstagram,
  },
  {
    id: "portfolio",
    label: "Alupenters Website",
    text: "View Our Portfolio",
    href: "https://alupenters.lk/fabricator/AP1559",
    external: true,
    Icon: FaGlobe,
  },
];

export default function ContactModal({
  isOpen,
  onClose,
}: Readonly<ContactModalProps>) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    globalThis.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      globalThis.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} aria-hidden="true">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close contact modal"
        >
          <FaTimes />
        </button>

        <h2 id="contact-modal-title" className={styles.title}>
          Contact Us
        </h2>
        <p className={styles.subtitle}>
          Reach out to us through any of the following channels
        </p>

        <div className={styles.grid}>
          {contactItems.map(({ id, label, text, href, external, Icon }) => (
            <a
              key={id}
              href={href}
              className={styles.card}
              aria-label={`${label}: ${text}`}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
            >
              <Icon className={styles.icon} />
              <div className={styles.cardText}>
                <strong>{label}</strong>
                <span>{text}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
