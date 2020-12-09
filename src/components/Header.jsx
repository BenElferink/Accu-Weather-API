import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to='/'>
        <button>Home</button>
      </Link>
      <Link to='favorites'>
        <button>Favorites</button>
      </Link>
    </header>
  );
}

export default Header;
