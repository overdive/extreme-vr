import React from 'react';
import styled from 'styled-components';

interface INavProps {
    children?: React.ReactNode;
}

const StyledWrapper = styled.div`
    position: relative;
    width: 16%;
    min-width: 200px;
    max-width: 240px;
    flex-basis: 16%;
    flex-grow: 0;
    flex-shrink: 0;
`;

const StyledNav = styled.nav`
    position: fixed;
    top: 70px;
    left: 0;
    z-index: 999;
    width: inherit;
    min-width: inherit;
    max-width: inherit;
    height: calc(100% - 70px);
`;

const NavComponent: React.FC<INavProps> = ({ children }) => (
    <StyledWrapper>
        <StyledNav>{children}</StyledNav>
    </StyledWrapper>
);

export default NavComponent;
