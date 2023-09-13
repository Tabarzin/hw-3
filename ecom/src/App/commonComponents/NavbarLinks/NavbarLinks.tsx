import * as React from 'react';
import { NavLink } from 'react-router-dom';
import NavbarLink from '../NavbarLinks/NavbarLink';
import styles from './NavbarLinks.module.scss';

const NavbarLinks = () => {
  return (
    <div className={styles.navbarlinks}>
      <NavbarLink link="/products" text=" Products" />
      <NavbarLink link="/categories" text="Categories" />
      <NavbarLink link="/about" text=" About us" />
    </div>
  );
};

export default NavbarLinks;
