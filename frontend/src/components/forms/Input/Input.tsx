import { forwardRef, InputHTMLAttributes } from 'react';
import formStyle from '@styles/forms.module.scss';
import clsx from 'clsx';

export interface IBaseInput extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  extraClassName?: string;
  formatterFunc?: (value: string) => string;
}

export const Input = forwardRef<HTMLInputElement, IBaseInput>((props, ref) => {
  const { type, extraClassName, isError, value, formatterFunc, ...rest } = props;

  return (
    <input
      type={type}
      ref={ref}
      value={formatterFunc ? formatterFunc(String(value)) : value}
      className={clsx(
        extraClassName,
        formStyle['form_field'],
        isError && formStyle['form_field__error']
      )}
      {...rest}
    />
  );
});
