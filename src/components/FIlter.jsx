import React, { useContext } from "react"

import { ThemeContext } from "./App.jsx";

import "../styles/Filter.scss";

const Filter = ({ countLeft, filter, changeFilter, clearCompleted }) => {
    const filters = ['all', 'active', 'completed'];

    const theme = useContext(ThemeContext);

    return (
        <div className={`todo-filter ${theme}`}>
            <span className="todo-filter__count">{`${countLeft} items left`}</span>
            <div className="todo-filter__btncontainer">
                {filters.map((f, i) => f === filter 
                    ? <button 
                        className="todo-filter__btn active"
                        onClick={() => changeFilter(f)}
                        key={i}
                      >
                        {f[0].toUpperCase() + f.slice(1)}
                      </button>
                    : <button 
                        className="todo-filter__btn"
                        onClick={() => changeFilter(f)}
                        key={i}
                      >
                        {f[0].toUpperCase() + f.slice(1)}
                      </button>
                )}
            </div>
            <button 
              className="todo-filter__btnclear"
              onClick={clearCompleted}
            >
              Clear Completed
            </button>
        </div>
    )
}

export default Filter;