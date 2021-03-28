import { Spin } from 'antd';
import { memo } from 'react';
import styles from './Loader.module.scss';

function Loader(): JSX.Element {
  return (
    <div className={styles['loader']}
    >
      <Spin size="large" />
    </div>
  )
}

export default memo(Loader);
