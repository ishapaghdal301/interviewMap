// import React from 'react';
import { styled } from "@mui/material/styles";
import React, { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Dashboard from './pages/Dashboard';
import IntervieweeDashboard from "./components/IntervieweeDashboard";
import HostMeeting from './components/HostMeeting';
import JoinRoom from './components/JoinRoom';
import VideoCall from './components/VideoCall';
import AddTestForm from './pages/AddTestPage';
import TestList from './pages/TestListPage';
import TestPage from './pages/TestPage';
import AddProblemPage from './pages/AddProblemPage';
import ConductedTest from './components/ConductTest';
// import Compiler from './Compiler';
// import Canvas from './Canvas';
// import UserPage from './containers/UserPage';
// 

export const AppContext = createContext();

// const MainContainer = styled('div')({
//     marginLeft: 240, // Adjust this value according to the width of your Sidebar
//     flexGrow: 1,
// });

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true" || false
    );
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [userName, setUserName] = useState(localStorage.getItem("userName"));

    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                role,
                setRole,
                userName,
                setUserName,
            }}
        >
            <div className="App">
                <BrowserRouter>
                    {/* <MainContainer> */}
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {role === "interviewer" && <Route path="/dashboard" element={<Dashboard />} />}
                        {role === "interviewee" && <Route path="/dashboard" element={<IntervieweeDashboard />} />}
                        <Route path="/host-meeting" element={<HostMeeting />} />
                        <Route path="/join_room" element={<JoinRoom />} />
                        <Route path="/meeting" element={<VideoCall />} />
                        <Route path="/add-test" element={<AddTestForm />} />
                        <Route path="/tests" element={<TestList />} />
                        <Route path="/test/:testId" element={<TestPage />} />
                        <Route path="/add-problem/:testId" element={<AddProblemPage />} />
                        <Route path="/conductedtest/:testId" element={<ConductedTest />} />
                        {/* <Route path="/compiler" element={<Compiler />} />
                        <Route path="/whiteBoard" element={<Canvas />} />
                        <Route path="/github" element={<UserPage />} />
                         */}
                    </Routes>
                    {/* </MainContainer> */}
                </BrowserRouter>
            </div>
        </AppContext.Provider>
    );
}

export default App;
