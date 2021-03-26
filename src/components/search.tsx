import React, { useState } from 'react';
import styled from 'styled-components';
import algoliasearch from 'algoliasearch/lite';
import SearchBox from './searchBox';
import Hits from './hits';
import { InstantSearch } from 'react-instantsearch-dom';

const client = algoliasearch (
    process.env.GATSBY_ALGOLIA_APP_ID!,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY!,
);

const index = process.env.GATSBY_ALGOLIA_INDEXNAME!;

const StyledWrapper = styled.div`
    visibility: hidden;
    position: absolute;
    z-index: 9999;
    top: 100%;
    left: 0;
    width: 100%;
    transition: visibility .5s ease-out;
    &.active {
        visibility: visible;
    }
`;

const Search: React.FC = () => {
    const [state, setState] = useState(false);
    console.log(state);
    return (
        <InstantSearch
                searchClient={client}
                indexName={index}
            >
            <SearchBox
                onBlur={() => (state ? setState(false) : setState(true))}
                onFocus={() => (state ? setState(false) : setState(true))}
            />
            <StyledWrapper className={state ? 'active' : ''}>
                <Hits />
            </StyledWrapper>
        </InstantSearch>
    )
}

export default Search;