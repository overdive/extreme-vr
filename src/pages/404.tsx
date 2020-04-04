import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Footer from '../components/footer';

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
    padding: 60px 0 0;
    min-height: 500px;
`;

const StyledText = styled.p`
    text-align: center;
`;

const NotFoundPageComponent: React.FC = () => (
    <Layout>
        <SEO title="404: Not found" />
        <StyledContainer>
            <StyledMainContents>
                <StyledSection>
                    <StyledText>お探しのページは見つかりませんでした</StyledText>
                </StyledSection>
            </StyledMainContents>
            <Footer />
        </StyledContainer>
    </Layout>
);

export default NotFoundPageComponent;
