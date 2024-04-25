import React from 'react';
import styles from './styles/search.module.scss'

const Search = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className={styles.search}
      />
    </div>
  );
};

export default Search;
