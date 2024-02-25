import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const TestList = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/tests');
                setTests(response.data);
            } catch (error) {
                console.error('Error fetching tests:', error);
            }
        };
        fetchTests();
    }, []);

    return (
        <Container style={{ marginTop: '100px' }}>
            <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Test List
                    </Typography>
                </Grid>
                <Grid item>
                    <Button component={Link} to="/add-test" variant="contained" color="primary" startIcon={<AddIcon />}>
                        Add Test
                    </Button>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tests.map((test, index) => (
                            <TableRow key={test._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{test.title}</TableCell>
                                <TableCell>
                                    <Button component={Link} to={`/test/${test._id}`} variant="outlined" color="primary" startIcon={<VisibilityIcon />}>
                                        View
                                    </Button>
                                    {/* Add additional actions as needed */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default TestList;
