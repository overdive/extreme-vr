import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { IPostData, ICategoryData } from '../types';

interface IBreadCrumbsProps {
    categoryData: { node: ICategoryData }[];
    singlePageData?: { node: IPostData };
}

const StyledList = styled.ul`
    padding-top: 6px;
    font-size: 0px;
`;

const StyledItem = styled.li`
    position: relative;
    display: inline-block;
    &:nth-child(n + 2) {
        padding-left: 20px;
        &::before {
            position: absolute;
            top: calc(50% - 1px);
            left: 2px;
            display: block;
            content: '';
            margin-top: -2px;
            width: 8px;
            height: 8px;
            border-top: solid 2px;
            border-right: solid 2px;
            transform: rotate(45deg) translateY(-50%);
            color: inherit;
            font-size: 14px;
        }
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
    vertical-align: middle;
    color: #ffffff;
    font-size: 14px;
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
