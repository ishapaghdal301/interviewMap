import { useState } from 'react';
import '../assets/styles/Compiler.css';
import Editor from "@monaco-editor/react";
import CompilerNav from './TestCompilerNavbar';
import axios from 'axios';


function Compiler({ selectedProblemId }) {
    const [userCode, setUserCode] = useState('');
    const [userLang, setUserLang] = useState("python3");
    const [userTheme, setUserTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(20);
    const [userInput, setUserInput] = useState("");
    const [userOutput, setUserOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [submissionResponse, setSubmissionResponse] = useState(null);

    const options = {
        fontSize: fontSize
    }


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
    }

    function handleCodeChange(newValue) {
        setUserCode(newValue);
    }

    function handleInputChange(event) {
        const newInput = event.target.value;
        setUserInput(newInput);
    }

    const handleSubmitProblem = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/problems/submitproblem/${selectedProblemId}`, {
                userCode,
                userLang
            });
            setSubmissionResponse(response.data);
        } catch (error) {
            console.error('Error submitting problem:', error);
        }
    };

    return (
        <div className="compiler-container">
            <CompilerNav
                userLang={userLang} setUserLang={setUserLang}
                userTheme={userTheme} setUserTheme={setUserTheme}
                fontSize={fontSize} setFontSize={setFontSize}
            />
            <div className="main1">
                <div className="left-container1">
                    <Editor
                        value={userCode}
                        options={options}
                        height="calc(80vh - 50px)"
                        width="100%"
                        theme={userTheme}
                        language={userLang}
                        defaultValue="# Enter your code here"
                        onChange={handleCodeChange}
                    />
                    
                    <button className="run-btn1" onClick={() => compile()}>
                        Run
                    </button>
                </div>
                <div className="right-container1" >
                    <h3>Input:</h3>
                    <div className="input-box">
                        <textarea
                            id="code-inp"
                            value={userInput}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <h3>Output:</h3>
                    {loading ? (
                        <div style = {{color:'white'}}className="spinner-box">
                            Loading...
                        </div>
                    ) : (
                        <div className="output-box">
                            <pre>{userOutput}</pre>
                            <button onClick={() => clearOutput()} className="clear-btn1">
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <button className="submit-btn" onClick={handleSubmitProblem}>Submit</button>
            {submissionResponse && (
                <div className="submission-response">
                    <h3 style={{color:'black', padding:'10px 0 0 0 '}}>Submission Response</h3>
                    <ul>
                        {Object.entries(submissionResponse).map(([testcase, result]) => (
                            <li key={testcase}>{`${testcase}: ${result}`}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Compiler;
