import React, { useContext } from "react";

import Checkbox from "./Checkbox.jsx";

import { ThemeContext } from "./App.jsx";

import "../styles/Form.scss";

const Form = ({ variant, submit, closeForm}) => {
    const theme = useContext(ThemeContext);

    const handleSubmit = e => {
        e.preventDefault();
        submit(e.target);
    }

    const handleCloseForm = e => {
        e.stopPropagation();
        closeForm();
    }

    let addForm = (
        <form onSubmit={e => handleSubmit(e)} className={`todo-form ${theme}`}>
            <Checkbox name='status' />
            <input
                className="todo-form__input"
                placeholder="Create a new todo..."
                name="title"
            />
        </form>
    );

    let signUpForm = (
        <form onSubmit={e => handleSubmit(e)} className={`auth-form ${theme}`}>
            <div className="auth-form__container">
                <button
                    onClick={(e) => handleCloseForm(e)}
                    className="auth-form__btncancel"
                >
                </button>
            </div>
            <div className="auth-form__title">Registration</div>
            <div className="auth-form__label">Login</div>
            <input
                className="auth-form__input"
                placeholder="Enter login..."
                name="login"
            />
            <div className="auth-form__label">Password</div>
            <input
                className="auth-form__input"
                type="password"
                placeholder="Enter password..."
                name="password"
            />
            <div className="auth-form__label">Repeat password</div>
            <input
                className="auth-form__input"
                type="password"
                placeholder="Repeat password..."
                name="passwordRepeat"
            />
            <div className="auth-form__container">
                <button
                    className="auth-form__btnok"
                >
                    OK
                </button>
            </div>
        </form>
    )

    let signInForm = (
        <form onSubmit={e => handleSubmit(e)} className={`auth-form ${theme}`}>
            <div className="auth-form__container">
                <button
                    onClick={(e) => handleCloseForm(e)}
                    className="auth-form__btncancel"
                >
                </button>
            </div>
            <div className="auth-form__title">Log in</div>
            <div className="auth-form__label">Login</div>
            <input
                className="auth-form__input"
                placeholder="Enter login..."
                name="login"
            />
            <div className="auth-form__label">Password</div>
            <input
                className="auth-form__input"
                type="password"
                placeholder="Enter password..."
                name="password"
            />
            <div className="auth-form__container">
                <button
                    className="auth-form__btnok"
                >
                    OK
                </button>
            </div>
        </form>
    )

    let component;
    if (variant === 'add') {
        component = addForm
    }
    else if (variant === 'signup') {
        component = signUpForm;
    }
    else if (variant === 'signin') {
        component = signInForm;
    }

    return component;
}

export default Form;