import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../assets/styles/style.css';

const AddProblemForm = ({ onSubmit }) => {
    const { testId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sampleInput, setSampleInput] = useState('');
    const [sampleOutput, setSampleOutput] = useState('');
    const [testCaseInputs, setTestCaseInputs] = useState([{ input: '', output: '' }]);

    const handleAddTestCase = () => {
        setTestCaseInputs(prevState => [...prevState, { input: '', output: '' }]);
    };


    const handleTestCaseInputChange = (index, key, value) => {
        const updatedTestCases = [...testCaseInputs];
        updatedTestCases[index][key] = value;
        setTestCaseInputs(updatedTestCases);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const testCases = testCaseInputs.map(({ input, output }) => ({ input, output }));
        try {
            await axios.post(`http://localhost:8000/api/tests/${testId}/add-problem`, {
                title,
                description,
                sampleInput,
                sampleOutput,
                testCases,
            });
            Swal.fire('Success', 'Problem added successfully!', 'success').then(() => {
                window.location.href = `/test/${testId}`;
            });
        } catch (error) {
            console.error('Error adding problem:', error);
            Swal.fire('Error', 'An error occurred while adding the problem', 'error');
        }
    };

    return (
        <div className='Add-Problem'>
            <div className="container">
                <div className="form">
                    <header>Add Problem</header>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter problem title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="input"
                            placeholder="Enter description"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter sample input"
                            value={sampleInput}
                            onChange={(e) => setSampleInput(e.target.value)}
                        />
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter sample output"
                            value={sampleOutput}
                            onChange={(e) => setSampleOutput(e.target.value)}
                        />

                        <div className="test-cases">
                            <label>Test Cases</label>
                            {testCaseInputs.map((testCase, index) => (
                                <div key={index} className="test-case">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder={`Input for Test Case ${index + 1}`}
                                        value={testCase.input}
                                        onChange={(e) => handleTestCaseInputChange(index, 'input', e.target.value)}
                                    />
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder={`Output for Test Case ${index + 1}`}
                                        value={testCase.output}
                                        onChange={(e) => handleTestCaseInputChange(index, 'output', e.target.value)}
                                    />
                                </div>
                            ))}
                            <button type="button" className="button" onClick={handleAddTestCase}>
                                Add Test Case
                            </button>

                        </div>
                        <br></br>
                        <button className="button" onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProblemForm;
