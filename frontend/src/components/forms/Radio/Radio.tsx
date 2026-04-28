import clsx from 'clsx';
import style from './Radio.module.scss';
import { ChoiceBox } from '@/common/commonTypes';

type IRadio = ChoiceBox;

export const Radio = (props: IRadio) => {
  const { isChecked, onClick, disabled } = props;

  return (
    <button
      type="button"
      onClick={e => {
        if (!disabled && onClick) onClick(e);
      }}
      className={clsx(
        style['radio'],
        !disabled && isChecked && style['radio_checked'],
        disabled && style['radio_disabled']
      )}
    ></button>
  );
};
