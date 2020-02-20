import React from 'react';

import './FixedRightSideBar.css';

export default ({ children }) => {
    return (
        <div className="fixed-right-side-bar">
            {children}
        </div>
    );
};
