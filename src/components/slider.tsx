import { Link } from 'gatsby';
import React from 'react';
import Swiper from 'react-id-swiper';
import styled from 'styled-components';
import 'swiper/swiper.scss';

interface IPostData {
    id: string;
    title: string;
    slug: string;
    video_categories: number[];
    acf: {
        video_id: string;
    };
}

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

const SliderComponent: React.FC<ISiderProps> = props => {
    const { postData } = props;
    return (
        <StyledWrapper>
            <Swiper {...params}>
                {postData.map(({ node }: { node: IPostData }) => (
                    <StyledSlide key={node.slug}>
                        <StyledLink to={'/video/' + node.slug}>
                            <StyledImageWrapper>
                                <StyledImage
                                    src={'http://img.youtube.com/vi/' + node.acf.video_id + '/mqdefault.jpg'}
                                    alt={node.title}
                                />
                            </StyledImageWrapper>
                            <StyledCaption>{node.title}</StyledCaption>
                        </StyledLink>
                    </StyledSlide>
                ))}
            </Swiper>
        </StyledWrapper>
    );
};

export default SliderComponent;
