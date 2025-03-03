import { Link as RouterLink, LinkProps } from 'react-router';

import { cn } from '@/utils/cn';

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink
      className={cn('text-primary-600 hover:text-primary-900', className)}
      {...props}
    >
      {children}
    </RouterLink>
  );
};
