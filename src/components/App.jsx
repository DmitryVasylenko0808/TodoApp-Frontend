import React, { createContext, useState } from "react"

import Menu from "./Menu.jsx";
import Form from "./Form.jsx";
import TodoList from "./TodoList.jsx";

import "../styles/normalize.scss";
import "../styles/style.scss";

import { fetchMe, signIn, signUp } from "../http/usersApi.js";

export const ThemeContext = createContext(null);
export const UserContext = createContext(null);

const App = () => {
    let appClassName = "app";

    const [theme, setTheme] = useState('');
    const [isLogging, setIsLogging] = useState(false);
    const [variantAuthForm, setVariantAuthForm] = useState('');
    const [user, setUser] = useState({});

    if (isLogging) {
        appClassName += " logging";
    }

    const handleToggleTheme = () => {
        if (theme === '') {
            setTheme('light')
        }
        else {
            setTheme('');
        }
    }

    const handleOpenAuthForm = variant => {
        setIsLogging(true);
        setVariantAuthForm(variant);
    }

    const handleCloseAuthForm = () => {
        setIsLogging(false);
        setVariantAuthForm('');
    }

    const signUpUser = async (userData) => {
        const login = userData.login.value;
        const password = userData.password.value;
        const passwordRepeat = userData.passwordRepeat.value;

        const data = { login, password, passwordRepeat };

        const res = await signUp(data);
        if (!res.success) {
            alert(res.errorMessage);
        }
        else {
            alert(res.message);
            handleCloseAuthForm();
        }
    }

    const signInUser = async (userData) => {
        const login = userData.login.value;
        const password = userData.password.value;

        const data = { login, password };

        const res = await signIn(data);
        if (!res.success) {
            alert(res.errorMessage);
        }
        else {
            const userRes = await fetchMe(res.token);
            if (!userRes.success) {
                alert(res.errorMessage);
            }
            else {
                const login = userRes.userLogin;
                const token = res.token;
                setUser({ login, token });
                handleCloseAuthForm();
            }
        }
    }

    const handleAuth = userData => {
        if (variantAuthForm === 'signup') {
            signUpUser(userData);
        }
        else if (variantAuthForm === 'signin') {
            signInUser(userData);
        }
    }

    const handleLogOut = () => {
        setUser({});
    }

    return (
        <ThemeContext.Provider value={theme}>
            <UserContext.Provider value={user}>
                <div className={appClassName}>
                    <header className={`header ${theme}`}></header>

                    <main className={`main ${theme}`}>
                        <div className={`todo-block _container ${theme}`}>
                            <Menu
                                toggleTheme={handleToggleTheme}
                                openAuthForm={handleOpenAuthForm}
                                logOut={handleLogOut}
                            />
                            <TodoList />
                        </div>
                    </main>
                </div>

                {isLogging &&
                    <Form
                        variant={variantAuthForm}
                        submit={handleAuth}
                        closeForm={handleCloseAuthForm}
                    />
                }
            </UserContext.Provider>
        </ThemeContext.Provider>
    )
}

export default App;