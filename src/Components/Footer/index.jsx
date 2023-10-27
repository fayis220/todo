import React from "react";
import Styles from "./footer.module.scss";

const Footer = () => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.title}>Drag and drop to reorder list</div>
      <a
        href="https://docs.google.com/document/d/1JtH4K7k-HNzfUBb3zt6q1uPtsoUBnHRv6mwG5cbxXWE/edit"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={Styles.footer}>Documentation: Fayis K</div>
      </a>
    </div>
  );
};

export default Footer;
