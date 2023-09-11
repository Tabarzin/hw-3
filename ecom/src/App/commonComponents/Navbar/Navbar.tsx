import Logo from '@commonComponents/Logo';
import * as React from 'react';
import BagUser from '../BagUser';
import NavbarLinks from '../NavbarLinks';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <div>
      <div className={styles.navbar}>
        <Logo />
        <NavbarLinks />
        <BagUser />
      </div>
    </div>
  );
};

export default Navbar;
