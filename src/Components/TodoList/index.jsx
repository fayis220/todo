import "font-awesome/css/font-awesome.min.css";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Moon from "../../../src/icons/moon.svg";
import useLocalForage from "../../hooks/localForage";
import Button from "../Button";
import TodoCheckbox from "../CheckBox";
import Footer from "../Footer";
import TodoInput from "../TextInput";
import Styles from "./todoList.module.scss";

const TodoList = () => {
  const [todos, setTodos] = useLocalForage();
  const [show, setShow] = useState(false);
  const [currentCheck, setCurrentCheck] = useState(false);
  const [status, setStatus] = useState("all");

  const addTodo = (newTodoText) => {
    const newTodo = { text: newTodoText, completed: currentCheck };
    setStatus("all");
    setTodos([newTodo, ...todos]);
  };

  const handleDrop = (result) => {
    if (!result.destination) return;
    const items = [...todos];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  const markTodoAsCompleted = (index) => {
    let data = status;
    if (data === "all") {
      const updatedTodos = [...todos];
      const bool = updatedTodos[index].completed;
      updatedTodos[index].completed = !bool;
      setTodos(updatedTodos);
    } else {
      const getTodos = [...todos];
      const updatedTodos = [...filterTodos()];
      const bool = updatedTodos[index].completed;
      updatedTodos[index].completed = !bool;
      const matchingTodo = getTodos.find(
        (todo) => todo.text === updatedTodos[index].text
      );
      if (matchingTodo) {
        console.log(index);
      }
      setTodos(getTodos);
    }
  };

  const markTextFieldCheck = (value) => {
    setCurrentCheck(value);
  };

  const removeTodo = (index) => {
    const updatedTodos = [...filterTodos()];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const filterTodos = () => {
    let data = status;
    if (data === "all") {
      return todos;
    } else if (data === "active") {
      return todos.filter((todo) => !todo.completed);
    } else if (data === "completed") {
      return todos.filter((todo) => todo.completed);
    }
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const onSubmit = (event) => {
    if (event.keyCode === 13 && event.target.value.length > 0) {
      addTodo(event.target.value);
      event.target.value = "";
      setCurrentCheck(false);
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.main}>
        <div className={Styles.title}>
          <h1>TODO</h1>
      <img className={Styles.icon} src={Moon} alt="Moon" />
        </div>
        <div className={Styles.addTodo}>
          <TodoInput
            placeholder="Create a new todo…"
            onSubmit={onSubmit}
            onCurrentCheckClick={() => markTextFieldCheck(!currentCheck)}
            currentCheck={currentCheck}
          />
          {todos.length == 0 ? (
            <div className={Styles.subtitle}> Please enter your tasks to start</div>
          ) : (
            <div>
              <div className={Styles.wrapper}>
                <DragDropContext onDragEnd={handleDrop}>
                  <Droppable droppableId="list">
                    {(provided) => (
                      <div
                        className={Styles.list}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {filterTodos(status)?.map((todo, index) => (
                          <Draggable
                            key={index.toString()}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className={Styles.listItem}
                                onMouseOver={() => setShow(true)}
                                onMouseOut={() => setShow(false)}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                              >
                                <li>
                                  <div className={Styles.content}>
                                    <div
                                      onClick={() => markTodoAsCompleted(index)}
                                    >
                                      <TodoCheckbox
                                        completed={todo.completed}
                                        onToggle={() => {}}
                                      />
                                    </div>
                                    {todo.completed ? (
                                      <s>{todo.text}</s>
                                    ) : (
                                      <span>{todo.text}</span>
                                    )}
                                  </div>
                                  {show && (
                                    <span className={Styles.icon}>
                                      <i
                                        className="fa fa-times"
                                        onClick={() => removeTodo(index)}
                                      ></i>
                                    </span>
                                  )}
                                </li>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>

              <div className={Styles.filter}>
                <span className={Styles.itemLeft}>{`${
                  filterTodos("all")?.filter((val) => val.completed === false)
                    .length
                } items`}</span>
                <div className={Styles.status}>
                  <Button
                    label="All"
                    onClick={() => setStatus("all")}
                    selected={status === "all"}
                  />
                  <Button
                    label="Active"
                    onClick={() => setStatus("active")}
                    selected={status === "active"}
                  />

                  <Button
                    label="Completed"
                    onClick={() => setStatus("completed")}
                    selected={status === "completed"}
                  />
                </div>

                <div className={Styles.clear}>
                  <Button
                    label="Clear Completed"
                    onClick={clearCompletedTodos}
                  />
                </div>
              </div>

              <div className={Styles.smallScreen}>
                <Button
                  label="All"
                  onClick={() => setStatus("all")}
                  selected={status === "all"}
                />
                <Button
                  label="Active"
                  onClick={() => setStatus("active")}
                  selected={status === "active"}
                />

                <Button
                  label="Completed"
                  onClick={() => setStatus("completed")}
                  selected={status === "completed"}
                />
              </div>
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
