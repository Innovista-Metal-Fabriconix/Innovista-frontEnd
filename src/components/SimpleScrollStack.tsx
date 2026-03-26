import React from "react";
import type { ReactNode } from "react";
import styles from "../cssModules/SimpleScrollStack.module.css";

export interface ScrollStackItemProps {
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
}) => <div className={styles.card}>{children}</div>;

interface SimpleScrollStackProps {
  children: ReactNode;
}

const SimpleScrollStack: React.FC<SimpleScrollStackProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {children}
        <div className={styles.spacer}></div>
      </div>
    </div>
  );
};

export default SimpleScrollStack;
