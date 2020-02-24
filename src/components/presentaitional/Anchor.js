import React from 'react';

import scrollTo from 'gatsby-plugin-smoothscroll';

import './Anchor.css';

export default ({ title, href, depth, isSelected }) => {
    return (
        <div className={`anchor ${isSelected? 'selected' : ''} depth${depth}`} onClick={() => scrollTo(href)}>
            {title}
        </div>
    );
};
