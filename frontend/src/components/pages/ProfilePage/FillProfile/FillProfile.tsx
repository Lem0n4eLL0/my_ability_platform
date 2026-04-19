import { User } from '@/common/commonTypes';
import style from './FillProfile.module.scss';
import { useMemo } from 'react';
import { Link } from 'react-router';

type IFillProfile = {
  user: User;
};

type UserInfoField = keyof Pick<
  User,
  'projects' | 'aboutMyself' | 'certificates' | 'workExperience' | 'educations'
>;
type InfoField = {
  lable: string;
  to: string;
};
const formsMap: Record<UserInfoField, InfoField> = {
  aboutMyself: {
    lable: 'О себе',
    to: '',
  },
  projects: {
    lable: 'Мои проекты',
    to: '',
  },
  educations: {
    lable: 'Образование',
    to: '',
  },
  workExperience: {
    lable: 'Опыт работы',
    to: '',
  },
  certificates: {
    lable: 'Сертификаты',
    to: '',
  },
};

export const FillProfile = (props: IFillProfile) => {
  const { user } = props;

  const fillInfoArr = useMemo(() => {
    const result: InfoField[] = [];
    if (!user.aboutMyself) result.push(formsMap.aboutMyself);
    if (user.certificates.length === 0) result.push(formsMap.certificates);
    if (user.projects.length === 0) result.push(formsMap.projects);
    if (user.educations.length === 0) result.push(formsMap.educations);
    if (user.workExperience.length === 0) result.push(formsMap.workExperience);
    return result;
  }, [user]);

  if (fillInfoArr.length === 0) return null;
  return (
    <div className={style['fill-profile']}>
      <h2 className={style['fill-profile__title']}>Дополните профиль</h2>
      <ul className={style['fill-profile__list']}>
        {fillInfoArr.map(el => {
          return (
            <li className={style['fill-profile__list-item']} key={el.lable}>
              <Link to={el.to} className={style['fill-profile__link']}>
                {el.lable}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
