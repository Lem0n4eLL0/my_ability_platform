import { NavLink } from 'react-router';
import style from './Header.module.scss';
import clsx from 'clsx';

export const Header = () => {
  return (
    <header className={clsx(style['header'], style['header--default'])}>
      <div className={style['header__container']}>
        <div className={style['header__logo']}>
          <NavLink to="/" aria-label="На главную" className={style['header__logo_link']}>
            GigAnt
          </NavLink>
        </div>

        <nav className={style['header__nav']}>
          <NavLink
            to="/employers"
            className={({ isActive }) =>
              clsx(style['header__link'], isActive && style['header__link--active'])
            }
          >
            Работодателю
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              clsx(style['header__link'], isActive && style['header__link--active'])
            }
          >
            О проекте
          </NavLink>
        </nav>

        <div className={style['header__actions']}>
          <NavLink
            to="/login"
            className={clsx(style['header__btn'], style['header__btn--outline'])}
          >
            Вход
          </NavLink>
          <NavLink
            to="/register"
            className={clsx(style['header__btn'], style['header__btn--primary'])}
          >
            Регистрация
          </NavLink>
        </div>
      </div>
    </header>
  );
};
