import { ComparePreviewTask, СarouselTask } from '@/common/commonTypes';
import { SyntheticEvent, useEffect, useState } from 'react';
import style from './MainPage.module.scss';
import { getCarouselTasks, getComparePreviewTasks } from '@/api/api';
import { TryTestButton } from '@/components/TryTestButton';

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
      <section></section>
    </div>
  );
};
