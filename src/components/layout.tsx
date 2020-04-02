import React from 'react';
import styled from 'styled-components';

import '../styles/global.scss';
import Header from './header';
import Footer from './footer';

interface ILayoutProps {
    children?: React.ReactNode;
}

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 125px;
    width: 100%;
    box-sizing: border-box;
`;

const LayoutComponent: React.FC<ILayoutProps> = ({ children }) => (
    <>
        <Header />
        <StyledWrapper>{children}</StyledWrapper>
        <Footer />
    </>
);

export default LayoutComponent;
