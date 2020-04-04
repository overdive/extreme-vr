import React from 'react';
import styled from 'styled-components';

import '../styles/global.scss';
import Header from './header';

interface ILayoutProps {
    children?: React.ReactNode;
}

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 70px;
    width: 100%;
    box-sizing: border-box;
`;

const LayoutComponent: React.FC<ILayoutProps> = ({ children }) => (
    <>
        <Header />
        <StyledWrapper>{children}</StyledWrapper>
    </>
);

export default LayoutComponent;
