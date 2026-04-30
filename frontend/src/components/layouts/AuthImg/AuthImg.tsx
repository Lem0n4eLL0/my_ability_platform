import style from './AuthImg.module.scss';
import bgImg from '@assets/bg/bg-auth.png';

export const AuthImg = () => {
  return <div className={style['img']} style={{ backgroundImage: `url(${bgImg})` }}></div>;
};
