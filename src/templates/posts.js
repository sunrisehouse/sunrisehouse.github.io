import React from "react"
import { graphql } from "gatsby"

import Layout from '../components/container/Layout';
import SEO from "../components/container/Seo";

// this prop will be injected by the GraphQL query below.
export default ({ data }) => {
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter, html, excerpt } = markdownRemark
    return (
        <Layout>
            <SEO
                title={frontmatter.title}
                description={excerpt}
            />
            <div className="blog-post-container">
                <div className="blog-post">
                    <h1>{frontmatter.title}</h1>
                    <h2>{frontmatter.date}</h2>
                    <div
                        className="blog-post-content"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query($postId: String!) {
        markdownRemark(frontmatter: { id: { eq: $postId } }) {
            html
            excerpt(pruneLength: 160)
            frontmatter {
                id
                date(formatString: "MMMM DD, YYYY")
                title
            }
        }
    }
`