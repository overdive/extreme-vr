import React from 'react';
import styled from 'styled-components';
import media from './media';

interface INavProps {
    children?: React.ReactNode;
    isOpen?: boolean;
}

const StyledWrapper = styled.div<INavProps>`
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
        background-color: rgba(0, 0, 0, .6);
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        &.active {
            height: 100%;
        }
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
        left: auto;
        right: -100%;
        z-index: 999;
        overflow-y: auto;
        width: 80%;
        min-width: 80%;
        max-width: 410px;
        height: inherit;
        transition: right .6s;
        &.active {
            right: 0;
        }
    `}
`;

const NavComponent: React.FC<INavProps> = ({ children, isOpen }) => {
    return (
        <StyledWrapper className={isOpen ? 'active' : ''}>
            <StyledNav className={isOpen ? 'active' : ''}>{children}</StyledNav>
        </StyledWrapper>
    );
};

export default NavComponent;
