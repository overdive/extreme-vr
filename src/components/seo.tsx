import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export interface ISeoProps {
    description?: string;
    lang?: string;
    meta?: any[];
    title: string;
}

const SeoComponent: React.FC<ISeoProps> = props => {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    author
                }
            }
        }
    `);
    const metaSiteTitle = ~props.title.indexOf('|') ? '' : `%s | ${site.siteMetadata.title}`;
    const metaDescription = props.description || site.siteMetadata.description;
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
                    name: 'twitter:card',
                    content: 'summary',
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
