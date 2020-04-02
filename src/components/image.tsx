import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

interface IImageProps {
    filename: string;
    alt?: string;
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
                                sizes(maxWidth: 300) {
                                    ...GatsbyImageSharpSizes
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={data => {
            const image = data.images.edges.find(n => {
                return n.node.relativePath.includes(props.filename);
            });

            if (!image) return;

            const imageSizes = image.node.childImageSharp.sizes;
            return <Img sizes={imageSizes} alt={props.alt} />;
        }}
    />
);
