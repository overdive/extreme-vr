import React from 'react';
import styled from 'styled-components';

interface INavProps {
    children?: React.ReactNode;
}

const StyledWrapper = styled.div`
    position: relative;
    width: 280px;
    flex-basis: 280px;
    flex-grow: 0;
    flex-shrink: 0;
`;

const StyledNav = styled.nav`
    position: fixed;
    top: 125px;
    left: 0;
    z-index: 999;
    width: inherit;
    height: calc(100% - 125px);
`;

const NavComponent: React.FC<INavProps> = ({ children }) => (
    <StyledWrapper>
        <StyledNav>{children}</StyledNav>
    </StyledWrapper>
);

export default NavComponent;
