import React from 'react';
import styled from 'styled-components';
import { connectSearchBox } from 'react-instantsearch-dom';
import { SearchBoxProvided } from 'react-instantsearch-core';

interface ISearchBoxProps extends SearchBoxProvided {
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const StyledSearchBox = styled.div`
    width: 100%;
`;

const StyledForm = styled.form`
    position: relative;
    width: 100%;
`;

const StyledInput = styled.input`
    background-color: #212121;
    border-color: hsla(0,0%,100%,.12);
    border: 1px solid #424242;
    border-radius: 4px;
    width: inherit;
    color: #424242;
    font-size: 16px;
    padding: 10px 8px;
    &:focus {
        background-color: #e6e6e6;
    }
`;

const SearchBox: React.FC<ISearchBoxProps> = ({
    refine,
    currentRefinement,
    onBlur,
    onFocus,
}) => {
    return (
        <StyledSearchBox>
            <StyledForm>
                <StyledInput
                    placeholder='検索'
                    value={currentRefinement}
                    onChange={(e) => { refine(e.target.value); }}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
            </StyledForm>
        </StyledSearchBox>
    )
};

export default connectSearchBox(SearchBox);
