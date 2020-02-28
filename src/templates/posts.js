import React, { useMemo } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from '../components/container/Layout';
import SEO from "../components/container/Seo";
import FixedRightSideBar from "../components/presentaitional/FixedRightSideBar";
import MarkdownAutoLink from "../components/container/MarkdownAutoLink";
import RelatedPosts from "../components/presentaitional/RelatedPosts";

export default ({ data }) => {
    const {
        markdownRemark: {
            frontmatter,
            html,
            excerpt
        },
        allMarkdownRemark: {
            edges,
        },
    } = data;

    const relatedPostList = useMemo(() => {
        return edges.map((edge) => {
            const { id, title } = edge.node.frontmatter;
            return {
                id,
                title,
            };
        }) 
    }, [edges]);

    console.log('sdfds', relatedPostList)

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
                <MarkdownAutoLink />
                <RelatedPosts relatedPostList={relatedPostList}/>
            </FixedRightSideBar>
        </Layout>
    );
};

export const pageQuery = graphql`
    query($postId: Int!, $relatedPostIds: [Int!]!) {
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
        allMarkdownRemark(filter: {frontmatter: {id: {in: $relatedPostIds}}}) {
            edges {
                node {
                    frontmatter {
                        id
                        title
                    }
                }
            }
        }
    }
`;
