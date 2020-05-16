import { Link } from 'gatsby';
import React from 'react';
import Swiper from 'react-id-swiper';
import styled from 'styled-components';
import 'swiper/swiper.scss';
import { IPostData } from '../types';

interface ISiderProps {
    postData: { node: IPostData }[];
}

const params = {
    width: 340,
    spaceBetween: 18,
    slidesOffsetBefore: 80,
    slidesPerView: 1,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
};

const StyledWrapper = styled.div`
    position: relative;
    left: -80px;
    width: calc(100% + 160px);
`;

const StyledSlide = styled.div`
    background-color: #303030;
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

const StyledCaption = styled.div`
    display: block;
    padding: 10px 8px;
    height: 74px;
    box-sizing: border-box;
    color: #fff;
    font-size: 18px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
`;

const StyledText = styled.span`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    max-height: calc(2em * 1.4);
`;

const SliderComponent: React.FC<ISiderProps> = props => {
    const { postData } = props;
    return (
        <StyledWrapper>
            <Swiper {...params}>
                {postData.map(({ node }: { node: IPostData }) => (
                    <StyledSlide key={node.slug}>
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
                    </StyledSlide>
                ))}
            </Swiper>
        </StyledWrapper>
    );
};

export default SliderComponent;
