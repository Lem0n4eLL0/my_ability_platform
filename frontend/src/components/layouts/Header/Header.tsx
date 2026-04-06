import { NavLink } from 'react-router';
import style from './Header.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={clsx(style['header'], scrolled && style['header--scrolled'])}>
      <div className={style['header__bg']}></div>
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
