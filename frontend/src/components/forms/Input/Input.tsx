import { forwardRef, InputHTMLAttributes } from 'react';
import formStyle from '@styles/forms.module.scss';
import clsx from 'clsx';

export interface IBaseInput extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  extraClassName?: string;
  formatterFunc?: (value: string) => string;
}

export const Input = forwardRef<HTMLInputElement, IBaseInput>((props, ref) => {
  const { type, extraClassName, className, isError, value, formatterFunc, ...rest } = props;

  return (
    <input
      type={type}
      ref={ref}
      value={formatterFunc ? formatterFunc(String(value)) : value}
      className={clsx(
        extraClassName,
        className ? className : formStyle['form_field'],
        isError && formStyle['field__error']
      )}
      {...rest}
    />
  );
});
