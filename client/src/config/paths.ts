export const paths = {
  public: {
    landing: {
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
      chernarus: {
        path: '/servers/chernarus',
        getHref: () => '/servers/chernarus',
        'wolf-home': {
          path: '/servers/chernarus/wolf-home',
          getHref: () => '/servers/chernarus/wolf-home',
        },
        mechanic: {
          path: '/servers/chernarus/mechanic',
          getHref: () => '/servers/chernarus/mechanic',
        },
        tailor: {
          path: '/servers/chernarus/tailor',
          getHref: () => '/servers/chernarus/tailor',
        },
        medic: {
          path: '/servers/chernarus/medic',
          getHref: () => '/servers/chernarus/medic',
        },
        police: {
          path: '/servers/chernarus/police',
          getHref: () => '/servers/chernarus/police',
        },
        gunsmith: {
          path: '/servers/chernarus/gunsmith',
          getHref: () => '/servers/chernarus/gunsmith',
        },
      },
      'deer-isle': {
        path: '/servers/deer-isle',
        getHref: () => '/servers/deer-isle',
      },
      sakhal: {
        path: '/servers/sakhal',
        getHref: () => '/servers/sakhal',
      },
    },
    'privacy-policy': {
      path: '/privacy-policy',
      getHref: () => '/privacy-policy',
    },
    'legal-notices': {
      path: '/legal-notices',
      getHref: () => '/legal-notices',
    },
    sitemap: {
      path: '/sitemap',
      getHref: () => '/sitemap',
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
    events: {
      path: 'events',
      getHref: () => '/app/events',
    },
    bases: {
      path: 'bases',
      getHref: () => '/app/bases',
    },
    warnings: {
      path: 'warnings',
      getHref: () => '/app/warnings',
    },
    bans: {
      path: 'bans',
      getHref: () => '/app/bans',
    },
    vehicules: {
      path: 'vehicules',
      getHref: () => '/app/vehicules',
    },
    profile: {
      path: 'profile',
      getHref: () => '/app/profile',
    },
  },
} as const;
