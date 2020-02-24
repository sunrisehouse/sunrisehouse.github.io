import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/container/Layout";
import PostPreview from "../components/presentaitional/PostPreview";
import SEO from "../components/container/Seo";

export default ({ data }) => {
    const posts = data.allMarkdownRemark.edges;

    return (
        <Layout>
            <SEO
                title="home"
            />
            hi
    
            {
                posts.map(({ node }) => {
                    return (
                        <PostPreview
                            id={node.frontmatter.id}
                            title={node.frontmatter.title}
                            description={node.excerpt}
                            key={node.frontmatter.id}
                            imageFluid={node.frontmatter.image !== null ? node.frontmatter.image.childImageSharp.fluid : null}
                        />
                    );
                })
            }
        </Layout>
    );
};

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    frontmatter {
                        id
                        date(formatString: "MMMM DD, YYYY")
                        title
                        image {
                            childImageSharp {
                                fluid(maxWidth: 800) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    excerpt(pruneLength: 280)
                }
            }
        }
    }
`
