import React, { useContext } from "react";

import { ThemeContext } from "./App.jsx";

import "../styles/TodoItem.scss";
import Checkbox from "./Checkbox.jsx";

const TodoItem = ({ id, title, done, toggleCompleted, deleteItem }) => {
    const theme = useContext(ThemeContext);

    let todoClassName = `todo-item ${theme}`;
    if (done) {
        todoClassName += " done";
    }

    return (
        <div className={todoClassName}>
            <Checkbox 
                checked={done} 
                toggleChecked={() => toggleCompleted(id)}
            />
            <div 
                className="todo-item__title"
                onClick={() => toggleCompleted(id)}
            >
                {title}
            </div>
            <button 
                className="todo-item__delbtn"
                onClick={() => deleteItem(id)}
            >
            </button>
        </div>
    )
}

export default TodoItem;