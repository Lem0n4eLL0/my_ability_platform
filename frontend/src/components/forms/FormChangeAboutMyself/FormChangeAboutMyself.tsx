import { ZOD_ENTITY } from '@/common/constants';
import { InformationField } from '@/components/FieldInformation';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import z from 'zod';
import formStyle from '@styles/forms.module.scss';
import style from './FormChangeAboutMyself.module.scss';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { selectStatusesUser, updateAboutMyselfUser } from '@/services/slices/user';
import { ErrorField } from '../ErrorField';

type IFormChangeAboutMyself = {
  value: string;
  onСlose: () => void;
};

export const UserChangeAboutMyselfSchema = z.object({
  aboutMyself: ZOD_ENTITY.USER.ABOUT_MYSELF,
});

type ChangeAboutMyselfRequest = z.infer<typeof UserChangeAboutMyselfSchema>;

export const FormChangeAboutMyself = (props: IFormChangeAboutMyself) => {
  const dispatch = useAppDispatch();
  const { updateAboutMyselfStatus } = useAppSelector(selectStatusesUser);
  const { value, onСlose } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ChangeAboutMyselfRequest>({
    resolver: zodResolver(UserChangeAboutMyselfSchema),
    mode: 'onChange',
    defaultValues: {
      aboutMyself: value,
    },
  });

  const onSubmitHandler = async (value: ChangeAboutMyselfRequest) => {
    if (isDirty && isValid) {
      const res = await dispatch(
        updateAboutMyselfUser({
          aboutMyself: value.aboutMyself,
        })
      );
      if (res.meta.requestStatus === 'fulfilled') {
        onСlose();
      }
    }
  };

  const requestError = {
    isError: updateAboutMyselfStatus.status === 'ERROR',
    message: updateAboutMyselfStatus.error?.message,
  };
  const isPending = updateAboutMyselfStatus.status === 'PENDING';

  return (
    <form
      name="change-about-myself-form"
      className={style['form']}
      onSubmit={e => void handleSubmit(onSubmitHandler)(e)}
    >
      <InformationField
        lable="О себе"
        canChange={e => {
          e.stopPropagation();
          onСlose();
        }}
      >
        <textarea
          {...register('aboutMyself')}
          className={clsx(
            style['form__textarea'],
            !!errors.aboutMyself && formStyle['field__error']
          )}
          rows={6}
          disabled={isPending}
        ></textarea>
      </InformationField>

      {(errors.aboutMyself || requestError.isError) && (
        <ErrorField>
          {errors.aboutMyself ? errors.aboutMyself.message : requestError.message}
        </ErrorField>
      )}
      <button
        type="submit"
        className={clsx(
          formStyle['form__button_small'],
          formStyle['form__button_small_green'],
          style['form__button']
        )}
        disabled={!isDirty || !isValid || isPending}
      >
        {isPending ? 'Сохранение...' : 'Сохранить'}
      </button>
    </form>
  );
};
