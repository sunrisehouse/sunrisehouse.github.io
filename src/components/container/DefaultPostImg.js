import React from 'react';

import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => {
    const data = useStaticQuery(graphql`
        query defaultPostImageQuery {
            allImageSharp(filter: {fluid: {originalName: {eq: "default-post-image.png"}}}) {
                edges {
                    node {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    `);

    return (
        <Img fluid={data.allImageSharp.edges[0].node.fluid} />
    );
};
