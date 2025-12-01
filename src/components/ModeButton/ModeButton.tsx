import React, { useState, useEffect } from 'react';
import style from './ModeButton.module.css';

const ModeButton = () => {
    // Get theme from localStorage or default to dark
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    });

    // Check if user is logged in
    const isLoggedIn = () => {
        return typeof window !== 'undefined' && localStorage.getItem('token') !== null;
    };

    // Apply theme changes to body and save to localStorage (only if logged in)
    useEffect(() => {
        if (!isLoggedIn()) {
            // Remove theme classes if not logged in
            document.body.classList.remove('light', 'dark');
            return;
        }

        if (theme === 'light') {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
        } else {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const isDarkMode = theme === 'dark';

    return (
        <div className={style.buttonContainer}>
            <div className={style.modeButtonContainer}>
                <label className={style.label}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</label>
                <div 
                    className={`${style.switch} ${isDarkMode ? style.dark : style.light}`}
                    onClick={toggleTheme}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleTheme();
                        }
                    }}
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                >
                    <div className={`${style.thumb} ${isDarkMode ? style.dark : style.light}`}>
                        {isDarkMode ? '☀️' : '🌙'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModeButton;