import React, { memo, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import classNames from 'classnames';
import styles from './Content.module.scss';

type Props = {
  messages: any;
  children: ReactNode;
};

function Content({ messages, children }: Props): JSX.Element {
  // const { isMenuReduced } = useLayoutContext();

  return (
    <IntlProvider locale={'ru'} messages={messages}>
      <main
        className={classNames(styles['content'], {
        })}
      >
        {children}
      </main>
    </IntlProvider>
  );
}

export default memo(Content);
