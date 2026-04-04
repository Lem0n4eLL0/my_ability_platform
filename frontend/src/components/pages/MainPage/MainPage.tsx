import { ComparePreviewTask, СarouselTask } from '@/common/commonTypes';
import { SyntheticEvent, useEffect, useState } from 'react';
import style from './MainPage.module.scss';
import { getCarouselTasks, getComparePreviewTasks } from '@/api/api';
import { TryTestButton } from '@/components/TryTestButton';
import { StepIcon } from '@/components/StepIcon/StepIcon';
import profileIcon from '@assets/user-profile-icon.svg';
import checkDoubleIcon from '@assets/check-double-icon.svg';
import linkIcon from '@assets/link-icon.svg';
import cupIcon from '@assets/cup-icon.svg';
import arrowStepOneTwo from '@assets/arrow-1.svg';
import arrowStepTwoThree from '@assets/arrow-2.svg';
import arrowStepThreeFour from '@assets/arrow-3.svg';
import clsx from 'clsx';

export const MainPage = () => {
  const [carouselTasks, setCarouselTasks] = useState<СarouselTask[]>([]);
  const [comparePreviewTasks, setComparePreviewTasks] = useState<ComparePreviewTask[]>([]);

  useEffect(() => {
    Promise.allSettled([getCarouselTasks(), getComparePreviewTasks()])
      .then(([carTasks, prevTasks]) => {
        if (carTasks.status === 'fulfilled') {
          setCarouselTasks(carTasks.value.tasks);
        }
        if (prevTasks.status === 'fulfilled') {
          setComparePreviewTasks(prevTasks.value.tasks);
        }
      })
      .catch(e => {});
  }, []);

  const TryTestButtonHandler = (_: SyntheticEvent<HTMLButtonElement>) => {};

  return (
    <div className={style['page__wrapper']}>
      <section className={style['main']}>
        <div className={style['main__content']}>
          <h1 className={style['main__title']}>
            GigAnt — цифровое портфолио, которое говорит за вас
          </h1>
          <div className={style['main__information']}>
            <p className={style['main__description']}>
              Перестаньте тратить время на бесконечные собеседования, где приходится доказывать
              очевидное. Ваше портфолио в GigAnt покажет реальный уровень экспертизы с первого
              взгляда.
            </p>
            <TryTestButton onClick={TryTestButtonHandler} />
          </div>
        </div>
      </section>
      <section className={style['way']}>
        <h2 className={style['way__title']}>Стань востребованым в профессии всего за 4 шага</h2>
        <div className={style['way__step']}>
          <StepIcon src={profileIcon} alt="Профиль" extraClassName={style['step__icon']} />
          <p className={style['step__description']}>
            Создайте профиль — заполните информацию о себе и выберите направления для оценки
          </p>
          <img
            src={arrowStepOneTwo}
            alt=""
            className={clsx(style['arrow'], style['arrow__step_one-two'])}
          />
        </div>
        <div className={clsx(style['way__step'], style['way__step_reverse'])}>
          <StepIcon src={checkDoubleIcon} alt="Две галочки" extraClassName={style['step__icon']} />
          <p className={clsx(style['step__description'], style['step__description_reverse'])}>
            Пройдите тестирование — решайте задачи по выбранным технологиям и получайте объективную
            оценку
          </p>
          <img
            src={arrowStepTwoThree}
            alt=""
            className={clsx(style['arrow'], style['arrow__step_two-three'])}
          />
        </div>
        <div className={style['way__step']}>
          <StepIcon src={linkIcon} alt="Ссылка" extraClassName={style['step__icon']} />
          <p className={style['step__description']}>
            Поделитесь результатами — отправьте работодателю ссылку на ваш публичный профиль
          </p>
          <img
            src={arrowStepThreeFour}
            alt=""
            className={clsx(style['arrow'], style['arrow__step_three-four'])}
          />
        </div>
        <div className={clsx(style['way__step'], style['way__step_reverse'])}>
          <StepIcon src={cupIcon} alt="Кубок" extraClassName={style['step__icon']} />
          <p className={clsx(style['step__description'], style['step__description_reverse'])}>
            Получите предложение — выделяйтесь среди кандидатов и находите работу мечты
          </p>
        </div>
      </section>
    </div>
  );
};
