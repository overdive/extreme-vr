import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Nav from '../components/nav';
import Button from '../components/navButton';
import CategoryBar from '../components/categoryBar';
import Slider from '../components/slider';
import SEO from '../components/seo';
import Footer from '../components/footer';
import { IPostData, ICategoryData } from '../types';
import media from '../components/media';

interface IFrontPageProps {
    pageContext: {
        postData: {
            name: string;
            slug: string;
            relatedData: { node: IPostData }[];
        }[];
        categoryData: { node: ICategoryData }[];
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

const StyledHeadline = styled.h2`
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 400;
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

const FrontPageComponent: React.FC<IFrontPageProps> = props => {
    const propsData = props;
    const { postData, categoryData } = propsData.pageContext;
    const [state, setState] = useState(false);
    const indexUrl = `${process.env.GATSBY_SITE_URL_PROTOCOL}://${process.env.GATSBY_SITE_URL_PATH}`;
    return (
        <Layout>
            <SEO title="Extreme VR | エクストリームスポーツのVR無料動画">
                <link rel="index" href={indexUrl} />
            </SEO>
            <StyledButtonWrapper onClick={() => (state ? setState(false) : setState(true))}>
                <Button isOpen={state} />
            </StyledButtonWrapper>
            <Nav isOpen={state}>
                <CategoryBar categoryData={categoryData} />
            </Nav>
            <StyledContainer>
                <StyledMainContents>
                    {postData.map(node =>
                        node.relatedData.length ? (
                            <StyledSection key={node.slug}>
                                <StyledHeadline>{node.name}</StyledHeadline>
                                <Slider postData={node.relatedData} />
                            </StyledSection>
                        ) : null
                    )}
                </StyledMainContents>
                <Footer />
            </StyledContainer>
        </Layout>
    );
};

export default FrontPageComponent;
