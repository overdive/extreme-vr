import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

interface ICategoryData {
    id: string;
    name: string;
    slug: string;
    wordpress_id: number;
}

interface ICategoryBarProps {
    categoryData: { node: ICategoryData }[];
}

const StyledList = styled.ul`
    background-color: #303030;
    width: 100%;
    height: 670px;
    padding: 20px 0;
    overflow-y: auto;
    box-sizing: border-box;
`;

const StyledItem = styled.li`
    &:hover {
        background-color: #6d6d6d;
    }
`;

const StyledLink = styled(Link)`
    display: block;
    padding: 0.5em 10px;
    color: #ffffff;
    font-size: 20px;
    text-decoration: none;
`;

const CategoryBarComponent: React.FC<ICategoryBarProps> = props => {
    const { categoryData } = props;
    return (
        <StyledList>
            {categoryData.map(({ node }: { node: ICategoryData }) => (
                <StyledItem key={node.slug}>
                    <StyledLink to={'/video/category/' + node.slug}>{node.name}</StyledLink>
                </StyledItem>
            ))}
        </StyledList>
    );
};

export default CategoryBarComponent;
