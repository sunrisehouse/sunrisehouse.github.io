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
                        resolve: 'gatsby-remark-images',    // margin down 내 image 넣기 위해 추가
                        options: {
                            maxWidth: 730,
                        }
                    },
                    {
                        resolve: 'gatsby-remark-autolink-headers',
                        options: {
                            className: 'hello',
                        }
                    },
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
