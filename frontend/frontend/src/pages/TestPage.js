import React from 'react';
import { useParams } from 'react-router-dom';
import Test from '../components/Test';
import Navbar from "../components/Navbar";

const TestPage = () => {
    const { testId } = useParams();

    return (
        <div>
            <Navbar />
            <Test testId={testId} />
        </div>
    );
};

export default TestPage;
