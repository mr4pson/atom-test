import React, { memo, Suspense, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Content from './Content';
import ContentFallback from './ContentFallback';
import styles from './Content.module.scss';
import { Page, paths } from 'routes/constants';
import SplashScreen from '../SplashScreen';

type Props = {
  i18n?: any;
  children: ReactNode;
};

function ContentWrapper({ i18n, children }: Props): JSX.Element {
  const { pathname } = useLocation();
  const Messages = i18n;

  return (
    <Suspense
      fallback={
        pathname.match(paths[Page.LOGIN]) ? (
          <SplashScreen className={styles['splash']} />
        ) : (
          <ContentFallback />
        )
      }
    >
      {Messages ? (
        <Messages>
          {({ default: messages }: { default: any }) => (
            <Content messages={messages}>{children}</Content>
          )}
        </Messages>
      ) : (
        <Content messages={{}}>{children}</Content>
      )}
    </Suspense>
  );
}

export default memo(ContentWrapper);
