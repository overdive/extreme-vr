import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Image from './image';

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #171717;
    padding: 45px 30px 33px;
    width: 100%;
    height: 125px;
`;

const StyledLogo = styled.h1`
    width: 380px;
`;

const HeaderComponent: React.FC = () => (
    <StyledHeader>
        <StyledLogo>
            <Link to="/">
                <Image filename="logo.png" alt="EXTREME VR" />
            </Link>
        </StyledLogo>
    </StyledHeader>
);

export default HeaderComponent;
