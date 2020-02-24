import React from 'react';

import { Link } from "gatsby"
import Img from "gatsby-image"

import DefaultPostImg from '../container/DefaultPostImg';

export default ({ id, title, description, imageFluid }) => {
    return (
        <Link to={`/posts/${id}`}>
            {
                imageFluid !== null ?
                    <Img fluid={imageFluid} />
                :
                    <DefaultPostImg />
            }
            <div>id: {id}</div>
            <div>title: {title}</div>
            <div>description: {description}</div>
        </Link>
    );
};
