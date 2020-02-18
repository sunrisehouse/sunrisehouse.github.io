import React from 'react';

import { Link } from 'gatsby';

import './TopFixedHeader.css';

export default ({ title }) => {
    return (
        <>
            <header className="top-fixed-header">
                <Link to="/">
                    {title}
                </Link>
            </header>
            <div className="top-fixed-header-clear"></div>
        </>
    );
};
