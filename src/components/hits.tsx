import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { connectHits } from 'react-instantsearch-dom';
import { HitsProvided, Hit } from 'react-instantsearch-core';

const StyleList = styled.ul`
    background: #212121;
    background-clip: content-box;
    border-radius: 4px;
    width: 100%;
`;

const StyleItem = styled.li`
    list-style: none;
    width: inherit;
    height: 38px;
    line-height: 38px;
    &:hover {
        background-color: #303030;
    }
`;

const StyledLink = styled(Link)`
    display: block;
    padding: 0 8px;
    height: 100%;
    color: #e6e6e6;
    font-size: 13px;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Hits: React.FC<HitsProvided<Hit>> = ({
    hits,
}) => {
    return (
        <StyleList>
            {hits.map(hit => (
                <StyleItem key={hit.id}>
                    <StyledLink to={`/video/${hit.slug}`}>
                        {hit.title}
                    </StyledLink>
                </StyleItem>
            ))}    
        </StyleList>
    )
};

export default connectHits(Hits);
