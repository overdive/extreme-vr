import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export interface ISeoProps {
    description?: string;
    lang?: string;
    image?: string;
    title: string;
    meta?: any[];
}

const SeoComponent: React.FC<ISeoProps> = props => {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    author
                    image
                }
            }
        }
    `);
    const metaSiteTitle = ~props.title.indexOf('|') ? '' : `%s | ${site.siteMetadata.title}`;
    const metaDescription = props.description || site.siteMetadata.description;
    const metaImage = props.image || site.siteMetadata.image;
    return (
        <Helmet
            htmlAttributes={{ lang: props.lang }}
            title={props.title}
            titleTemplate={metaSiteTitle}
            meta={[
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    property: 'og:title',
                    content: props.title,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    property: 'og:image',
                    content: metaImage,
                },
                {
                    name: 'twitter:card',
                    content: metaImage,
                },
                {
                    name: 'twitter:creator',
                    content: site.siteMetadata.author,
                },
                {
                    name: 'twitter:title',
                    content: props.title,
                },
                {
                    name: 'twitter:description',
                    content: metaDescription,
                },
            ].concat(props.meta || [])}
        />
    );
};

SeoComponent.defaultProps = {
    lang: 'ja',
    meta: [],
    description: '',
};

export default SeoComponent;
