import React from 'react';

import './PageWrapper.css';

export default ({ children }) => {
    return (
        <div className="page-wrapper">
            {children}
        </div>
    );
};