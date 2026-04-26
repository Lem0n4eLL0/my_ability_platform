import { Test } from '@/common/commonTypes';
import style from './SmallTestCard.module.scss';
import { totalTaskFormatter } from '@/utils/formatters';
import { Rate } from '@/components/Rate';

type ISmallTestCard = {
  test: Test;
  onClick?: (test: Test) => void;
};

export const SmallTestCard = (props: ISmallTestCard) => {
  const { test, onClick } = props;

  return (
    <button className={style['content']} onClick={() => onClick?.(test)}>
      <div
        className={style['content__img_block']}
        style={{ backgroundImage: `url(${test.imgURL})` }}
      >
        {test.totalTasks && (
          <div className={style['content__total_test']}>{totalTaskFormatter(test.totalTasks)}</div>
        )}
        <div className={style['content__rate']}>
          <Rate rating={test.rate} textColor="#f2f2f2" size="sm" />
        </div>
      </div>
      <div className={style['content__title_wrapper']}>
        <h2 className={style['content__title']}>{test.title}</h2>
      </div>
    </button>
  );
};
