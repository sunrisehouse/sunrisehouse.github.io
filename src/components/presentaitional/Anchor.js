import React from 'react';

import scrollTo from 'gatsby-plugin-smoothscroll';

import './Anchor.css';

export default ({ title, href, children }) => {
    return (
        <div className="anchor">
            <div onClick={() => scrollTo(href)}>
                {title}
            </div>
            {children}
        </div>
    );
};
