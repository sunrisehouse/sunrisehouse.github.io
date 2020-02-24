import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from '../components/container/Layout';
import SEO from "../components/container/Seo";
import FixedRightSideBar from "../components/presentaitional/FixedRightSideBar";
import MarkdownAutoLink from "../components/container/MarkdownAutoLink";

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
                    {
                        frontmatter.image &&
                        <Img fluid={frontmatter.image.childImageSharp.fluid} />
                    }
                    <h1>{frontmatter.title}</h1>
                    <h2>{frontmatter.date}</h2>
                    <div
                        className="blog-post-content"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>
            <FixedRightSideBar>
                <MarkdownAutoLink/>
            </FixedRightSideBar>
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
                image {
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`