import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/cn';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

type Option = {
  label: ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const Select = (props: SelectFieldProps) => {
  const { label, options, error, className, defaultValue, registration } =
    props;
  return (
    <FieldWrapper label={label} error={error}>
      <select
        className={cn(
          'mt-1 block w-full rounded-md py-2 pl-3 pr-10 text-base sm:text-sm',
          className,
        )}
        defaultValue={defaultValue}
        {...registration}
      >
        {options.map(({ label, value }) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
