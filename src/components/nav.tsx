import React from 'react';
import styled from 'styled-components';
import media from './media';

interface INavProps {
    children?: React.ReactNode;
    className?: string;
}

const StyledWrapper = styled.div`
    ${media.pc`
        position: relative;
        width: 16%;
        min-width: 200px;
        max-width: 240px;
        flex-basis: 16%;
        flex-grow: 0;
        flex-shrink: 0;
    `}
    ${media.sp`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
    `}
`;

const StyledNav = styled.nav`
    background-color: #303030;
    ${media.pc`
        position: fixed;
        top: 70px;
        left: 0;
        z-index: 999;
        overflow: hidden auto;
        width: inherit;
        min-width: inherit;
        max-width: inherit;
        height: calc(100% - 70px);
    `}
    ${media.sp`
        position: absolute;
        top: 0;
        right: -100%;
        z-index: 999;
        width: 80%;
        max-width: 410px;
        transition: .6s;
        &.active {
            right: 0;
        }
    `}
`;

const NavComponent: React.FC<INavProps> = ({ children, className }) => {
    return (
        <StyledWrapper>
            <StyledNav className={className}>{children}</StyledNav>
        </StyledWrapper>
    );
};

export default NavComponent;
