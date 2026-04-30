import { InfoField } from '../ProfilePage';
import style from './FillProfile.module.scss';

type IFillProfile = {
  array: InfoField[];
};

export const FillProfile = (props: IFillProfile) => {
  const { array } = props;

  if (array.length === 0) return null;
  return (
    <div className={style['fill-profile']}>
      <h2 className={style['fill-profile__title']}>Дополните профиль</h2>
      <ul className={style['fill-profile__list']}>
        {array.map(el => {
          return (
            <li className={style['fill-profile__list-item']} key={el.lable}>
              <button onClick={_ => void el.actionAdd()} className={style['fill-profile__button']}>
                {el.lable}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
