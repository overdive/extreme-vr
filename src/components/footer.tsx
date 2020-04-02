import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    position: relative;
    background-color: #171717;
    width: 100%;
    height: 280px;
`;

const FooterComponent: React.FC = () => <StyledFooter />;

export default FooterComponent;
