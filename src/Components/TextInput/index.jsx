import "font-awesome/css/font-awesome.min.css";
import React from "react";
import TodoCheckbox from "../CheckBox";
import Styles from "./textInput.module.scss";

const TodoInput = ({
  placeholder,
  onSubmit,
  onCurrentCheckClick,
  currentCheck,
}) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.wrapper}>
        <div onClick={onCurrentCheckClick}>
          <div className={Styles.box}>
            <TodoCheckbox completed={currentCheck} onToggle={() => {}}/>
          </div>
        </div>

        <input type="text" placeholder={placeholder} onKeyDown={onSubmit} onSubmit={onSubmit}/>
      </div>
    </div>
  );
};

export default TodoInput;
