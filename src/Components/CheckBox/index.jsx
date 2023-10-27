import React from "react";
import Tick from "../../../src/icons/Tick.svg";
import UnTick from "../../../src/icons/UnTick.svg";
import Styles from "./checkbox.module.scss";

const TodoCheckbox = ({ completed, onToggle }) => {
  return (
    <div className={Styles.container}>
      <input type="checkbox" checked={completed} onChange={onToggle} />
      <img className={Styles.icon} src={completed ? Tick : UnTick} alt="Icon" />
    </div>
  );
};

export default TodoCheckbox;
