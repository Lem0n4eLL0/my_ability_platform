import { Input } from '@/components/forms/Input';
import formStyle from '@styles/forms.module.scss';
import { FormElement } from '@/components/forms/FormElement';
import { ErrorField } from '@/components/forms/ErrorField';
import { RegistrationStepThreeRequest, registrationStepThreeRequest } from '@/api/apiTypes';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { registrationStepThreeAuth, selectStatusesAuth } from '@/services/slices/auth';

export type RegistrationStepThreeForm = RegistrationStepThreeRequest;

export const RegistrationStepThree = () => {
  const dispatch = useAppDispatch();
  const { registrationStepThreeStatus } = useAppSelector(selectStatusesAuth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationStepThreeForm>({
    resolver: zodResolver(registrationStepThreeRequest),
    mode: 'onChange',
  });

  const registrationStepThreeFormHandler = async (data: RegistrationStepThreeForm) => {
    const result = await dispatch(registrationStepThreeAuth(data));
    if (result.meta.requestStatus === 'fulfilled') {
      void navigate('/profile');
    }
  };

  const requestError = {
    isError: !!registrationStepThreeStatus.error,
    message: registrationStepThreeStatus.error?.message ?? '',
  };
  const isRegistrationStepThreePending = registrationStepThreeStatus.status === 'PENDING';

  return (
    <div className={formStyle['auth-form__content']}>
      <h1 className={formStyle['auth-form__title']}>Заполните профиль</h1>
      <form
        name="registration_step_three_form"
        className={formStyle['auth-form__form']}
        onSubmit={e => void handleSubmit(registrationStepThreeFormHandler)(e)}
        noValidate
      >
        <div className={formStyle['auth-form__filds']}>
          <FormElement label="Фамилия" error={errors.lastName?.message}>
            <Input
              {...register('lastName')}
              placeholder="Введите фамилию"
              isError={!!errors.lastName}
              disabled={isRegistrationStepThreePending}
            />
          </FormElement>
          <FormElement label="Имя" error={errors.firstName?.message}>
            <Input
              {...register('firstName')}
              placeholder="Введите имя"
              isError={!!errors.firstName}
              disabled={isRegistrationStepThreePending}
            />
          </FormElement>
          <FormElement label="Отчество" error={errors.surname?.message}>
            <Input
              {...register('surname')}
              placeholder="Введите отчество"
              isError={!!errors.surname}
              disabled={isRegistrationStepThreePending}
            />
          </FormElement>
          <FormElement label="Дата рождения" error={errors.birthday?.message}>
            <Input
              {...register('birthday', {
                setValueAs: v => (v ? new Date(v as string) : undefined),
              })}
              style={{ width: 'min-content' }}
              type="date"
              isError={!!errors.birthday}
              disabled={isRegistrationStepThreePending}
            />
          </FormElement>
        </div>
        <div className={formStyle['auth-form__controls']}>
          {requestError.isError && <ErrorField>{requestError.message}</ErrorField>}
          <button
            type="submit"
            className={formStyle['form__button_green']}
            disabled={!isValid || isRegistrationStepThreePending}
          >
            {!isRegistrationStepThreePending ? 'Отправить' : 'Отправка...'}
          </button>
        </div>
      </form>
    </div>
  );
};
