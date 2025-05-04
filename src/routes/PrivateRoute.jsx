import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    // const user = false;
    return (
        <div>
            { user && children }
        </div>
    );
};

export default PrivateRoute;