import { NavLink } from 'react-router';
import style from './HeaderApp.module.scss';
import dokerImg from '@assets/docker.png';
import clsx from 'clsx';

export const HeaderApp = () => {
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
          <img src={dokerImg as string} alt="Иконка профиля" className={style['header__img']} />
        </NavLink>
      </div>
    </header>
  );
};
