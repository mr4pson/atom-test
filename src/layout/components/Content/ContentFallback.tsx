import React, { memo } from 'react';
// import { Loader } from '@kameleoon/ui';
import classNames from 'classnames';
import styles from './Content.module.scss';

function ContentFallback(): JSX.Element {
  return (
    <div className={classNames(styles['content'], styles['content_suspense'])}>
      {/* <Loader className={styles['loader']} /> */}
    </div>
  );
}

export default memo(ContentFallback);
