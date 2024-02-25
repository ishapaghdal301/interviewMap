import React from 'react';
import { useParams } from 'react-router-dom';
import AddProblemForm from '../components/AddProblem';
import Navbar from "../components/Navbar";

const AddProblemPage = () => {
    const { testId } = useParams();

    return (
        <div>
            <Navbar />
            <div style={{ marginTop: '600px' }}>
                <AddProblemForm />
            </div>
        </div>
    );
};

export default AddProblemPage;
