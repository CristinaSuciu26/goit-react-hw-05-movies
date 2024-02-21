import React, { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styles from './SharedLayout.module.css';
import Loader from 'pages/loader/Loader';

const SharedLayout = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <NavLink className={styles.menu} to="/">
          Home
        </NavLink>
        <NavLink className={styles.menu} to="/movies">
          Movies
        </NavLink>
      </nav>
      <div />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;
