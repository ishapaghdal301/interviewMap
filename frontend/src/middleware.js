import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from './App';

export const ProtectedRoute = ({ element }) => {
    const { isLoggedIn } = useContext(AppContext);

    return isLoggedIn ? element : <Navigate to="/login" />;
};
