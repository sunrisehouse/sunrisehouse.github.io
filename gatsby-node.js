const path = require(`path`)
exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
    const postsTemplateComponent = path.resolve(`src/templates/posts.js`)
    const result = await graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
            ) {
                edges {
                node {
                    frontmatter {
                        id
                    }
                }
                }
            }
        }
    `)
    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: `/posts/${node.frontmatter.id}`,
            component: postsTemplateComponent,
            context: {
                postId: node.frontmatter.id,
            }, // additional data can be passed via context
        })
    })
}