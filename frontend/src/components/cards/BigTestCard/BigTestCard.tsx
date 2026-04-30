import { Test } from '@/common/commonTypes';
import style from './BigTestCard.module.scss';
import { testLevelFormatter, totalTaskFormatter } from '@/utils/formatters';
import { Rate } from '@/components/Rate';
import { useMemo } from 'react';
import clsx from 'clsx';
import { testLevelClasses } from '@/utils/className';

type IBigTestCard = {
  test: Test;
  onClick?: (test: Test) => void;
  className?: string;
};

export const BigTestCard = (props: IBigTestCard) => {
  const { test, className, onClick } = props;

  const [taskLevelClassName, contentClassName] = useMemo(() => {
    return testLevelClasses(test.difficulty);
  }, [test.difficulty]);

  return (
    <button
      className={clsx(style['content'], contentClassName, className)}
      onClick={() => onClick?.(test)}
    >
      <div
        className={style['content__img_block']}
        style={{ backgroundImage: `url(${test.imgURL})` }}
      >
        <div className={clsx(style['content__level'], taskLevelClassName)}>
          {testLevelFormatter(test.difficulty)}
        </div>
      </div>
      <div className={style['content__description']}>
        <div className={style['content__information']}>
          <Rate rating={test.rate} starsNumber={1} gap={2} ratePosition="right" />
          {test.totalTasks && <span>{totalTaskFormatter(test.totalTasks, 'заданий')}</span>}
        </div>
        <h2 className={style['content__title']}>{test.title}</h2>
      </div>
    </button>
  );
};
