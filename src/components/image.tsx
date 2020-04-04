import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';

interface IImageProps {
    filename: string;
    alt?: string;
    style?: object;
}

export default (props: IImageProps) => (
    <StaticQuery
        query={graphql`
            query {
                images: allFile {
                    edges {
                        node {
                            relativePath
                            name
                            childImageSharp {
                                sizes {
                                    ...GatsbyImageSharpSizes
                                }
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={data => {
            const { filename, alt, style } = props;
            const image = data.images.edges.find(n => {
                return n.node.relativePath.includes(filename);
            });

            if (!image) return;

            const imageFluid = image.node.childImageSharp.fluid;
            return <Img fluid={imageFluid} alt={alt} style={style} />;
        }}
    />
);
