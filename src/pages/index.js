import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/container/Layout";
import PostPreview from "../components/presentaitional/PostPreview";

export default ({ data }) => {
    const posts = data.allMarkdownRemark.edges;

    return (
        <Layout>
            hi

            {
                posts.map(({ node }) => {
                    return (
                        <PostPreview
                            id={node.frontmatter.id}
                            title={node.frontmatter.title}
                            description={node.excerpt}
                            key={node.frontmatter.id}
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
                }
                excerpt(pruneLength: 280)
            }
        }
    }
  }
`
