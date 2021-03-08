import React, { memo } from 'react';
// import { useUser } from 'core/app';
import { AppRoute } from './AppRoute';
import { getRoutes } from './routes';

function AppRoutes(): JSX.Element {
  // const { account } = useUser();

  return (
    <>
      {getRoutes().map((route) => (
        <AppRoute
          key={route.type}
          exact={route.exact}
          path={route.path}
          isPrivate={false}
        >
          {route.component}
        </AppRoute>
      ))}
    </>
  );
}

export default memo(AppRoutes);
