import style from './Footer.module.scss';
import { Link } from 'react-router';
import telegramIcon from '@assets/telegram-icon.svg';
import vkIcon from '@assets/vk-icon.svg';

export const Footer = () => {
  return (
    <footer className={style['footer']}>
      <div className={style['footer__information']}>
        <div className={style['footer__left']}>
          <nav className={style['footer__links']}>
            <Link to="/employers" className={style['footer__link']}>
              Работодателю
            </Link>
            <Link to="/about" className={style['footer__link']}>
              О проекте
            </Link>
          </nav>
          <div className={style['footer__contacts']}>
            <span>+7 (999) 123-45-67</span>
            <span>support@gigant.ru</span>
          </div>
        </div>

        <div className={style['footer__right']}>
          <a
            href="https://vk.com"
            target="_blank"
            rel="noopener noreferrer"
            className={style['socialBtn']}
            aria-label="ВКонтакте"
          >
            <img src={telegramIcon} className={style['social__img']} alt="Телеграм" />
          </a>

          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className={style['socialBtn']}
            aria-label="Telegram"
          >
            <img src={vkIcon} className={style['social__img']} alt="ВКонтакте" />
          </a>
        </div>
      </div>

      <div className={style['footer__copyright']}>© {new Date().getFullYear()} GigAnt</div>
    </footer>
  );
};
