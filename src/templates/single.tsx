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

interface ISinglePostProps {
    pageContext: {
        singlePostData: { node: IPostData };
        singleCategoryData: { node: ICategoryData }[];
        categoryData: { node: ICategoryData }[];
        recommendData: { node: IPostData }[];
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

const StyledSection = styled.section`
    padding: 30px 0;
`;

const StyledIframeWrapper = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 56.25%;
`;

const StyledIframe = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    width: 100%;
    height: 100%;
`;

const StyledHeadline = styled.h1`
    margin-top: 10px;
    font-size: 26px;
    font-weight: 400;
`;

const StyledInner = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-top: 40px;
    ${media.sp`
        justify-content: space-between;
    `}
`;

const StyledCard = styled.div`
    background-color: #303030;
    ${media.pc`
        margin-bottom: 30px;
        width: calc(25% - 9px);
        margin-right: 12px;
        :nth-of-type(4n) {
            margin-right: 0;
        }
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
    padding-top: 56.25%;
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
    height: calc(2em * 1.4 + 20px);
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
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

const SinglePageComponent: React.FC<ISinglePostProps> = props => {
    const propsData = props;
    const { singlePostData, singleCategoryData, categoryData, recommendData } = propsData.pageContext;
    const [state, setState] = useState(false);
    return (
        <Layout>
            <SEO
                title={`${singlePostData.node.title}のVR無料動画`}
                description={`${singlePostData.node.title}のVR無料動画｜Extreme VR`}
                image={`https://www.youtube.com/embed/${singlePostData.node.acf.video_id}`}
            />
            <StyledButtonWrapper onClick={() => (state ? setState(false) : setState(true))}>
                <Button isOpen={state} />
            </StyledButtonWrapper>
            <Nav isOpen={state}>
                <CategoryBar categoryData={categoryData} />
            </Nav>
            <StyledContainer>
                <StyledMainContents>
                    <Breadcrumbs categoryData={singleCategoryData} singlePageData={singlePostData} />
                    <StyledSection>
                        <StyledIframeWrapper>
                            <StyledIframe src={`https://www.youtube.com/embed/${singlePostData.node.acf.video_id}`} />
                        </StyledIframeWrapper>
                        <StyledHeadline>{singlePostData.node.title}</StyledHeadline>
                    </StyledSection>
                    {singlePostData.node.acf.video_recommend_flg === 'true' ? (
                        <StyledSection>
                            <StyledHeadline>Recommend</StyledHeadline>
                            <StyledInner>
                                {recommendData.map(({ node }: { node: IPostData }) => (
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
                    ) : null}
                </StyledMainContents>
                <Footer />
            </StyledContainer>
        </Layout>
    );
};

export default SinglePageComponent;
