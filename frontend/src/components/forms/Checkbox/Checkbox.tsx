import clsx from 'clsx';
import style from './Checkbox.module.scss';

type ICheckbox = {
  isChecked: boolean;
};
export const Checkbox = (props: ICheckbox) => {
  const { isChecked } = props;

  return <div className={clsx(style['checkbox'], isChecked && style['checkbox_checked'])}></div>;
};
