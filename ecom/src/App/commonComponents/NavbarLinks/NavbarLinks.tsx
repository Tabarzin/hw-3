import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavbarLinks.module.scss';

const NavbarLinks = () => {
  const [activeLink, setActiveLink] = React.useState('');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className={styles.navbarlinks}>
      <ul>
        <li
          className={`${styles.navbarlinks_text} ${activeLink === 'products' ? styles['text-accent'] : ''}`}
          onClick={() => handleLinkClick('products')}
        >
          <NavLink to="/products" activeClassName={styles.active}>
            Products
          </NavLink>
        </li>
        <li
          className={`${styles.navbarlinks_text} ${activeLink === 'categories' ? styles['text-accent'] : ''}`}
          onClick={() => handleLinkClick('categories')}
        >
          <NavLink to="/categories" activeClassName={styles.active}>
            Categories
          </NavLink>
        </li>
        <li
          className={`${styles.navbarlinks_text} ${activeLink === 'about' ? styles['text-accent'] : ''}`}
          onClick={() => handleLinkClick('about')}
        >
          <NavLink to="/about" activeClassName={styles.active}>
            About us
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavbarLinks;
