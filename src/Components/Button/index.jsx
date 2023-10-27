import React from "react";
import Styles from "./button.module.scss";

const CustomButton = ({ label, onClick, selected }) => {
  return (
    <div className={Styles.container}>
      <button
        onClick={onClick}
        style={{ color: selected ? "#3A7CFD" : "inherit" }}
      >
        {label}
      </button>
    </div>
  );
};

export default CustomButton;
