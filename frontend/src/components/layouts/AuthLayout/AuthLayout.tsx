import { Outlet } from 'react-router';
import style from './AuthLayout.module.scss';

export type IAuthLayout = {
  rightComponent: React.ReactNode;
};

export const AuthLayout = (props: IAuthLayout) => {
  const { rightComponent } = props;

  return (
    <section className={style['auth']}>
      <div className={style['form']}>
        <Outlet />
      </div>
      <div className={style['right']}>
        <div className={style['right__shape']}>{rightComponent}</div>
      </div>
    </section>
  );
};
