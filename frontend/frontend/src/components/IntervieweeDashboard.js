import * as React from "react";
import { useState, useContext } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "../assets/styles/IntervieweeNavbar.css";
import Footer from "./Footer"
import DashboardContent from "./DashboardContent";
import { AppContext } from "../App";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function IntervieweeDashboard() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [Test, setTest] = useState(false);
    const [Interview, setInterview] = useState(false);
    const [testId, setTestId] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [roomID, setRoomID] = useState('');
    const { setIsLoggedIn, setRole, setUserName, isLoggedIn, userName } = useContext(AppContext);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handelTestIdSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `http://localhost:8000/api/tests/checkTestId/${testId}`
            );
            if (response.status == 201) {
                // setSuccess(response.data.message);
                window.location.href = `/conductedtest/${testId}`;
            }
        } catch (e) {
            setError("Your Test Id is Incorrect!");
        }
    };
    const handleInterviewSubmit = async (e) => {
        e.preventDefault();
        try {
            window.location.href = `/meeting?roomID=${roomID}`;
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('role');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('password');
        localStorage.removeItem('email');
        setUserName(null);
        setRole('');
        setIsLoggedIn(false);
        window.location.href = '/login';
    };

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: "rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            InterviewMap
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            InterviewMap
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            <Button
                                onClick={() => setTest(true)}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                Opt for a Test
                            </Button>
                            <Dialog
                                visible={Test}
                                style={{ width: "50vw" }}
                                onHide={() => setTest(false)}
                            >
                                <div className="container-jointest">
                                    <div className="login form">
                                        <header>Enter Test Id</header>
                                        <form onSubmit={handelTestIdSubmit}>
                                            <input
                                                type="text"
                                                placeholder="Enter Test ID"
                                                value={testId}
                                                onChange={(e) => setTestId(e.target.value)}
                                            />
                                            <input type="submit" className="button" value="Join" />
                                            <center>
                                                {success && (
                                                    <p style={{ color: "green" }}>
                                                        <b>{success}</b>
                                                    </p>
                                                )}
                                                {error && <p style={{ color: "red" }}>{error}</p>}
                                            </center>
                                        </form>
                                    </div>
                                </div>
                            </Dialog>

                            <Button
                                onClick={() => setInterview(true)}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                Join Interview
                            </Button>
                            <Dialog
                                visible={Interview}
                                style={{ width: "50vw" }}
                                onHide={() => setInterview(false)}
                            >
                                <div className="container-jointest">
                                    <div className="login form">
                                        <header>Join Interview</header>
                                        <form onSubmit={handleInterviewSubmit}>
                                            <input
                                                type="text"
                                                placeholder="Enter room ID"
                                                value={roomID}
                                                onChange={(e) => setRoomID(e.target.value)}
                                            />
                                            <input type="submit" className="button" value="Join" />
                                            <center>
                                                {success && (
                                                    <p style={{ color: "green" }}>
                                                        <b>{success}</b>
                                                    </p>
                                                )}
                                                {error && <p style={{ color: "red" }}>{error}</p>}
                                            </center>
                                        </form>
                                    </div>
                                </div>
                            </Dialog>
                            {isLoggedIn && (
                                <Button
                                onClick={handleLogout}
                                sx={{ my: 2, color: "white", display: "block" , marginLeft: "70%"}}
                            >logout</Button>
                                
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <DashboardContent />
            <Footer />
        </>
    );
}
export default IntervieweeDashboard;
