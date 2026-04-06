import { Task } from '@/common/commonTypes';
import style from './BigTestCard.module.scss';
import { testLevelFormatter, totalTaskFormatter } from '@/utils/formatters';
import { Rate } from '@/components/Rate';
import { useMemo } from 'react';
import clsx from 'clsx';
import { testLevelClasses } from '@/utils/className';

type IBigTestCard<T extends Task> = {
  task: T;
  onClick?: (task: T) => void;
  className?: string;
};

export const BigTestCard = <T extends Task>(props: IBigTestCard<T>) => {
  const { task, className, onClick } = props;

  const [taskLevelClassName, contentClassName] = useMemo(() => {
    return testLevelClasses(task.level);
  }, [task.level]);

  return (
    <button
      className={clsx(style['content'], contentClassName, className)}
      onClick={() => onClick?.(task)}
    >
      <div
        className={style['content__img_block']}
        style={{ backgroundImage: `url(${task.imgURL})` }}
      >
        <div className={clsx(style['content__level'], taskLevelClassName)}>
          {testLevelFormatter(task.level)}
        </div>
      </div>
      <div className={style['content__description']}>
        <div className={style['content__information']}>
          <Rate rating={task.rate} starsNumber={1} gap={2} ratePosition="right" />
          <span>{totalTaskFormatter(task.totalTasks, 'заданий')}</span>
        </div>
        <h2 className={style['content__title']}>{task.title}</h2>
      </div>
    </button>
  );
};
