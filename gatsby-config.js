/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const env = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

require('dotenv').config({
    path: `.env.${env}`,
})

const queries = require('./src/utils/algolia')

module.exports = {
    siteMetadata: {
        title: `${process.env.GATSBY_SITE_NAME}`,
        description: `${process.env.GATSBY_SITE_DESCRIPTION}`,
        author: `@${process.env.GATSBY_SITE_AUTHOR}`,
        siteUrl: `${process.env.GATSBY_SITE_URL_PROTOCOL}://${process.env.GATSBY_SITE_URL_PATH}`,
        image: `${process.env.GATSBY_SITE_IMAGE_PATH}`,
        googleSiteVerification: `${process.env.GATSBY_GOOGLE_SITE_VERIFICATION}`,
        social: {
            twitter: 'https://www.twitter.com/',
            facebook: 'https://www.facebook.com/',
            email: 'ex_vr_test@gmail.com',
            linkedin: 'https://www.linkedin.com/in/',
            github: 'https://www.github.com/',
        },
    },
    plugins: [
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-typescript`,
        'gatsby-plugin-styled-components',
        'gatsby-plugin-sass',
        'gatsby-plugin-react-helmet',
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
                minimizeDeprecationNotice: true,
                baseUrl: `${process.env.GATSBY_WORDPRESS_URL_PATH}`,
                protocol: `${process.env.GATSBY_WORDPRESS_URL_PROTOCOL}`,
                hostingWPCOM: false,
                useACF: true,
                includedRoutes: ['**/video', '**/video_categories', '**/pages', '**/media', '**/taxonomies', '**/tags'],
            },
        },
        ...(process.env.GATSBY_GOOGLE_ANALYTICS ? [
            {
                resolve: 'gatsby-plugin-google-analytics',
                options: {
                    trackingId: process.env.GATSBY_GOOGLE_ANALYTICS,
                    head: true,
                },
            },
        ] : []),
        ...(process.env.GATSBY_ALGOLIA_UPDATE_INDEX === 'true' ? [
            {
              resolve: `gatsby-plugin-algolia`,
              options: {
                appId: process.env.GATSBY_ALGOLIA_APP_ID,
                apiKey: process.env.ALGOLIA_ADMIN_KEY,
                indexName: process.env.GATSBY_ALGOLIA_INDEXNAME,
                queries
              }
            }
        ] : [])
    ],
}
