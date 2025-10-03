import React from 'react';
import styles from '../cssModules/ContactButton.module.css';

interface ContactButtonProps {
  onClick?: () => void;
  href?: string;
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  href,
  children = "Contact Us",
  size = 'medium',
  variant = 'primary',
  disabled = false
}) => {
  const buttonClasses = `${styles.button} ${styles[size]} ${styles[variant]} ${disabled ? styles.disabled : ''}`;

  if (href && !disabled) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
        role="button"
      >
        <span className={styles.buttonText}>{children}</span>
        <div className={styles.glow}></div>
        <div className={styles.particles}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </a>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={buttonClasses}
      disabled={disabled}
    >
      <span className={styles.buttonText}>{children}</span>
      <div className={styles.glow}></div>
      <div className={styles.particles}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  );
};

export default ContactButton;