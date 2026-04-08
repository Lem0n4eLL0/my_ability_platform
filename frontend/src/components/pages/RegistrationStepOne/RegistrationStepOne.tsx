import { Input } from '@/components/forms/Input';
import style from './RegistrationStepOne.module.scss';
import formStyle from '@styles/forms.module.scss';
import commonStyle from '@styles/common.module.scss';
import { FormElement } from '@/components/forms/FormElement';
import { ErrorField } from '@/components/forms/ErrorField';
import z from 'zod';
import { registrationStepOneRequest } from '@/api/apiTypes';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { registrationStepOneAuth, selectStatusesAuth } from '@/services/slices/auth';

export type RegistrationStepOneForm = z.infer<typeof registrationStepOneRequest>;

export const RegistrationStepOne = () => {
  const dispatch = useAppDispatch();
  const { registrationStepOneStatus } = useAppSelector(selectStatusesAuth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationStepOneForm>({
    resolver: zodResolver(registrationStepOneRequest),
    mode: 'onChange',
  });

  const registrationStepOneFormHandler = async (data: RegistrationStepOneForm) => {
    const { confirm, ...resquest } = data;
    const result = await dispatch(registrationStepOneAuth(resquest));
    if (result.meta.requestStatus === 'fulfilled') {
      void navigate('/registration/step-two');
    }
  };

  const requestError = {
    isError: !!registrationStepOneStatus.error,
    message: registrationStepOneStatus.error?.message,
  };
  const isregistrationStepOnePending = registrationStepOneStatus.status === 'PENDING';

  return (
    <div className={style['content']}>
      <h1 className={style['content__title']}>Создание аккаунта</h1>
      <form
        name="registration_step_one_form"
        className={style['content__form']}
        onSubmit={e => void handleSubmit(registrationStepOneFormHandler)(e)}
        noValidate
      >
        <div className={style['content__filds']}>
          <FormElement label="Почта" error={errors.email?.message}>
            <Input {...register('email')} placeholder="Введите почту" isError={!!errors.email} />
          </FormElement>
          <FormElement label="Придумайте пароль" error={errors.password?.message}>
            <Input
              {...register('password')}
              placeholder="Введите пароль"
              isError={!!errors.password}
            />
          </FormElement>
          <FormElement label="Повторите пароль" error={errors.confirm?.message}>
            <Input
              {...register('confirm')}
              type="password"
              placeholder="Повторите пароль"
              isError={!!errors.confirm}
            />
          </FormElement>
        </div>
        <div className={style['content__agreement_wrapper']}>
          <input
            type="checkbox"
            {...register('isAgreementAccepted')}
            className={style['content__checkbox']}
          />
          <span className={style['content__agreement']}>
            Я согласен c{' '}
            <Link to="/agreement" className={commonStyle['base__link']}>
              Пользовательским соглашением
            </Link>{' '}
            и{' '}
            <Link to="/policy" className={commonStyle['base__link']}>
              Политикой обработки персональных данных.
            </Link>
          </span>
        </div>
        <div className={style['content__controls']}>
          {(requestError.isError || !!errors.isAgreementAccepted) && (
            <ErrorField>
              {requestError.message?.length !== 0
                ? requestError.message
                : errors.isAgreementAccepted?.message}
            </ErrorField>
          )}
          <button
            type="submit"
            className={formStyle['form__button_green']}
            disabled={!isValid || isregistrationStepOnePending}
          >
            {!isregistrationStepOnePending ? 'Отправить' : 'Отправка...'}
          </button>
        </div>
      </form>
    </div>
  );
};
