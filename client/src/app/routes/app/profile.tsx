import { t } from 'i18next';

import { ContentLayout } from '@/components/layouts';
import { UpdateProfile } from '@/features/users/components/update-profile';
import { useUser } from '@/lib/auth';

type EntryProps = {
  label: string;
  value: string;
};
const Entry = ({ label, value }: EntryProps) => (
  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
    <dt className="text-sm font-medium">{label}</dt>
    <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{value}</dd>
  </div>
);

const ProfileRoute = () => {
  const user = useUser();

  if (!user.data) return null;

  return (
    <ContentLayout title="Profile">
      <div className="overflow-hidden shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium leading-6">
              {t('userInformation')}
            </h3>
            <UpdateProfile />
          </div>
          <p className="mt-1 max-w-2xl text-sm">{t('userDetailInformation')}</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <Entry label={t('firstName')} value={user.data.firstName} />
            <Entry label={t('lastName')} value={user.data.lastName} />
            <Entry label={t('email')} value={user.data.email} />
            <Entry label={t('role')} value={user.data.role} />
            <Entry label={t('bio')} value={user.data.bio} />
          </dl>
        </div>
      </div>
    </ContentLayout>
  );
};

export default ProfileRoute;
