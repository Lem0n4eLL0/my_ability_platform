import { ReactNode } from 'react';
import { Outlet } from 'react-router';
import style from './MainLayout.module.css';

interface IMainLayout {
  header?: ReactNode;
  footer?: ReactNode;
}

export const MainLayout = (props: IMainLayout) => {
  const { header, footer } = props;
  return (
    <div className={style['pageWrapper']}>
      {header}
      <main className={style['contentWrapper']}>
        <Outlet />
      </main>
      {footer}
    </div>
  );
};
