import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    position: relative;
    background-color: #171717;
    height: 280px;
    padding: 20px 40px;
    box-sizing: border-box;
`;

const StyledCopyright = styled.small`
    display: block;
    font-size: 14px;
    text-align: center;
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
