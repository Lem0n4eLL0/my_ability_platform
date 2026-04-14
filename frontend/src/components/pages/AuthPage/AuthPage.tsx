import { Input } from '@/components/forms/Input';
import formStyle from '@styles/forms.module.scss';
import { FormElement } from '@/components/forms/FormElement';
import { ErrorField } from '@/components/forms/ErrorField';
import { authenticationRequest, AuthenticationRequest } from '@/api/apiTypes';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { authenticationAuth, selectStatusesAuth } from '@/services/slices/auth';

export type AuthPageForm = AuthenticationRequest;

export const AuthPage = () => {
  const dispatch = useAppDispatch();
  const { authenticationStatus } = useAppSelector(selectStatusesAuth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthPageForm>({
    resolver: zodResolver(authenticationRequest),
    mode: 'onChange',
  });

  const authenticationFormHandler = async (data: AuthPageForm) => {
    const result = await dispatch(authenticationAuth(data));
    if (result.meta.requestStatus === 'fulfilled') {
      void navigate('/profile');
    }
  };

  const requestError = {
    isError: !!authenticationStatus.error,
    message: authenticationStatus.error?.message ?? '',
  };
  const isAuthenticationPending = authenticationStatus.status === 'PENDING';

  return (
    <div className={formStyle['auth-form__content']}>
      <h1 className={formStyle['auth-form__title']}>Авторизация</h1>
      <form
        name="authentication_form"
        className={formStyle['auth-form__form']}
        onSubmit={e => void handleSubmit(authenticationFormHandler)(e)}
        noValidate
      >
        <div className={formStyle['auth-form__filds']}>
          <FormElement label="Почта" error={errors.email?.message}>
            <Input
              {...register('email')}
              placeholder="Введите почту"
              isError={!!errors.email}
              disabled={isAuthenticationPending}
            />
          </FormElement>
          <FormElement label="Придумайте пароль" error={errors.password?.message}>
            <Input
              {...register('password')}
              placeholder="Введите пароль"
              isError={!!errors.password}
              disabled={isAuthenticationPending}
            />
          </FormElement>
        </div>
        <div className={formStyle['auth-form__controls']}>
          {requestError.isError && <ErrorField> {requestError.message} </ErrorField>}
          <button
            type="submit"
            className={formStyle['form__button_green']}
            disabled={!isValid || isAuthenticationPending}
          >
            {!isAuthenticationPending ? 'Войти' : 'Авторизация...'}
          </button>
        </div>
      </form>
    </div>
  );
};
