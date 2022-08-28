import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import Card from 'components/Card';
import Link from 'components/Link';
import Text from 'components/Text';
import { search, SearchResult } from 'model/search';

import styles from './Search.module.scss';

const SEARCH_DEBOUNCE_DELAY_MS = 400;

export const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [debounceId, setDebounceId] = useState<ReturnType<typeof setTimeout> | undefined>();

  const handleSearchEscape = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {     
      if (e.key === 'Esc' || e.key === 'Escape') {
        e.currentTarget.blur();
      }
    },
    []
  );

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const userInput = e.target.value;
      setSearchInput(userInput);
      if (debounceId) {
        clearTimeout(debounceId);
      }
      setDebounceId(setTimeout(() => {
        setDebounceId(undefined);
        setSearchResults(search(userInput));
      }, SEARCH_DEBOUNCE_DELAY_MS));
    },
    [debounceId]
  );

  const containerClass = classNames(
    styles['search-container'], 
    { [styles['empty-search']]: !searchInput }
  );

  return (
    <div className={containerClass}>
      <div className={styles['page-overlay']} />
      <div className={styles['search-results-container']}>
        <div className={styles['search-results-list']}>
          {searchResults.map((r: SearchResult, i: number) => (
            <div 
              className={styles['search-result-container']} 
              key={`${r.title}-${i}`}
            >
              <Link path={r.url}>
                <Card padding="none">
                  <div className={styles['search-result']}>
                    <img src={r.imgUrl} alt={r.imgAltText} />
                    <div className={styles['title']}>
                      <Text size="h4" spacing="none">{r.title}</Text>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className= {styles['input-background']}/>
      <input 
        value={searchInput}      
        onChange={handleSearchInputChange}
        onKeyDown={handleSearchEscape}
        type="search" 
        placeholder="Search for projects and illustrations"
      />
      <div className={styles['search-icon-container']}>
        <span className="material-icons">search</span>
      </div>
    </div>
  );
};

export default Search;
