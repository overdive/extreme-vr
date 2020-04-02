/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    /* Your site config here */
    siteMetadata: {
        title: `${process.env.GATSBY_SITE_NAME}`,
        description: `${process.env.GATSBY_SITE_DESCRIPTION}`,
        author: `@${process.env.GATSBY_SITE_AUTHOR}`,
        siteUrl: `${process.env.GATSBY_SITE_URL_PROTOCOL}://${process.env.GATSBY_SITE_URL_PATH}`,
        social: {
            twitter: 'https://www.twitter.com/',
            facebook: 'https://www.facebook.com/',
            email: 'ex_vr_test@gmail.com',
            linkedin: 'https://www.linkedin.com/in/',
            github: 'https://www.github.com/',
        },
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-wordpress`,
            options: {
                // your WordPress source
                baseUrl: `${process.env.GATSBY_WORDPRESS_URL_PATH}`,
                protocol: `${process.env.GATSBY_WORDPRESS_URL_PROTOCOL}`,
                // is it hosted on wordpress.com, or self-hosted?
                hostingWPCOM: false,
                // does your site use the Advanced Custom Fields Plugin?
                useACF: true,
                includedRoutes: ['**/video', '**/video_categories', '**/pages', '**/media', '**/taxonomies', '**/tags'],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-typescript`,
        'gatsby-plugin-styled-components',
        'gatsby-plugin-sass',
        'gatsby-plugin-react-helmet',
    ],
};
