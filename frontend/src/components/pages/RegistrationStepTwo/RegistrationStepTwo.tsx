import style from './RegistrationStepTwo.module.scss';
import formStyle from '@styles/forms.module.scss';
import commonStyle from '@styles/common.module.scss';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { useEffect, useState } from 'react';
import { selectIsEmailConfirm, setIsEmailConfirm } from '@/services/slices/auth';
import { bulidURL } from '@/api/apiHelp';
import { Navigate } from 'react-router';
import { selectEmail } from '@/services/slices/user';
import { Loader } from '@/components/shells/Loader';
import clsx from 'clsx';

const EMAIL_CONFIRM_MESSAGE = 'email_confirmed';

export const RegistrationStepTwo = () => {
  const dispatch = useAppDispatch();
  const isConfirm = useAppSelector(selectIsEmailConfirm);
  const email = useAppSelector(selectEmail);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isConfirm) return;

    const eventSource = new EventSource(bulidURL('email/confirm/stream'));

    eventSource.addEventListener(EMAIL_CONFIRM_MESSAGE, _ => {
      eventSource.close();
      dispatch(setIsEmailConfirm(true));
    });

    eventSource.onerror = () => {
      eventSource.close();
      setHasError(true);
    };
    return () => {
      setHasError(false);
      eventSource.close();
    };
  }, [dispatch, isConfirm]);

  if (isConfirm) {
    return <Navigate to="/registration/step-three" replace={true} />;
  }

  return (
    <div className={clsx(style['content'], formStyle['auth-form__content'])}>
      <h1 className={formStyle['auth-form__title']} style={{ margin: 0 }}>
        Подтверждение почты
      </h1>
      <div>
        <p style={{ marginBottom: '5px' }}>
          Мы отправили письмо на адрес{' '}
          <a href={`mailto:${email}`} className={commonStyle['base__link']}>
            {email}
          </a>
        </p>
        <p>Для завершения регистрации перейдите по ссылке в письме.</p>
      </div>
      <div className={style['content__status']}>
        {hasError ? (
          <span className={style['content__status_message_error']}>
            Неизвестная ошибка проверки почты
          </span>
        ) : (
          <>
            <span className={style['content__status_message']}>Ожидаем подтверждения</span>
            <Loader loaderClass={commonStyle['loader__small']}> </Loader>
          </>
        )}
      </div>
    </div>
  );
};
