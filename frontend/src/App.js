// import React from 'react';
import { styled } from '@mui/material/styles';
import React, { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
// import Dashboard from './DashBoard';
// import VideoCall from './VideoCall';
// import JoinRoom from './JoinRoom';
// import Compiler from './Compiler';
// import Canvas from './Canvas';
// import AddTestForm from './Interviewer/AddTestForm';
// import AddProblemForm from './Interviewer/AddProblemForm';
// import TestList from './Interviewer/TestList';
// import Test from './Interviewer/Test';
// import UserPage from './containers/UserPage';
// import ConductedTest from './Interviewee/ConductedTest';
// import HostMeeting from './Interviewer/HostMeeting';


export const AppContext = createContext();


// const MainContainer = styled('div')({
//     marginLeft: 240, // Adjust this value according to the width of your Sidebar
//     flexGrow: 1,
// });


function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' || false);
   const [role, setRole] = useState(localStorage.getItem('role'));
   const [userName, setUserName] = useState(localStorage.getItem('userName'));


   return (
       <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole, userName, setUserName }}>
           <div className="App">
               <BrowserRouter>
                   {/* <Sidebar /> */}
                   {/* <MainContainer> */}
                   <Routes>
                       <Route path="/" element={<Register />} />
                       <Route path="/login" element={<Login />} />
                       {/* <Route path="/dashboard" element={<Dashboard />} />
                       <Route path="/meeting" element={<VideoCall />} />
                       <Route path="/join_room" element={<JoinRoom />} />
                       <Route path="/compiler" element={<Compiler />} />
                       <Route path="/whiteBoard" element={<Canvas />} />
                       <Route path="/add-problem/:testId" element={<AddProblemForm />} />
                       <Route path="/add-test" element={<AddTestForm />} />
                       <Route path="/tests" element={<TestList />} />
                       <Route path="/test/:testId" element={<Test />} />
                       <Route path="/github" element={<UserPage />} />
                       <Route path="/conductedtest/:testId" element={<ConductedTest />} />
                       <Route path="/host-meeting" element={<HostMeeting />} /> */}
                   </Routes>
                   {/* </MainContainer> */}
               </BrowserRouter>
           </div>
       </AppContext.Provider>
   );
}


export default App;



