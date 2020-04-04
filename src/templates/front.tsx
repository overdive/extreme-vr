import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Nav from '../components/nav';
import CategoryBar from '../components/categoryBar';
import Slider from '../components/slider';
import SEO from '../components/seo';
import Footer from '../components/footer';
import { IPostData, ICategoryData } from '../types';

interface IFrontPageProps {
    pageContext: {
        customPostData: {
            name: string;
            slug: string;
            postData: { node: IPostData }[];
        }[];
        categoryData: { node: ICategoryData }[];
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

const StyledHeadline = styled.h2`
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 400;
`;

const FrontPageComponent: React.FC<IFrontPageProps> = props => {
    const { customPostData, categoryData } = props.pageContext;
    return (
        <Layout>
            <SEO title="EXTREME VR" />
            <Nav>
                <CategoryBar categoryData={categoryData} />
            </Nav>
            <StyledContainer>
                <StyledMainContents>
                    {customPostData.map(node => (
                        <StyledSection key={node.slug}>
                            <StyledHeadline>{node.name}</StyledHeadline>
                            <Slider postData={node.postData} />
                        </StyledSection>
                    ))}
                </StyledMainContents>
                <Footer />
            </StyledContainer>
        </Layout>
    );
};

export default FrontPageComponent;
