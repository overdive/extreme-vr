import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Image from './image';
import media from './media';
import Search from '../components/search';

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #171717;
    width: 100%;
    ${media.pc`
        height: 70px;
        padding: 0 15px 0 30px;
    `}
    ${media.sp`
        height: 40px;
        padding: 10px;
    `}
`;

const StyledLogo = styled.h1`
    ${media.pc`
        width: 330px;
    `}
    ${media.sp`
        width: 174px;
    `}
`;

const StyledSearchWrapper = styled.div`
    position: relative;
    width: 240px;
    ${media.sp`
        visibility: hidden; 
    `}
`;

const HeaderComponent: React.FC = () => {
    return (
        <StyledHeader>
            <StyledLogo>
                <Link to="/">
                    <Image filename="logo.png" alt="EXTREME VR" />
                </Link>
            </StyledLogo>
            <StyledSearchWrapper>
                <Search />
            </StyledSearchWrapper>
        </StyledHeader>
    );
};

export default HeaderComponent;
