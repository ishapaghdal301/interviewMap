import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Test = ({ testId }) => {
    const [test, setTest] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/tests/${testId}`);
                setTest(response.data);
            } catch (error) {
                console.error('Error fetching test:', error);
            }
        };
        fetchTest();
    }, [testId]);

    return (
        <div className=" mt-5">
            <h1 className="mb-4">Test Page</h1>
            {test && (
                <div>
                    <h2>{test.title}</h2>
                    <p>{test.description}</p>
                    <Link to={`/add-problem/${testId}`} className="btn btn-primary mb-4">Add Problem</Link>
                    <ul className="list-group">
                        {test.problems.map(problem => (
                            <li key={problem._id} className="list-group-item">
                                <h3>{problem.title}</h3>
                                <p><strong>Description : </strong>{problem.description}</p>
                                <p><strong>SampleInput : </strong>{problem.sampleInput}</p>
                                <p><strong>Output : </strong>{problem.sampleOutput}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Test;
