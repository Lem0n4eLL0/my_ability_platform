import { IMGIcon } from '../shells/IMGIcon';
import style from './TryTestButton.module.scss';

interface ITryTestButton {
  onClick: () => void;
}

export const TryTestButton = (props: ITryTestButton) => {
  const { onClick } = props;
  return (
    <button type="button" className={style['button']} onClick={onClick}>
      <span className={style['title']}>Пройти тест</span>
      <IMGIcon src="src/assets/try_test_arrow.svg" alt="arrow" wrapperClassName={style['arrow']} />
    </button>
  );
};
