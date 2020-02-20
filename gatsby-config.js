/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    /* Your site config here */
    siteMetadata: {
        title: 'HanJungwoo',
        description: 'Han Jungwoo Blog',
        author: '@HanJungwoo',
    },
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'posts',
                path: `${__dirname}/posts/`,
            },
        },
        {
            resolve: 'gatsby-transformer-remark', // gatsby-source-filesystem 뒤에 와야함.
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 960,
                        }
                    }
                ]
            }
        },
        {
            resolve: 'gatsby-plugin-react-helmet',
        },
        {
            resolve: 'gatsby-plugin-sharp',
        },
    ]
};
