import { Test } from '@/common/commonTypes';
import style from './LineTestCard.module.scss';
import { Rate } from '@/components/Rate';
import { testLevelFormatter, totalTaskFormatter } from '@/utils/formatters';
import { useMemo } from 'react';
import { testLevelClasses } from '@/utils/className';
import clsx from 'clsx';

type ILineTestCard = {
  test: Test;
  onClick?: (test: Test) => void;
  className?: string;
};

export const LineTestCard = (props: ILineTestCard) => {
  const { test, className, onClick } = props;

  const [taskLevelClassName, contentClassName] = useMemo(() => {
    return testLevelClasses(test.difficulty);
  }, [test.difficulty]);

  return (
    <button
      className={clsx(style['card'], contentClassName, className)}
      onClick={() => onClick?.(test)}
    >
      <div className={style['card__information']}>
        <h3 className={style['card__title']}>{test.title}</h3>
        <Rate
          rating={test.rate}
          starsNumber={1}
          ratePosition="right"
          className={style['card__rate']}
          gap={3}
          size="sm"
        />
        {test.totalTasks && (
          <span className={style['card__tasks']}>{totalTaskFormatter(test.totalTasks)}</span>
        )}
      </div>
      <div className={clsx(style['card__level_wrapper'])}>
        <div className={clsx(style['card__level_clip'], taskLevelClassName)}></div>
        <span className={clsx(style['card__level'])}>{testLevelFormatter(test.difficulty)}</span>
      </div>
    </button>
  );
};
