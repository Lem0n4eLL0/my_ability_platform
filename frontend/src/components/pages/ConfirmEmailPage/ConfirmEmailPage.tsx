import { Navigate, useNavigate, useParams } from 'react-router';
import style from './ConfirmEmailPage.module.scss';
import commonStyle from '@styles/common.module.scss';
import { useEffect } from 'react';
import { Loader } from '@/components/shells/Loader';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { confirmEmailAuth, selectStatusesAuth } from '@/services/slices/auth';

const CONFIRM_EMAIL_NAVIGATE_INTERVAL = 800;
export const ConfirmEmailPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { confirmEmailStatus } = useAppSelector(selectStatusesAuth);
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      void dispatch(confirmEmailAuth({ token: token }));
    }
  }, []);

  useEffect(() => {
    if (confirmEmailStatus.status === 'SUCCESS') {
      setTimeout(() => {
        void navigate('/registration/step-three');
      }, CONFIRM_EMAIL_NAVIGATE_INTERVAL);
    }
  }, [confirmEmailStatus.status]);

  if (!token) {
    return <Navigate to="/error" replace />;
  }

  return (
    <div className={style['content']}>
      {confirmEmailStatus.status === 'PENDING' ? (
        <>
          <span className={style['content__status_message']}>Подтверждение почты</span>
          <Loader loaderClass={commonStyle['loader__small']}> </Loader>
        </>
      ) : confirmEmailStatus.status === 'SUCCESS' ? (
        <span className={style['content__status_message']}>Почта подтверждена ✔️</span>
      ) : (
        <span className={style['content__status_message']}>
          Возникли проблемы с подтверждением почты ❌<br /> {confirmEmailStatus.error?.message}{' '}
        </span>
      )}
    </div>
  );
};
