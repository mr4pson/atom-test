import React, { memo } from 'react';
import { Switch } from 'react-router-dom';
// import { useUser } from 'core/app';
import { AppRoute } from './AppRoute';
import { getRoutes } from './routes';

function AppRoutes(): JSX.Element {
  // const { account } = useUser();

  return (
    <Switch>
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
    </Switch>
  );
}

export default memo(AppRoutes);
