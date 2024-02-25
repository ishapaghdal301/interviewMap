import React from 'react';
// import Compiler from './Compiler';
import Compiler from './TestCompiler';

function ProblemDetails({ selectedProblem }) {
    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <div className="w-25 p-4 overflow-auto">
                {selectedProblem && (
                    <div className="problem-details">
                        <h1 className="problem-title">{selectedProblem.title}</h1>
                        <h4>Description</h4>
                        <p>{selectedProblem.description}</p>
                        <h4>Sample Input</h4>
                        <p>{selectedProblem.sampleInput}</p>
                        <h4>Sample Output</h4>
                        <p>{selectedProblem.sampleOutput}</p>
                    </div>
                )}
            </div>
            <div className="w-75 p-4 overflow-auto d-flex flex-column">
                {selectedProblem && (
                    <div className="compiler flex-grow-1">
                        <Compiler selectedProblemId={selectedProblem._id} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProblemDetails;
