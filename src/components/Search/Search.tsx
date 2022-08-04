import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import styles from './Search.module.scss';

export const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    },
    []
  );

  const containerClass = classNames(
    styles['search-container'], 
    { [styles['empty-search']]: !searchInput }
  );

  return (
    <div className={containerClass}>
      <div className={styles['search-results-container']}>
      </div>
      <input 
        value={searchInput}      
        onChange={handleSearchInputChange}
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
