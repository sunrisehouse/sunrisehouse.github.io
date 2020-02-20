import React from 'react';
import { Link } from "gatsby"

export default ({ id, title, description, image }) => {
    return (
        <Link to={`/posts/${id}`}>
            <div>id: {id}</div>
            <div>title: {title}</div>
            <div>description: {description}</div>
            <div>image: {image}</div>
        </Link>
    );
};
