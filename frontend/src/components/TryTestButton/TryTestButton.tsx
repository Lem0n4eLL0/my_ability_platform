import { SyntheticEvent } from 'react';
import { IMGIcon } from '../shells/IMGIcon';
import style from './TryTestButton.module.scss';
import clsx from 'clsx';

interface ITryTestButton {
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

export const TryTestButton = (props: ITryTestButton) => {
  const { onClick } = props;
  return (
    <button type="button" className={style['button']} onClick={onClick}>
      <span className={style['title']}>Пройти тест</span>
      <div className={style['arrow__wrapper']}>
        <IMGIcon
          src="src/assets/try_test_arrow.svg"
          alt="arrow"
          wrapperClassName={clsx(style['arrow'], style['arrow-fast_animation'])}
        />
      </div>
    </button>
  );
};
