import styles from './SearchBar.module.css';

const SearchBarAccessibility = () => {
  return (
    <div className={styles.search_container}>
        <input type='text' placeholder='Search accessibility tags...'/>
    </div>
  )
}

export default SearchBarAccessibility