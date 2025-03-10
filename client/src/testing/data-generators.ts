import {
  randCompanyName,
  randUserName,
  randEmail,
  randParagraph,
  randUuid,
  randPassword,
  randCatchPhrase,
} from '@ngneat/falso';

const generateUser = () => ({
  id: randUuid() + Math.random(),
  firstName: randUserName({ withAccents: false }),
  lastName: randUserName({ withAccents: false }),
  email: randEmail(),
  password: randPassword(),
  teamId: randUuid(),
  teamName: randCompanyName(),
  role: 'ADMIN',
  bio: randParagraph(),
  createdAt: Date.now(),
});

export const createUser = <T extends Partial<ReturnType<typeof generateUser>>>(
  overrides?: T,
) => {
  return { ...generateUser(), ...overrides };
};

const generateTeam = () => ({
  id: randUuid(),
  name: randCompanyName(),
  description: randParagraph(),
  createdAt: Date.now(),
});

export const createTeam = <T extends Partial<ReturnType<typeof generateTeam>>>(
  overrides?: T,
) => {
  return { ...generateTeam(), ...overrides };
};

const generateDiscussion = () => ({
  id: randUuid(),
  title: randCatchPhrase(),
  body: randParagraph(),
  createdAt: Date.now(),
});

export const createDiscussion = <
  T extends Partial<ReturnType<typeof generateDiscussion>>,
>(
  overrides?: T & {
    authorId?: string;
    teamId?: string;
  },
) => {
  return { ...generateDiscussion(), ...overrides };
};

const generateComment = () => ({
  id: randUuid(),
  body: randParagraph(),
  createdAt: Date.now(),
});

export const createComment = <
  T extends Partial<ReturnType<typeof generateComment>>,
>(
  overrides?: T & {
    authorId?: string;
    discussionId?: string;
  },
) => {
  return { ...generateComment(), ...overrides };
};

const generateBase = () => ({
  id: randUuid(),
  title: randCatchPhrase(),
  body: randParagraph(),
  createdAt: Date.now(),
});

export const createBase = <T extends Partial<ReturnType<typeof generateBase>>>(
  overrides?: T,
) => {
  return { ...generateBase(), ...overrides };
};

const generateBan = () => ({
  id: randUuid(),
  title: randCatchPhrase(),
  body: randParagraph(),
  createdAt: Date.now(),
});

export const createBan = <T extends Partial<ReturnType<typeof generateBan>>>(
  overrides?: T,
) => {
  return { ...generateBan(), ...overrides };
};

const generateEvent = () => ({
  id: randUuid(),
  title: randCatchPhrase(),
  body: randParagraph(),
  createdAt: Date.now(),
});

export const createEvent = <
  T extends Partial<ReturnType<typeof generateEvent>>,
>(
  overrides?: T,
) => {
  return { ...generateEvent(), ...overrides };
};

const generateVehicule = () => ({
  id: randUuid(),
  title: randCatchPhrase(),
  body: randParagraph(),
  createdAt: Date.now(),
});

export const createVehicule = <
  T extends Partial<ReturnType<typeof generateVehicule>>,
>(
  overrides?: T,
) => {
  return { ...generateVehicule(), ...overrides };
};

const generateWarning = () => ({
  id: randUuid(),
  title: randCatchPhrase(),
  body: randParagraph(),
  createdAt: Date.now(),
});

export const createWarning = <
  T extends Partial<ReturnType<typeof generateWarning>>,
>(
  overrides?: T,
) => {
  return { ...generateWarning(), ...overrides };
};

const generateDonation = () => ({
  id: randUuid(),
  title: randCatchPhrase(),
  body: randParagraph(),
  createdAt: Date.now(),
});

export const createDonation = <
  T extends Partial<ReturnType<typeof generateDonation>>,
>(
  overrides?: T,
) => {
  return { ...generateDonation(), ...overrides };
};
