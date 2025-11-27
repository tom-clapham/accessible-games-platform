import styles from './SearchBar.module.css';

const SearchBarGenres = () => {
  return (
    <div className={styles.search_container}>
        <input type='text' placeholder='Search genre tags...'/>
    </div>
  )
}

export default SearchBarGenres