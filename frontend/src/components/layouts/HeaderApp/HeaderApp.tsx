import { NavLink } from 'react-router';
import style from './HeaderApp.module.scss';
import commonStyle from '@styles/common.module.scss';
import clsx from 'clsx';
import { useAppSelector } from '@/services/store';
import { selectUserIcon } from '@/services/slices/user';
import { ProfileIconBase } from '@/components/pages/ProfilePage/ProfileIconBase/ProfileIconBase';

export const HeaderApp = () => {
  const iconLink = useAppSelector(selectUserIcon);

  return (
    <header className={style['header']}>
      <nav className={style['header__navigation']}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            clsx(style['header__link'], isActive && style['header__link_active'])
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/tests"
          className={({ isActive }) =>
            clsx(style['header__link'], isActive && style['header__link_active'])
          }
        >
          Тестирование
        </NavLink>
      </nav>
      <div className={style['header__icon']}>
        <NavLink to="/profile" className={style['header__link-icon']}>
          {iconLink ? (
            <img src={iconLink} alt="Иконка профиля" className={style['header__img']} />
          ) : (
            <ProfileIconBase
              className={clsx(commonStyle['profile__avatar-base'], style['header__img'])}
            />
          )}
        </NavLink>
      </div>
    </header>
  );
};
