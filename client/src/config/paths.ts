export const paths = {
  home: {
    root: {
      path: '/',
      getHref: () => '/',
    },
    about: {
      path: '/about',
      getHref: () => '/about',
    },
    shop: {
      path: '/shop',
      getHref: () => '/shop',
    },
    servers: {
      path: '/servers',
      getHref: () => '/servers',
    },
  },
  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    dashboard: {
      path: '',
      getHref: () => '/app',
    },
    discussions: {
      path: 'discussions',
      getHref: () => '/app/discussions',
    },
    discussion: {
      path: 'discussions/:discussionId',
      getHref: (id: string) => `/app/discussions/${id}`,
    },
    users: {
      path: 'users',
      getHref: () => '/app/users',
    },
    bases: {
      path: 'bases',
      getHref: () => '/app/bases',
    },
    base: {
      path: 'bases/:baseId',
      getHref: (id: string) => `/app/bases/${id}`,
    },
    profile: {
      path: 'profile',
      getHref: () => '/app/profile',
    },
  },
} as const;
