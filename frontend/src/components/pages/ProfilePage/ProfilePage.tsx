import { useAppSelector } from '@/services/store';
import style from './ProfilePage.module.scss';
import formStyle from '@styles/forms.module.scss';
import commonStyle from '@styles/common.module.scss';
import { selectUser } from '@/services/slices/user';
import { ChangeProfileForm } from './ChangeProfileForm';
import { FillProfile } from './FillProfile';
import clsx from 'clsx';
import { ProfileIconBase } from './ProfileIconBase/ProfileIconBase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InformationField } from '@/components/FieldInformation';
import { FieldInfoDouble } from '@/components/FieldInfoDouble';
import { User } from '@/common/commonTypes';
import { FormChangeAboutMyself } from '@/components/forms/FormChangeAboutMyself';

type ProfileFill = keyof Pick<
  User,
  'aboutMyself' | 'certificates' | 'educations' | 'projects' | 'workExperience'
>;
type ActionProfileFillMap = Record<ProfileFill, InfoField>;

export type InfoField = {
  isEmpty: boolean;
  lable: string;
  actionAdd: () => void;
  actionChange: (id?: string) => void;
};

export const ProfilePage = () => {
  const user = useAppSelector(selectUser);
  const [isChangeProfile, setIsChangeProfile] = useState(false);
  const [isChangeAboutMyself, setIsChangeAboutMyself] = useState(false);
  const navigate = useNavigate();

  const fillProfile = ((): ActionProfileFillMap | undefined => {
    if (!user) return;
    return {
      aboutMyself: {
        isEmpty: !user.aboutMyself,
        lable: 'О себе',
        actionAdd: () => {
          void navigate('about-myself/add');
        },
        actionChange: () => {},
      },
      projects: {
        isEmpty: user.projects.length === 0,
        lable: 'Мои проекты',
        actionAdd: () => {
          void navigate('projects/add');
        },
        actionChange: id => {
          void navigate(`projects/change/${id}`);
        },
      },
      educations: {
        isEmpty: user.educations.length === 0,
        lable: 'Образование',
        actionAdd: () => {
          void navigate('educations/add');
        },
        actionChange: id => {
          void navigate(`educations/change/${id}`);
        },
      },
      workExperience: {
        isEmpty: user.workExperience.length === 0,
        lable: 'Опыт работы',
        actionAdd: () => {
          void navigate('workExperience/add');
        },
        actionChange: id => {
          void navigate(`workExperience/change/${id}`);
        },
      },
      certificates: {
        isEmpty: user.certificates.length === 0,
        lable: 'Сертификаты',
        actionAdd: () => {
          void navigate('certificates/add');
        },
        actionChange: id => {
          void navigate(`certificates/change/${id}`);
        },
      },
    };
  })();

  const fillProfileArray = fillProfile ? Object.values(fillProfile) : undefined;

  const onCloseChangeProfile = () => {
    setIsChangeProfile(false);
  };

  const avatarLink = user?.avatarLink ? user.avatarLink : undefined;

  if (!user || !fillProfile || !fillProfileArray) {
    return 'user not found';
  }

  return (
    <div className={style['profile']}>
      <section className={style['profile__main']}>
        <div className={style['profile__avatar-wrapper']}>
          <div className={style['profile__avatar']}>
            {avatarLink ? (
              <img
                src={avatarLink}
                alt={'профиль'}
                className={clsx(style['profile__avatar-img'])}
              />
            ) : (
              <ProfileIconBase
                className={clsx(style['profile__avatar-img'], commonStyle['profile__avatar-base'])}
              />
            )}
          </div>
          <div
            className={style['profile__full-name']}
            style={{ marginBottom: isChangeProfile ? '30px' : '' }}
          >
            <span>{`${user.secondName} ${user.firstName}`}</span>
            <span>{user.surname}</span>
          </div>

          {!isChangeProfile && (
            <button
              className={clsx(
                formStyle['form__button_small'],
                formStyle['form__button_small_green']
              )}
              onClick={_ => void setIsChangeProfile(true)}
              style={{ padding: '4px 6px' }}
            >
              изменить
            </button>
          )}
          {isChangeProfile && (
            <div className={style['profile__change-profile-form-wrapper']}>
              <ChangeProfileForm user={user} onСancel={onCloseChangeProfile} />
            </div>
          )}
        </div>

        <div className={style['profile__fill-profile-wrapper']}>
          <FillProfile array={fillProfileArray.filter(el => el.isEmpty)} />
        </div>
      </section>

      <section className={style['profile__information-wrapper']}>
        <div className={style['profile__test-result-wrapper']}>Тесты</div>
        <div className={style['profile__information']}>
          {!fillProfile.aboutMyself.isEmpty && !isChangeAboutMyself ? (
            <InformationField
              lable="О себе"
              canChange={e => {
                e.stopPropagation();
                setIsChangeAboutMyself(true);
              }}
            >
              {user.aboutMyself}
            </InformationField>
          ) : (
            <FormChangeAboutMyself
              value={user.aboutMyself ?? ''}
              onСlose={() => setIsChangeAboutMyself(false)}
            />
          )}
          {!fillProfile.educations.isEmpty && (
            <ul className={commonStyle['info__list']}>
              {user.educations.map((el, ind) => {
                return (
                  <li className={commonStyle['info__list-item']} key={el.id}>
                    {ind === 0 ? (
                      <FieldInfoDouble
                        description={el.specialization}
                        lable={fillProfile.educations.lable}
                        canAdd={() => fillProfile.educations.actionAdd()}
                        canChange={() => fillProfile.educations.actionChange(el.id)}
                      >
                        {el.university}
                      </FieldInfoDouble>
                    ) : (
                      <FieldInfoDouble
                        description={el.specialization}
                        canChange={() => fillProfile.educations.actionChange(el.id)}
                      >
                        {el.university}
                      </FieldInfoDouble>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {!fillProfile.workExperience.isEmpty && (
            <ul className={commonStyle['info__list']}>
              {user.workExperience.map((el, ind) => (
                <li className={commonStyle['info__list-item']} key={el.id}>
                  {ind === 0 ? (
                    <FieldInfoDouble
                      description={el.post}
                      lable={fillProfile.workExperience.lable}
                      canAdd={() => fillProfile.workExperience.actionAdd()}
                      canChange={() => fillProfile.workExperience.actionChange(el.id)}
                    >
                      {el.company}
                    </FieldInfoDouble>
                  ) : (
                    <FieldInfoDouble
                      description={el.post}
                      canChange={() => fillProfile.workExperience.actionChange(el.id)}
                    >
                      {el.company}
                    </FieldInfoDouble>
                  )}
                </li>
              ))}
            </ul>
          )}
          {!fillProfile.projects.isEmpty && (
            <ul className={commonStyle['info__list']}>
              {user.projects.map((el, ind) => (
                <li className={commonStyle['info__list-item']} key={el.id}>
                  {ind === 0 ? (
                    <InformationField
                      lable={fillProfile.projects.lable}
                      canAdd={() => fillProfile.projects.actionAdd()}
                      canChange={() => fillProfile.projects.actionChange(el.id)}
                    >
                      {el.title}
                    </InformationField>
                  ) : (
                    <InformationField canChange={() => fillProfile.projects.actionChange(el.id)}>
                      {el.title}
                    </InformationField>
                  )}
                </li>
              ))}
            </ul>
          )}
          {!fillProfile.certificates.isEmpty && (
            <ul className={commonStyle['info__list']}>
              {user.certificates.map((el, ind) => (
                <li className={commonStyle['info__list-item']} key={el.id}>
                  {ind === 0 ? (
                    <InformationField
                      lable={fillProfile.certificates.lable}
                      canAdd={() => fillProfile.certificates.actionAdd()}
                      canChange={() => fillProfile.certificates.actionChange(el.id)}
                    >
                      {el.title}
                    </InformationField>
                  ) : (
                    <InformationField
                      canChange={() => fillProfile.certificates.actionChange(el.id)}
                    >
                      {el.title}
                    </InformationField>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};
