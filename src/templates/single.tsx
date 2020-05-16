import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Nav from '../components/nav';
import CategoryBar from '../components/categoryBar';
import Breadcrumbs from '../components/breadCrumbs';
import SEO from '../components/seo';
import Footer from '../components/footer';
import { IPostData, ICategoryData } from '../types';

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
    width: 84%;
    min-width: 720px;
`;

const StyledMainContents = styled.main`
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
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
`;

const StyledCard = styled.div`
    background-color: #303030;
    margin-bottom: 30px;
    width: calc(25% - 9px);
    margin-right: 12px;
    :nth-of-type(4n) {
        margin-right: 0;
    }
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

const SinglePageComponent: React.FC<ISinglePostProps> = props => {
    const propsData = props;
    const { singlePostData, singleCategoryData, categoryData, recommendData } = propsData.pageContext;
    return (
        <Layout>
            <SEO
                title={`${singlePostData.node.title}のVR無料動画`}
                description={`${singlePostData.node.title}のVR無料動画｜Extreme VR`}
            />
            <Nav>
                <CategoryBar categoryData={categoryData} />
            </Nav>
            <StyledContainer>
                <StyledMainContents>
                    <Breadcrumbs categoryData={singleCategoryData} singlePageData={singlePostData} />
                    <StyledSection>
                        <StyledIframeWrapper>
                            <StyledIframe src={`https://www.youtube.com/embed/'${singlePostData.node.acf.video_id}`} />
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
