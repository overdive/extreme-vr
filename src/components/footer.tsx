import React from 'react';
import styled from 'styled-components';
import media from './media';

const StyledFooter = styled.footer`
    position: relative;
    background-color: #171717;
    box-sizing: border-box;
    ${media.pc`
        height: 280px;
        padding: 20px 40px;
    `}
    ${media.sp`
        padding: 10px;
    `}
`;

const StyledCopyright = styled.small`
    display: block;

    text-align: center;
    ${media.pc`
        font-size: 14px;
    `}
    ${media.sp`
        font-size: 13px;
    `}
`;

const FooterComponent: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <StyledFooter>
            <StyledCopyright>© Copyright {year} Extreme VR All rights reserved.</StyledCopyright>
        </StyledFooter>
    );
};

export default FooterComponent;
