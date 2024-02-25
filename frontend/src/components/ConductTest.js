import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/ConductTest.css'; // Assuming you have existing CSS styles
import ProblemDetails from './ProblemDetails';
import Swal from 'sweetalert2';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ConductedTest = () => {
    const { testId } = useParams();
    const [test, setTest] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [problemsPerPage] = useState(1); // Adjust as needed

    const redirectToScorePage = () => {
        // Redirect to the score page
        window.location.href = '/dashboard';
    };

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/tests/${testId}`);
                setTest(response.data);
                localStorage.setItem('time', response.data.time);
                // Retrieve the predefined time limit from the database (assuming it's in seconds)
                const timeLimitInSeconds = 10; // Replace with actual time limit from the database
                const storedStartTime = localStorage.getItem(`startTime_${testId}`);
                const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
                if (storedStartTime) {
                    const elapsedTime = currentTime - parseInt(storedStartTime);
                    const remainingTime = Math.max(timeLimitInSeconds - elapsedTime, 0);
                    setStartTime(parseInt(storedStartTime));
                    setRemainingTime(remainingTime);
                } else {
                    setStartTime(currentTime);
                    setRemainingTime(timeLimitInSeconds);
                    localStorage.setItem(`startTime_${testId}`, currentTime.toString());
                }
            } catch (error) {
                console.error('Error fetching test:', error);
            }
        };
        fetchTest();
    }, [testId]);

    useEffect(() => {
        const checkFullScreen = () => {
            // Check if the document is in full screen mode
            const isInFullScreen =
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement;

            // If not in full screen, prompt the user
            if (!isInFullScreen) {
                Swal.fire({
                    title: 'Enter Full Screen',
                    text: 'Enter full screen as test is started',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                }).then(result => {
                    if (result.isConfirmed) {
                        // Enter full screen
                        if (document.documentElement.requestFullscreen) {
                            document.documentElement.requestFullscreen();
                        } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
                            document.documentElement.webkitRequestFullscreen();
                        } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
                            document.documentElement.msRequestFullscreen();
                        }
                    }
                });
            }
        };

        // Check full screen state every 5 seconds
        const interval = setInterval(checkFullScreen, 15000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (startTime !== null) {
                const currentTime = Math.floor(Date.now() / 1000);
                const elapsedTime = currentTime - startTime;
                const timeLimitInSeconds = localStorage.getItem('time');
                const remainingTime = Math.max(timeLimitInSeconds - elapsedTime, 0);
                setRemainingTime(remainingTime);
                if (remainingTime === 0) {
                    clearInterval(timer);
                    redirectToScorePage();
                }
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [startTime]);

    const handleEndTest = () => {
        localStorage.removeItem(`startTime_${testId}`);
        redirectToScorePage();
    };

    // Logic for pagination
    const indexOfLastProblem = currentPage * problemsPerPage;
    const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
    const currentProblems = test && test.problems.slice(indexOfFirstProblem, indexOfLastProblem);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div className="test-container">
            {remainingTime !== null && (
                <div className="d-flex justify-content-between align-items-center">
                    <div className="remaining-time text-center">
                        Remaining Time: {remainingTime} seconds
                    </div>
                    <button className="btn btn-danger" onClick={handleEndTest}>End Test</button>
                </div>
            )}
            <br />
            <h2>Questions</h2>
            <ul>
                {currentProblems && currentProblems.map(problem => (
                    <ProblemDetails key={problem.id} selectedProblem={problem} />
                ))}
            </ul>
            {/* Pagination */}
            <Stack direction="row" justifyContent="center" spacing={2}>
                <button className="btn btn-secondary" onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                {/* <Pagination
                    count={Math.ceil((test?.problems.length || 0) / problemsPerPage)}
                    page={currentPage}
                    onChange={handleNextPage}
                    variant="outlined"
                    shape="rounded"
                    boundaryCount={0}
                    siblingCount={0}
                /> */}
                <button className="btn btn-secondary" onClick={handleNextPage} disabled={currentPage === Math.ceil((test?.problems.length || 0) / problemsPerPage)}>
                    Next
                </button>
            </Stack>
        </div>
    );
};

export default ConductedTest;
