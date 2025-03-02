import { t } from 'i18next';

import { Button } from '../ui/button';

export const MainErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">{t('errorMessage')}</h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        {t('refresh')}
      </Button>
    </div>
  );
};
