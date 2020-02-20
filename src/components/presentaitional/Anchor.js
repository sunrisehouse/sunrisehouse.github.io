import React from 'react';

import './Anchor.css';

export default ({ title, href, children }) => {
    return (
        <div className="anchor">
            <a href={href}>
                {title}
            </a>
            {children}
        </div>
    );
};
