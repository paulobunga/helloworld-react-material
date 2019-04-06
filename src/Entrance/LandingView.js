import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import LogoImage from '../assets/logo.png';

import styles from './LandingView.module.css';

function LandingView() {
  return (
    <div className={styles.container}>
      <img src={LogoImage} alt="logo" />

      <CircularProgress />
    </div>
  );
}

export default LandingView;
