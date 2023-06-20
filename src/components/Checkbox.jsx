import React, { useContext, useEffect, useState } from "react";

import { ThemeContext } from "./App.jsx";

import "../styles/Checkbox.scss";

const Checkbox = ({ checked, toggleChecked, name }) => {
    const theme = useContext(ThemeContext);

    const [status, setStatus] = useState(false);

    useEffect(() => {
        setStatus(!!checked);
    }, [])

    const handleChange = () => {
        setStatus(!status);
        if (toggleChecked) {
            toggleChecked();
        }
    }

    return (
        <div className={`checkbox-container ${theme}`}>
            <input 
                type="checkbox" 
                className="checkbox-container__checkbox"
                checked={status}
                name={name}
            />
            <span 
                className="checkbox-container__checkmark" 
                onClick={handleChange}
            >
            </span>
        </div> 
    )
        
}

export default Checkbox;