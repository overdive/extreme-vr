import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Nav from '../components/nav';
import CategoryBar from '../components/categoryBar';
import Breadcrumbs from '../components/breadCrumbs';
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

interface IArchiveProps {
    pageContext: {
        postData: { node: IPostData }[];
        categoryData: { node: ICategoryData }[];
        singleCategoryData: { node: ICategoryData }[];
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

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
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
    margin-right: 20px;
    margin-bottom: 40px;
    width: 340px;
`;

const StyledLink = styled(Link)`
    display: block;
    text-decoration: none;
`;

const StyledImageWrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 190px;
`;

const StyledImage = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: auto;
    transform: translate3d(-50%, -50%, 0);
`;

const StyledCaption = styled.span`
    display: block;
    padding: 10px 8px;
    height: 74px;
    box-sizing: border-box;
    color: #fff;
    font-size: 18px;
`;

const ArchivePageComponent: React.FC<IArchiveProps> = props => {
    const { postData, categoryData, singleCategoryData } = props.pageContext;
    return (
        <Layout>
            <SEO title={singleCategoryData[0].node.name} />
            <Nav>
                <CategoryBar categoryData={categoryData} />
            </Nav>
            <StyledMainContents>
                <Breadcrumbs categoryData={singleCategoryData} />
                <StyledSection>
                    <StyledHeadline>
                        {singleCategoryData.map(({ node }: { node: ICategoryData }) => (
                            <span key={node.slug}>「{node.name}」</span>
                        ))}
                    </StyledHeadline>
                    <StyledWrapper>
                        {postData.map(({ node }: { node: IPostData }) => (
                            <StyledCard key={node.id}>
                                <StyledLink to={'/video/' + node.slug}>
                                    <StyledImageWrapper>
                                        <StyledImage
                                            src={'http://img.youtube.com/vi/' + node.acf.video_id + '/mqdefault.jpg'}
                                            alt={node.title}
                                        />
                                    </StyledImageWrapper>
                                    <StyledCaption>{node.title}</StyledCaption>
                                </StyledLink>
                            </StyledCard>
                        ))}
                    </StyledWrapper>
                </StyledSection>
            </StyledMainContents>
        </Layout>
    );
};

export default ArchivePageComponent;
