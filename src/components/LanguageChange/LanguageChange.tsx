import React from 'react';
import style from './LanguageChange.module.css';
import { useTranslation } from 'react-i18next';
import denmark from './assets/denmark.svg';
import uk from './assets/uk.svg';

export default function LanguageChange() {
    const { i18n } = useTranslation();

    const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lng = e.target.value;
        i18n.changeLanguage(lng);
        try {
            if (typeof window !== 'undefined') localStorage.setItem('language', lng);
        } catch (err) {
            // ignore storage errors
        }
    };

    const currentFlag = i18n.language === 'da' ? denmark : uk;

    return (
        <div className={style.langContainer}>
            <img
                src={currentFlag}
                alt={i18n.language === 'da' ? 'Danish flag' : 'English flag'}
                className={style.flagIcon}
            />
            <select
                className={style.languageChange}
                value={i18n.language || 'en'}
                onChange={handleLangChange}
                aria-label="language-select"
            >
                <option value="en">EN</option>
                <option value="da">DA</option>
            </select>
        </div>
    );
}