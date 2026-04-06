import { Task } from '@/common/commonTypes';
import style from './LineTestCard.module.scss';
import { Rate } from '@/components/Rate';
import { testLevelFormatter, totalTaskFormatter } from '@/utils/formatters';
import { useMemo } from 'react';
import { testLevelClasses } from '@/utils/className';
import clsx from 'clsx';

type ILineTestCard<T extends Task> = {
  task: T;
  onClick?: (task: T) => void;
  className?: string;
};

export const LineTestCard = <T extends Task>(props: ILineTestCard<T>) => {
  const { task, className, onClick } = props;

  const [taskLevelClassName, contentClassName] = useMemo(() => {
    return testLevelClasses(task.level);
  }, [task.level]);

  return (
    <button
      className={clsx(style['card'], contentClassName, className)}
      onClick={() => onClick?.(task)}
    >
      <div className={style['card__information']}>
        <h3 className={style['card__title']}>{task.title}</h3>
        <Rate
          rating={task.rate}
          starsNumber={1}
          ratePosition="right"
          className={style['card__rate']}
          gap={3}
          size="sm"
        />
        <span className={style['card__tasks']}>{totalTaskFormatter(task.totalTasks)}</span>
      </div>
      <div className={clsx(style['card__level_wrapper'])}>
        <div className={clsx(style['card__level_clip'], taskLevelClassName)}></div>
        <span className={clsx(style['card__level'])}>{testLevelFormatter(task.level)}</span>
      </div>
    </button>
  );
};
