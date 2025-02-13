import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

import { getDiscussionQueryOptions } from '../api/get-discussion';
import { useDiscussions } from '../api/get-discussions';

import { DeleteDiscussion } from './delete-discussion';

import { Link } from '@/components/ui/link';
import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { paths } from '@/config/paths';
import { formatDate } from '@/utils/format';

export type DiscussionsListProps = {
  onDiscussionPrefetch?: (id: string) => void;
};

export const DiscussionsList = ({
  onDiscussionPrefetch,
}: DiscussionsListProps) => {
  const [searchParams] = useSearchParams();

  const discussionsQuery = useDiscussions({
    page: +(searchParams.get('page') || 1),
  });
  const queryClient = useQueryClient();

  if (discussionsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const discussions = discussionsQuery.data?.data;
  const meta = discussionsQuery.data?.meta;

  if (!discussions) return null;

  return (
    <Table
      data={discussions}
      columns={[
        {
          title: 'Titre',
          field: 'title',
        },
        {
          title: 'Créée le',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return (
              <Link
                onMouseEnter={() => {
                  // Prefetch the discussion data when the user hovers over the link
                  queryClient.prefetchQuery(getDiscussionQueryOptions(id));
                  onDiscussionPrefetch?.(id);
                }}
                to={paths.app.discussion.getHref(id)}
              >
                Voir
              </Link>
            );
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteDiscussion id={id} />;
          },
        },
      ]}
      pagination={
        meta && {
          totalPages: meta.totalPages,
          currentPage: meta.page,
          rootUrl: '',
        }
      }
    />
  );
};
