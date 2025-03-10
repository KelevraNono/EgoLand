import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { paths } from '@/config/paths';
import { ProtectedRoute } from '@/lib/auth';

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from './routes/app/root';

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.public.landing.path,
      lazy: () => import('./routes/public/landing').then(convert(queryClient)),
    },
    {
      path: paths.public.about.path,
      lazy: () => import('./routes/public/about').then(convert(queryClient)),
    },
    {
      path: paths.public.shop.path,
      lazy: () => import('./routes/public/shop').then(convert(queryClient)),
    },
    {
      path: paths.public.servers.path,
      lazy: () =>
        import('./routes/public/servers/servers').then(convert(queryClient)),
    },
    {
      path: paths.public.servers.chernarus.path,
      lazy: () =>
        import('./routes/public/servers/chernarus').then(convert(queryClient)),
    },
    {
      path: paths.public.servers.chernarus['wolf-home'].path,
      lazy: () =>
        import('./routes/public/servers/chernarus/wolf-home').then(
          convert(queryClient),
        ),
    },
    {
      path: paths.public.servers.chernarus.mechanic.path,
      lazy: () =>
        import('./routes/public/servers/chernarus/mechanic').then(
          convert(queryClient),
        ),
    },
    {
      path: paths.public.servers.chernarus.tailor.path,
      lazy: () =>
        import('./routes/public/servers/chernarus/tailor').then(
          convert(queryClient),
        ),
    },
    {
      path: paths.public.servers.chernarus.medic.path,
      lazy: () =>
        import('./routes/public/servers/chernarus/medic').then(
          convert(queryClient),
        ),
    },
    {
      path: paths.public.servers.chernarus.police.path,
      lazy: () =>
        import('./routes/public/servers/chernarus/police').then(
          convert(queryClient),
        ),
    },
    {
      path: paths.public.servers.chernarus.gunsmith.path,
      lazy: () =>
        import('./routes/public/servers/chernarus/gunsmith').then(
          convert(queryClient),
        ),
    },
    {
      path: paths.public.servers['deer-isle'].path,
      lazy: () =>
        import('./routes/public/servers/deer-isle').then(convert(queryClient)),
    },
    {
      path: paths.public.servers.sakhal.path,
      lazy: () =>
        import('./routes/public/servers/sakhal').then(convert(queryClient)),
    },
    {
      path: paths.public['privacy-policy'].path,
      lazy: () =>
        import('./routes/public/privacy-policy').then(convert(queryClient)),
    },
    {
      path: paths.public['legal-notices'].path,
      lazy: () =>
        import('./routes/public/legal-notices').then(convert(queryClient)),
    },
    {
      path: paths.public.sitemap.path,
      lazy: () => import('./routes/public/sitemap').then(convert(queryClient)),
    },
    {
      path: paths.auth.register.path,
      lazy: () => import('./routes/auth/register').then(convert(queryClient)),
    },
    {
      path: paths.auth.login.path,
      lazy: () => import('./routes/auth/login').then(convert(queryClient)),
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: paths.app.discussions.path,
          lazy: () =>
            import('./routes/app/discussions/discussions').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.discussion.path,
          lazy: () =>
            import('./routes/app/discussions/discussion').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.users.path,
          lazy: () => import('./routes/app/users').then(convert(queryClient)),
        },
        {
          path: paths.app.donations.path,
          lazy: () =>
            import('./routes/app/donations/donations').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.events.path,
          lazy: () =>
            import('./routes/app/events/events').then(convert(queryClient)),
        },
        {
          path: paths.app.vehicules.path,
          lazy: () =>
            import('./routes/app/vehicules/vehicules').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.bases.path,
          lazy: () =>
            import('./routes/app/bases/bases').then(convert(queryClient)),
        },
        {
          path: paths.app.warnings.path,
          lazy: () =>
            import('./routes/app/warnings/warnings').then(convert(queryClient)),
        },
        {
          path: paths.app.bans.path,
          lazy: () =>
            import('./routes/app/bans/bans').then(convert(queryClient)),
        },
        {
          path: paths.app.profile.path,
          lazy: () => import('./routes/app/profile').then(convert(queryClient)),
        },
        {
          path: paths.app.dashboard.path,
          lazy: () =>
            import('./routes/app/dashboard').then(convert(queryClient)),
        },
      ],
    },
    {
      path: '*',
      lazy: () => import('./routes/not-found').then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
