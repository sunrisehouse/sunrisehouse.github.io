const path = require(`path`)
const Category = require('./src/datum/category');

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

    console.log('==============<Create Category>===============');
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const postId = node.frontmatter.id;
        const relatedPostIds = getRelatedPostIds(postId);

        console.log('sdfsd', relatedPostIds);

        createPage({
            path: `/posts/${postId}`,
            component: postsTemplateComponent,
            context: {
                postId,
                relatedPostIds,
            }, // additional data can be passed via context
        });
    });
};

const getRelatedPostIds = (postId) => {
    const relatedIds = [];

    const categoryNodeOfPost = Category.getCategoryNodeByPostId(Category.CATEGORY, postId);

    if (categoryNodeOfPost) {
        relatedIds.push(...Category.getAllPostIdsOfCategoryNode(categoryNodeOfPost));
    }

    return relatedIds;
}