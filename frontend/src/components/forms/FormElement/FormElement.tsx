import { ErrorField } from '../ErrorField';
import style from './FormElement.module.scss';
import clsx from 'clsx';

interface IFormElement {
  children: React.ReactNode | ((isError: boolean) => React.ReactNode);
  label?: string;
  isRequired?: boolean;
  width?: number | string;
  error?: string | undefined;
  extraClassName?: string;
}

export const FormElement = (props: IFormElement) => {
  const { children, label, width, error, extraClassName, isRequired = false } = props;
  const isError = !!error;
  return (
    <div className={clsx(extraClassName, style['content'])}>
      <label className={style['label']} style={{ width: width }}>
        {label !== undefined && <span className={style['label_content']}>{label}</span>}
        {typeof children === 'function' ? children(isError) : children}
      </label>
      {isError && <ErrorField>{error}</ErrorField>}
    </div>
  );
};
