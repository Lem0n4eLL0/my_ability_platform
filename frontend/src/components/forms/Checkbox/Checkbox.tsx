import clsx from 'clsx';
import style from './Checkbox.module.scss';
import { ChoiceBox } from '@/common/commonTypes';

type ICheckbox = ChoiceBox;

export const Checkbox = (props: ICheckbox) => {
  const { isChecked, onClick, disabled } = props;

  return (
    <button
      type="button"
      onClick={e => {
        if (!disabled && onClick) onClick(e);
      }}
      className={clsx(
        style['checkbox'],
        !disabled && isChecked && style['checkbox_checked'],
        disabled && style['checkbox_disabled']
      )}
    ></button>
  );
};
