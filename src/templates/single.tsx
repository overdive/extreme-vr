import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Nav from '../components/nav';
import CategoryBar from '../components/categoryBar';
import Breadcrumbs from '../components/breadcrumbs';
import SEO from '../components/seo';

/* TODO: types */
interface IPostData {
    id: string;
    title: string;
    slug: string;
    video_categories: number[];
    acf: {
        video_id: string;
    };
}

interface ICategoryData {
    id: string;
    name: string;
    slug: string;
    wordpress_id: number;
}

interface ISinglePostProps {
    pageContext: {
        singlePostData: { node: IPostData };
        singleCategoryData: { node: ICategoryData }[];
        categoryData: { node: ICategoryData }[];
    };
}

const StyledMainContents = styled.main`
    overflow: hidden;
    flex-grow: 1;
    flex-shrink: 1;
    padding: 0 40px;
    width: calc(100% - 280px);
    min-width: 720px;
    box-sizing: border-box;
`;

const StyledSection = styled.section`
    padding: 30px 0;
`;

const StyledImageWrapper = styled.div`
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

const SinglePageComponent: React.FC<ISinglePostProps> = props => {
    const { singlePostData, singleCategoryData, categoryData } = props.pageContext;
    const url = 'https://www.youtube.com/embed/' + singlePostData.node.acf.video_id;
    return (
        <Layout>
            <SEO title={singlePostData.node.title} />
            <Nav>
                <CategoryBar categoryData={categoryData} />
            </Nav>
            <StyledMainContents>
                <Breadcrumbs categoryData={singleCategoryData} singlePageData={singlePostData} />
                <StyledSection>
                    <StyledImageWrapper>
                        <StyledIframe src={url} />
                    </StyledImageWrapper>
                    <StyledHeadline>{singlePostData.node.title}</StyledHeadline>
                </StyledSection>
            </StyledMainContents>
        </Layout>
    );
};

export default SinglePageComponent;
