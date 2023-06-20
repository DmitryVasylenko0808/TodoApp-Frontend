import React, { useContext, useEffect, useState } from "react";

import Form from "./Form.jsx";
import TodoItem from "./TodoItem.jsx";
import Filter from "./FIlter.jsx";
import { UserContext } from "./App.jsx";
import { add, del, delCompleted, getAll, getCountLeft, toggleDone } from "../http/todosApi.js";

const TodoList = () => {
    const user = useContext(UserContext);
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('');
    const [countLeft, setCountLeft] = useState(0);

    useEffect(() => {
        if (!user.login) {
            setFilter('all');
        }
        else {
            getData(filter, user.token);
        }
    }, [user, filter]);

    const getTodos = async (filter, token) => {
        const res = await getAll(filter, token);
        if (res.success) {
            setTodos(res.todos);
        }
        else {
            alert(res.errorMessage);
        }
    }

    const getCountLeftTodos = async (token) => {
        const res = await getCountLeft(token);
        if (res.success) {
            setCountLeft(res.leftItems);
        }
        else {
            alert(res.errorMessage);
        }
    }

    const getData = async (filter, token) => {
        await getTodos(filter, token);
        await getCountLeftTodos(token);
    }

    const handleAddTodo = async (todoData) => {
        const title = todoData.title.value;
        const status = todoData.status.checked ? 1 : 0;
        const data = { title, status };

        const res = await add(data, user.token);
        if (res.success) {
            getData(filter, user.token);
        }
        else {
            alert(res.errorMessage);
        }
    }

    const handleToggleCheckTodo = async (id) => {
        const res = await toggleDone(id, user.token);
        if (res.success) {
            getData(filter, user.token);
        }
        else {
            alert(res.errorMessage);
        }
    }

    const handleDeleteTodo = async (id) => {
        const res = await del(id, user.token);
        if (res.success) {
            getData(filter, user.token);
        }
        else {
            alert(res.errorMessage);
        }
    }

    const handleClearCompleted = async () => {
        const res = await delCompleted(user.token);
        if (res.success) {
            getData(filter, user.token);
        }
        else {
            alert(res.errorMessage);
        }
    }

    const handleChangeFilter = filterValue => {
        setFilter(filterValue);
    }

    return (
        <>
            <Form
                variant='add'
                submit={handleAddTodo}
            />
            {user.login &&
                <>
                    <div className="todo-list">
                        {todos.map(todo =>
                            <TodoItem
                                id={todo.id}
                                title={todo.title}
                                done={parseInt(todo.done)}
                                key={todo.id}
                                toggleCompleted={handleToggleCheckTodo}
                                deleteItem={handleDeleteTodo}
                            />)
                        }
                    </div>
                    <Filter
                        countLeft={countLeft}
                        filter={filter}
                        changeFilter={handleChangeFilter}
                        clearCompleted={handleClearCompleted}
                    />
                </>
            }
        </>
    )
}

export default TodoList;