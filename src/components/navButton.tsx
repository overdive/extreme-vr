import React from 'react';
import styled from 'styled-components';

interface INavButtonProps {
    isOpen: boolean;
}

const StyledButton = styled.a`
    display: block;
    width: 30px;
    height: 20px;
    > span,
    &::before,
    &::after {
        position: absolute;
        left: 0;
        border-top: 2px solid white;
        width: 100%;
        height: auto;
        transition: transform 0.6s;
        content: '';
    }
    > span {
        top: 50%;
        transform: translate3d(0, -50%, 0);
    }
    &::before {
        top: 0;
    }
    &::after {
        bottom: 0;
    }
    &.active {
        > span {
            display: none;
        }
        &::before {
            top: 50%;
            transform: translate3d(0, -50%, 0) rotate(405deg);
        }
        &::after {
            bottom: 50%;
            transform: translate3d(0, 50%, 0) rotate(-405deg);
        }
    }
`;

const NavButtonComponent: React.FC<INavButtonProps> = ({ isOpen }) => {
    return (
        <StyledButton className={isOpen ? 'active' : ''}>
            <span></span>
        </StyledButton>
    );
};

export default NavButtonComponent;
