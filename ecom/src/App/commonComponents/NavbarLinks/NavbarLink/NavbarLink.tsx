import * as React from 'react';
import styles from './NavbarLink.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  link: string;
  text: string;
};

const NavbarLink: React.FC<Props> = ({ link, text }) => {
  const basicStyle = `${styles.navbarlink}`;
  const activeStyle = `${styles.navbarlink_active}`;
  return (
    <NavLink to={link} className={({ isActive }) => `${basicStyle} ${isActive ? activeStyle : ''}`}>
      {text}
    </NavLink>
  );
};

export default NavbarLink;
