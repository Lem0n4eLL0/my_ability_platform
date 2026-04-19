import { useAppSelector } from '@/services/store';
import style from './ProfilePage.module.scss';
import { selectUser } from '@/services/slices/user';
import { fullNameFormatter } from '@/utils/formatters';
import { ChangeProfileForm } from './ChangeProfileForm';
import { SyntheticEvent, useState } from 'react';
import { FillProfile } from './FillProfile';

export const ProfilePage = () => {
  const user = useAppSelector(selectUser);
  const [isChangeProfile, setIsChangeProfile] = useState(false);
  if (!user) {
    return 'user not found';
  }

  const avatarLink = user.avatarLink ? user.avatarLink : undefined;
  const onClose = (_: SyntheticEvent<HTMLButtonElement>) => {
    setIsChangeProfile(false);
  };

  return (
    <div className={style['profile']}>
      <div className={style['profile__main']}>
        <div className={style['profile__avatar-wrapper']}>
          <div className={style['profile__avatar']}>
            <img src={avatarLink} alt={'профиль'} className={style['profile__avatar-img']} />
          </div>
          <span className={style['profile__full-name']}>{fullNameFormatter(user)}</span>
          {!isChangeProfile && (
            <button className={style['profile__edit-profile-button']}>изменить</button>
          )}
        </div>
        {isChangeProfile && <ChangeProfileForm user={user} onСancel={onClose} />}
        {<FillProfile user={user} />}
      </div>
      <div className={style['profile__dividing-line']}></div>
      <div className={style['profile__information']}></div>
    </div>
  );
};
