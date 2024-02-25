// import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
// import AdbIcon from '@mui/icons-material/Adb';
import { AppContext } from '../App';
import { useState, useContext } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';

const pages = [
    { name: "Host a Meeting", path: "/host-meeting" },
    { name: "Join a Meeting", path: "/join_room" },
    // { name: "New Meeting", path: "/meeting"},
    { name: "View Test", path: "/tests" },
];

const Navbar = () => {
    const role = localStorage.getItem('role');
    const { setIsLoggedIn, setRole, setUserName, isLoggedIn, userName } = useContext(AppContext);
    const settings = ["Profile", "Your Meetings", "Logout"];
    // const { isLoggedIn, userName } = useContext(AppContext);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNotifications, setAnchorElNotifications] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
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
    
    const handleOpenNotifications = (event) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {
        setAnchorElNav(null);
        const selectedPage = pages.find((p) => p.name === page);
        if (selectedPage) {
            window.location.href = selectedPage.path;
        }
    };

    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);

        if (setting === 'User Profile') {
            window.location.href = `/profile/${userName}`;
        } else if (setting === 'Logout') {
            localStorage.removeItem('userName');
            localStorage.removeItem('role');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('password');
            localStorage.removeItem('email');
            setUserName(null);
            setRole('');
            setIsLoggedIn(false);
            window.location.href = '/login';
        }
    };


    const handleCloseNotifications = () => {
        setAnchorElNotifications(null);
    };

    const handleLogin = () => {
        window.location.href = "/login";
    };

    const handleSignUp = () => {
        window.location.href = "/register";
    };

    return (
        <>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: { xs: 1, md: 2 },
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            InterviewMap
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={() => handleCloseNavMenu()}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.name)}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: { xs: 2, md: 4 },
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            InterviewMap
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => handleCloseNavMenu(page.name)}
                                    sx={{ my: { xs: 1, md: 2 }, color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        {/* Search Bar */}
                        {/* <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search> */}

                        {/* {isLoggedIn && (
                            <Box sx={{ flexGrow: 0, marginLeft: { xs: 0, md: 2 }, marginRight: 4 }}>
                                <Tooltip title="Open notifications">
                                    <IconButton onClick={handleOpenNotifications} sx={{ p: 0 }}>
                                        <Badge badgeContent={4} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: { xs: 2, md: '45px' } }}
                                    id="menu-notifications"
                                    anchorEl={anchorElNotifications}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElNotifications)}
                                    onClose={handleCloseNotifications}
                                >
                                    <MenuItem>
                                        <Typography textAlign="center">Messages</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <Typography textAlign="center">Notifications</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )} */}

                        {isLoggedIn && (
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ mb: 10 }} />
        </>
    );
};

export default Navbar;
