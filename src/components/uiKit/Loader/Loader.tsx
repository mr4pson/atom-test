import { Spin } from 'antd';
import { memo } from 'react';
import styles from './Loader.module.scss';
import classNames from 'classnames';

type Props = {
  className?: string;
}

function Loader(props: Props): JSX.Element {
  return (
    <div className={classNames(styles['loader'], styles[props.className ?? ''])}
    >
      <Spin size="large" />
    </div>
  )
}

export default memo(Loader);
