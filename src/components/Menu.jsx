import React, { useContext } from "react";

import { ThemeContext, UserContext } from "./App.jsx";

import "../styles/Menu.scss";

const Menu = ({ toggleTheme, openAuthForm, logOut }) => {
    const theme = useContext(ThemeContext);
    const { login } = useContext(UserContext);

    return (
        <div className="todo-menu">
            <span className="todo-menu__heading">TODO</span>
            {login 
                ? <button
                    className="todo-menu__authbtn"
                    onClick={logOut}
                  >
                    {`${login} | Log Out`}
                  </button>

                : <>
                    <button
                        className="todo-menu__authbtn"
                        onClick={() => openAuthForm('signin')}
                    >
                        Log In
                    </button>

                    <button
                        className="todo-menu__authbtn"
                        onClick={() => openAuthForm('signup')}
                    >
                        Sign Up
                    </button>
                  </>
            }

            <button
                onClick={toggleTheme}
                className="todo-menu__themebtn"
            >
                <div className={`todo-menu__themeimg ${theme}`} />
            </button>
        </div>
    )
}

export default Menu;