import { useHistory } from 'react-router-dom';
import styles from './style/Header.module.css';

function Header() {
  const history = useHistory();
  return (
    <header className={styles.component}>
      <button onClick={() => history.push('/weather-api')}>Home</button>
      <button onClick={() => history.push('/weather-api/favorites')}>Favorites</button>
    </header>
  );
}

export default Header;
