import React, { memo } from 'react';
import classNames from 'classnames';
import styles from './SplashScreen.module.scss';

type Props = {
  className?: string;
};

function SplashScreen(props: Props): JSX.Element {
  return (
    <div className={classNames(styles['splash'], props.className)}>
      <div className={styles['splash__inner']}>
        <img
          className={styles['splash__logo']}
          src="/images/kameleoon-logo-white.svg"
          alt="Kameleoon"
        />
      </div>
    </div>
  );
}

export default memo(SplashScreen);
