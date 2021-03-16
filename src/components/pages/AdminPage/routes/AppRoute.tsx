import React, { memo } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { paths, AdminsPage } from './constants';

type Props = {
  path: string;
  exact?: boolean;
  children: React.ReactNode;
  isPrivate?: boolean;
};

export function AppRoute({
  path,
  exact,
  children,
  isPrivate,
}: Props): JSX.Element {
  const location = useLocation();

  function hasRedirect(): boolean {
    return `${location.pathname}/` === paths[AdminsPage.MAIN];
  }

  if (hasRedirect()) {
    return (
      <Redirect
        to={{
          pathname: paths[AdminsPage.NEWS],
        }}
      />
    );
  }

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
}

export default memo(AppRoute);
