import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import '../assets/styles/style.css';
import Navbar from '../components/Navbar';
import DashboardContent from '../components/DashboardContent';
import Footer from '../components/Footer';


const MainContainer = styled('div')({
    marginLeft: 240,
    flexGrow: 1,
});

const Dashboard = ({ name }) => {
    return (
        <>
            <Navbar />
            {/* <MainContainer> */}
                <div className="dashboard">
                    <DashboardContent />
                    <Footer />
                </div>
            {/* </MainContainer> */}
        </>
    );
};

export default Dashboard;
