import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { ICategoryData } from '../types';

interface ICategoryBarProps {
    categoryData: { node: ICategoryData }[];
}

const StyledList = styled.ul`
    background-color: #303030;
    width: 100%;
    height: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    transition: transform 0.5s;
    transform: translate3d(0, 0, 0);
    list-style: none;
    &.active {
        transform: translate3d(-100%, 0, 0);
    }
`;

const StyledSubList = styled.ul`
    position: absolute;
    top: 0;
    left: 100%;
    background-color: #303030;
    width: 100%;
    height: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.5s;
    list-style: none;
    &.active {
        z-index: 9;
        opacity: 1;
    }
`;

const StyledItem = styled.li`
    font-size: 16px;
`;

const StyledButton = styled.span`
    position: relative;
    display: block;
    padding: 0.5em 10px;
    color: #ffffff;
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
`;

const CategoryBarComponent: React.FC<ICategoryBarProps> = props => {
    const { categoryData } = props;
    const toggleOnClick = (event: React.MouseEvent<HTMLElement>) => {
        const number = event.currentTarget.getAttribute('data-button');
        const target = document.querySelector(`[data-list="${number}"]`);
        if (target) {
            target.classList.toggle('active');
            const parent = target.closest('nav > ul');
            if (parent) {
                parent.classList.toggle('active');
            }
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
                                <StyledButton data-button={index} onClick={toggleOnClick}>
                                    カテゴリートップ
                                </StyledButton>
                            </StyledItem>
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
