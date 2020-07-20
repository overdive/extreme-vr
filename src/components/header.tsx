import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Image from './image';
import media from './media';

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #171717;
    width: 100%;
    ${media.pc`
        height: 70px;
        padding: 15px 30px;
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

const HeaderComponent: React.FC = () => {
    return (
        <StyledHeader>
            <StyledLogo>
                <Link to="/">
                    <Image filename="logo.png" alt="EXTREME VR" />
                </Link>
            </StyledLogo>
        </StyledHeader>
    );
};

export default HeaderComponent;
