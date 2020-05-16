import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { IPostData, ICategoryData } from '../types';

interface IBreadCrumbsProps {
    categoryData: { node: ICategoryData }[];
    singlePageData?: { node: IPostData };
}

const StyledList = styled.ul`
    overflow: hidden;
    display: flex;
    align-content: flex-start;
    margin-top: 6px;
    text-overflow: ellipsis;
    white-space: nowrap;
    list-style: none;
`;

const StyledItem = styled.li`
    position: relative;
    font-size: 14px;
    &:nth-child(n + 2) {
        padding-left: 20px;
        &::before {
            position: absolute;
            top: calc(50% - 4.6px);
            left: 7px;
            display: block;
            content: '';
            width: 8px;
            height: 8px;
            border-top: solid 2px;
            border-right: solid 2px;
            transform: rotate(45deg) translateX(-50%);
            color: inherit;
        }
    }
    &:nth-child(3) {
        overflow: hidden;
    }
`;

const StyledLink = styled(Link)`
    color: #ffffff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const StyledText = styled.span`
    display: inline-block;
    overflow: hidden;
    max-width: 100%;
    color: #ffffff;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const BreadCrumbsComponent: React.FC<IBreadCrumbsProps> = props => {
    const { categoryData, singlePageData } = props;
    return (
        <StyledList>
            <StyledItem>
                <StyledText>
                    <StyledLink to="/">ホーム</StyledLink>
                </StyledText>
            </StyledItem>
            {categoryData ? (
                <StyledItem>
                    {categoryData.map(({ node }: { node: ICategoryData }, index) => (
                        <StyledText key={node.slug}>
                            {index >= 1 ? '・' : ''}
                            <StyledLink to={'/video/category/' + node.slug}>{node.name}</StyledLink>
                        </StyledText>
                    ))}
                </StyledItem>
            ) : null}
            {singlePageData ? (
                <StyledItem>
                    <StyledText>{singlePageData.node.title}</StyledText>
                </StyledItem>
            ) : null}
        </StyledList>
    );
};

export default BreadCrumbsComponent;
