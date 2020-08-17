import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Nav from '../components/nav';
import Button from '../components/navButton';
import CategoryBar from '../components/categoryBar';
import Breadcrumbs from '../components/breadCrumbs';
import SEO from '../components/seo';
import Footer from '../components/footer';
import { IPostData, ICategoryData } from '../types';
import media from '../components/media';

interface IArchiveProps {
    pageContext: {
        postData: { node: IPostData }[];
        categoryData: { node: ICategoryData }[];
        singleCategoryData: { node: ICategoryData }[];
    };
}

const StyledContainer = styled.div`
    overflow: hidden;
    flex-grow: 1;
    flex-shrink: 1;
    ${media.pc`
        width: 84%;
        min-width: 720px;
    `}
    ${media.sp`
        width: 100%;
    `}
`;

const StyledMainContents = styled.main`
    width: 100%;
    box-sizing: border-box;
    ${media.pc`
        padding: 0 40px;
    `}
    ${media.sp`
        padding: 0 10px;
    `}
`;

const StyledInner = styled.div`
    display: flex;
    flex-wrap: wrap;
    ${media.sp`
        justify-content: space-between;
    `}
`;

const StyledSection = styled.section`
    padding: 30px 0;
`;

const StyledHeadline = styled.h2`
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 400;
`;

const StyledCard = styled.div`
    background-color: #303030;
    ${media.pc`
        margin-right: 20px;
        margin-bottom: 40px;
        width: 340px;
    `}
    ${media.sp`
        margin-bottom: 20px;
        width: calc(50% - 10px);
    `}
`;

const StyledLink = styled(Link)`
    display: block;
    text-decoration: none;
`;

const StyledImageWrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    ${media.pc`
        height: 190px;
    `}
    ${media.sp`
        padding-bottom: 56.25%;
    `}
`;

const StyledImage = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: auto;
    transform: translate3d(-50%, -50%, 0);
`;

const StyledCaption = styled.div`
    display: block;
    padding: 10px 8px;
    box-sizing: border-box;
    color: #fff;
    font-size: 18px;
    ${media.pc`
        height: 74px;
        font-size: 18px;
    `}
    ${media.sp`
        height: calc((2em * 1.4) + 20px);
        font-size: 16px;
    `}
`;

const StyledText = styled.span`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    max-height: calc(2em * 1.4);
`;

const StyledButtonWrapper = styled.div`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 9999;
    ${media.pc`
        display: none;
    `}
    ${media.sp`
        display: block;
    `}
`;

const ArchivePageComponent: React.FC<IArchiveProps> = props => {
    const propsData = props;
    const { postData, categoryData, singleCategoryData } = propsData.pageContext;
    const [state, setState] = useState(false);
    return (
        <Layout>
            <SEO
                title={`${singleCategoryData[0].node.name}のVR無料動画一覧`}
                description={`${singleCategoryData[0].node.name}のVR無料動画｜Extreme VRは、エクストリームスポーツを気軽にVR体験できる無料動画サービスです。`}
            />
            <StyledButtonWrapper onClick={() => (state ? setState(false) : setState(true))}>
                <Button isOpen={state} />
            </StyledButtonWrapper>
            <Nav isOpen={state}>
                <CategoryBar categoryData={categoryData} />
            </Nav>
            <StyledContainer>
                <StyledMainContents>
                    <Breadcrumbs categoryData={singleCategoryData} />
                    <StyledSection>
                        <StyledHeadline>
                            {singleCategoryData.map(({ node }: { node: ICategoryData }) => (
                                <span key={node.slug}>「{node.name}」</span>
                            ))}
                        </StyledHeadline>
                        <StyledInner>
                            {postData.map(({ node }: { node: IPostData }) => (
                                <StyledCard key={node.id}>
                                    <StyledLink to={`/video/${node.slug}`}>
                                        <StyledImageWrapper>
                                            <StyledImage
                                                src={`https://img.youtube.com/vi/${node.acf.video_id}/mqdefault.jpg`}
                                                alt={node.title}
                                            />
                                        </StyledImageWrapper>
                                        <StyledCaption>
                                            <StyledText>{node.title}</StyledText>
                                        </StyledCaption>
                                    </StyledLink>
                                </StyledCard>
                            ))}
                        </StyledInner>
                    </StyledSection>
                </StyledMainContents>
                <Footer />
            </StyledContainer>
        </Layout>
    );
};

export default ArchivePageComponent;
