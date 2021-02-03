import { useHistory } from 'react-router-dom';
import styles from './style/Header.module.css';

export default function Header() {
  const history = useHistory();
  return (
    <header className={styles.component}>
      <button onClick={() => history.push('/')}>Home</button>
      <button onClick={() => history.push('/favorites')}>Favorites</button>
    </header>
  );
}
