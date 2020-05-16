import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { ICategoryData } from '../types';

interface ICategoryBarProps {
    categoryData: { node: ICategoryData }[];
}

const StyledList = styled.ul`
    width: 100%;
    height: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    transition: transform 0.5s;
    transform: translate3d(0, 0, 0);
    list-style: none;
`;

const StyledSubList = styled.ul`
    overflow: hidden;
    width: 100%;
    height: auto;
    max-height: 0;
    padding: 0 10px;
    box-sizing: border-box;
    transition: max-height 0.5s;
    list-style: none;
    &.active {
        max-height: 100vh;
    }
`;

const StyledItem = styled.li`
    font-size: 16px;
`;

const StyledButton = styled.a`
    position: relative;
    display: block;
    padding: 0.5em 10px;
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
    &:hover {
        background-color: #6d6d6d;
    }
`;

const StyledLink = styled(Link)`
    position: relative;
    display: block;
    padding: 0.5em 10px;
    color: #ffffff;
    text-decoration: none;
    &:hover {
        background-color: #6d6d6d;
    }
`;

const StyledIcon = styled.i`
    position: absolute;
    top: 50%;
    right: 10px;
    border: 2px solid;
    border-color: #565656 #565656 transparent transparent;
    width: 10px;
    height: 10px;
    transform: translate3d(0, -50%, 0) rotate(45deg);
    transition: transform 0.5s;
    .active & {
        transform: translate3d(0, -50%, 0) rotate(135deg);
    }
`;

const CategoryBarComponent: React.FC<ICategoryBarProps> = props => {
    const { categoryData } = props;
    const toggleOnClick = (event: React.MouseEvent<HTMLElement>) => {
        const number = event.currentTarget.getAttribute('data-button');
        const target = document.querySelector(`[data-list="${number}"]`);
        if (target) {
            event.currentTarget.classList.toggle('active');
            target.classList.toggle('active');
        }
    };
    return (
        <StyledList>
            {categoryData.map(({ node }: { node: ICategoryData }, index) =>
                node.subCategoryData && node.subCategoryData.length ? (
                    <StyledItem key={node.slug}>
                        <StyledButton data-button={index} onClick={toggleOnClick}>
                            {node.name}
                            <StyledIcon />
                        </StyledButton>
                        <StyledSubList data-list={index}>
                            <StyledItem>
                                <StyledLink to={`/video/category/${node.slug}`}>すべて</StyledLink>
                            </StyledItem>
                            {node.subCategoryData.map((data: ICategoryData) => (
                                <StyledItem key={data.slug}>
                                    <StyledLink to={`/video/category/${data.slug}`}>{data.name}</StyledLink>
                                </StyledItem>
                            ))}
                        </StyledSubList>
                    </StyledItem>
                ) : (
                    <StyledItem key={node.slug}>
                        <StyledLink to={`/video/category/${node.slug}`}>{node.name}</StyledLink>
                    </StyledItem>
                )
            )}
        </StyledList>
    );
};

export default CategoryBarComponent;
