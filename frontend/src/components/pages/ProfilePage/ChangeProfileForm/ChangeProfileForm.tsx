import { FormElement } from '@/components/forms/FormElement';
import style from './ChangeProfileForm.module.scss';
import formStyle from '@styles/forms.module.scss';
import { User } from '@/common/commonTypes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { ChangeMainProfileRequestSchema } from '@/api/apiTypes';
import { selectStatusesUser, updateMainProfileUser } from '@/services/slices/user';
import { Input } from '@/components/forms/Input';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { dateForInputFormatter } from '@/utils/formatters';
import { ErrorField } from '@/components/forms/ErrorField';
import clsx from 'clsx';

export type IChangeProfileForm = {
  user: User;
  onСancel: () => void;
};

export type ChangeMainProfileRequest = z.infer<typeof ChangeMainProfileRequestSchema>;

export const ChangeProfileForm = (props: IChangeProfileForm) => {
  const { user, onСancel } = props;
  const dispatch = useAppDispatch();
  const { updateMainProfileStatus } = useAppSelector(selectStatusesUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<ChangeMainProfileRequest>({
    resolver: zodResolver(ChangeMainProfileRequestSchema),
    mode: 'onChange',
    defaultValues: {
      surname: user.surname,
      contactPhone: user.contactPhone,
      github: user.github,
    },
  });

  const changeProfileHandler = async (data: ChangeMainProfileRequest) => {
    const response = Object.keys(dirtyFields).reduce((acc, key) => {
      if (dirtyFields[key as keyof typeof dirtyFields]) {
        acc[key as keyof ChangeMainProfileRequest] =
          data[key as keyof ChangeMainProfileRequest] ?? null;
      }
      return acc;
    }, {} as Partial<ChangeMainProfileRequest>);
    const result = await dispatch(updateMainProfileUser(response));
    if (result.meta.requestStatus === 'fulfilled') {
      onСancel();
    }
  };

  const birthday = dateForInputFormatter(new Date(user.birthday));
  const requestError = {
    isError: !!updateMainProfileStatus.error,
    message: updateMainProfileStatus.error?.message ?? '',
  };
  const isUpdateProfileStatusPending = updateMainProfileStatus.status === 'PENDING';

  return (
    <form
      name="form-change-profile"
      className={style['form']}
      onSubmit={e => void handleSubmit(changeProfileHandler)(e)}
      noValidate
    >
      <fieldset name="form_main_data" className={style['form__fieldset']}>
        <legend className={style['form__legend']}>Основные данные</legend>
        <FormElement label="имя" lableClassName={style['form__label']}>
          <Input
            value={user.firstName}
            name="first_name"
            className={formStyle['form_field_small']}
            disabled
          />
        </FormElement>
        <FormElement label="фамилия" lableClassName={style['form__label']}>
          <Input
            value={user.secondName}
            name="second_name"
            className={formStyle['form_field_small']}
            disabled
          />
        </FormElement>
        <FormElement
          label="отчество"
          errorClassName={style['form__error-field']}
          lableClassName={style['form__label']}
          error={errors.surname?.message}
        >
          <Input
            {...register('surname')}
            className={formStyle['form_field_small']}
            isError={!!errors.surname}
            placeholder="введите отчество"
            disabled={isUpdateProfileStatusPending}
          />
        </FormElement>
        <FormElement label="дата рождения" lableClassName={style['form__label']}>
          <Input
            type="date"
            value={birthday}
            name="birthdate"
            className={formStyle['form_field_small']}
            style={{ width: 'min-content' }}
            disabled
          />
        </FormElement>
      </fieldset>
      <fieldset name="form_links" className={style['form__fieldset']}>
        <legend className={style['form__legend']}>Контактные данные</legend>
        <FormElement label="почта" lableClassName={style['form__label']}>
          <Input
            type="text"
            value={user.email}
            name="email"
            className={formStyle['form_field_small']}
            disabled
          />
        </FormElement>
        <FormElement
          label="телефон"
          errorClassName={style['form__error-field']}
          lableClassName={style['form__label']}
          error={errors.contactPhone?.message}
        >
          <Input
            {...register('contactPhone')}
            className={formStyle['form_field_small']}
            isError={!!errors.contactPhone}
            placeholder="+70000000000"
            disabled={isUpdateProfileStatusPending}
          />
        </FormElement>
        <FormElement
          label="github"
          errorClassName={style['form__error-field']}
          lableClassName={style['form__label']}
          error={errors.github?.message}
        >
          <Input
            {...register('github')}
            className={formStyle['form_field_small']}
            isError={!!errors.github}
            placeholder="https://github.com"
            disabled={isUpdateProfileStatusPending}
          />
        </FormElement>
      </fieldset>
      <div className={style['form__footer']}>
        {requestError.isError && <ErrorField>{requestError.message}</ErrorField>}
        <div className={style['form__controls']}>
          <button
            type="submit"
            className={clsx(formStyle['form__button_small'], formStyle['form__button_small_green'])}
            disabled={!isDirty || !isValid || isUpdateProfileStatusPending}
          >
            {!isUpdateProfileStatusPending ? 'Изменить' : 'Изменение...'}
          </button>
          <button
            className={clsx(formStyle['form__button_small'], style['form__сancel-button'])}
            type="button"
            onClick={onСancel}
          >
            Отмена
          </button>
        </div>
      </div>
    </form>
  );
};
