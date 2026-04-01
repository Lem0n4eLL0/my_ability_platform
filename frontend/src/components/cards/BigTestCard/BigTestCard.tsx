import { Task } from '@/common/commonTypes';
import style from './BigTestCard.module.scss';
import commonStyle from '@/styles/common.module.scss';
import { testLevelFormatter, totalTaskFormatter } from '@/utils/formatters';
import { Rate } from '@/components/Rate';
import { useMemo } from 'react';
import { assertNever } from '@/utils/utils';
import clsx from 'clsx';

type IBigTestCard<T extends Task> = {
  task: T;
  onClick?: (task: T) => void;
};

export const BigTestCard = <T extends Task>(props: IBigTestCard<T>) => {
  const { task, onClick } = props;

  const [taskLevelClassName, contentClassName] = useMemo(() => {
    switch (task.level) {
      case 'ENTRANCE':
        return [commonStyle['test__entrance_bg'], commonStyle['test__entrance_box-shadow']];
      case 'MEDIUM':
        return [commonStyle['test__medium_bg'], commonStyle['test__medium_box-shadow']];
      case 'HARD':
        return [commonStyle['test__hard_bg'], commonStyle['test__hard_box-shadow']];
      case 'EXPERT':
        return [commonStyle['test__expert_bg'], commonStyle['test__expert_box-shadow']];
      default:
        assertNever(task.level);
        return [commonStyle['test__none_bg'], commonStyle['test__none_box-shadow']];
    }
  }, [task.level]);

  return (
    <div
      className={clsx(style['content'], contentClassName)}
      onClick={() => onClick && onClick(task)}
    >
      <div
        className={style['content__img_block']}
        style={{ backgroundImage: `url(${task.imgURL})` }}
      >
        <div className={clsx(style['content__total_test'], taskLevelClassName)}>
          {testLevelFormatter(task.level)}
        </div>
      </div>
      <div className={style['content__description']}>
        <div className={style['content__information']}>
          <Rate rating={task.rate} starsNumber={1} gap={2} ratePosition="right" />
          <span>{totalTaskFormatter(task.totalTests, 'заданий')}</span>
        </div>
        <h2 className={style['content__title']}>{task.title}</h2>
      </div>
    </div>
  );
};
