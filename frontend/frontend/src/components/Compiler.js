import React, { useState, useEffect } from 'react';
import '../assets/styles/Compiler.css';
import Editor from '@monaco-editor/react';
import CompilerNavbar from './CompilerNavbar';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

function Compiler() {
    const [userCode, setUserCode] = useState('');
    const [userLang, setUserLang] = useState("python3");
    const [userTheme, setUserTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(20);
    const [userInput, setUserInput] = useState("");
    const [userOutput, setUserOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const options = {
        fontSize: fontSize
    }

    useEffect(() => {
        socket.on('codeChange', (newCode) => {
            setUserCode(newCode);
        });

        socket.on('inputChange', (newInput) => {
            setUserInput(newInput);
        });

        socket.on('outputChange', (newOutput) => {
            setUserOutput(newOutput);
        });
    }, []);

    function compile() {
        setLoading(true);
        if (userCode === '') {
            return;
        }

        fetch('http://localhost:8000/api/compile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: userCode,
                language: userLang,
                input: userInput
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserOutput(data.output);
                socket.emit('outputChange', data.output);
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function clearOutput() {
        setUserOutput("");
        socket.emit('outputChange', "");
    }

    function handleCodeChange(newValue) {
        setUserCode(newValue);
        socket.emit('codeChange', newValue);
    }

    function handleInputChange(event) {
        const newInput = event.target.value;
        setUserInput(newInput);
        socket.emit('inputChange', newInput);
    }

    return (
        <div className="App">
            <CompilerNavbar
                userLang={userLang} setUserLang={setUserLang}
                userTheme={userTheme} setUserTheme={setUserTheme}
                fontSize={fontSize} setFontSize={setFontSize}
            />
            <div className="main">
                <div className="left-container">
                    <Editor
                        value={userCode}
                        options={options}
                        height="calc(100vh - 50px)"
                        width="100%"
                        theme={userTheme}
                        language={userLang}
                        defaultValue="# Enter your code here"
                        onChange={handleCodeChange}
                    />
                    <button className="run-btn" onClick={() => compile()}>
                        Run
                    </button>
                </div>
                <div className="right-container">
                    <h4>Input:</h4>
                    <div className="input-box">
                        <textarea
                            id="code-inp"
                            value={userInput}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <h4>Output:</h4>
                    {loading ? (
                        <div className="spinner-box">
                            Loading...
                        </div>
                    ) : (
                        <div className="output-box">
                            <pre>{userOutput}</pre>
                            <button onClick={() => clearOutput()} className="clear-btn">
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Compiler;
