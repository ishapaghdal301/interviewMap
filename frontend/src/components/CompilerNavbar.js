import React from 'react';
import Select from 'react-select';
import '../assets/styles/CompilerNavbar.css';

const CompilerNavbar = ({ userLang, setUserLang, userTheme,
    setUserTheme, fontSize, setFontSize }) => {

    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "java", label: "Java" },
        { value: "python3", label: "Python 3" },
        { value: "javascript", label: "JavaScript" },
        { value: "nodejs", label: "Node.js" },
        { value: "php", label: "PHP" },
    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ];
    return (
        <div className="navbar">
            <h1>Code Compiler</h1>
            <Select options={languages} value={userLang}
                onChange={(e) => setUserLang(e.value)}
                placeholder={userLang} />
            <Select options={themes} value={userTheme}
                onChange={(e) => setUserTheme(e.value)}
                placeholder={userTheme} />
            <label>Font Size</label>
            <input type="range" min="18" max="30"
                value={fontSize} step="2"
                onChange={(e) => { setFontSize(e.target.value) }} />
        </div>
    )
}

export default CompilerNavbar;
