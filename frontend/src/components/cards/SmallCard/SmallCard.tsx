import { TaskBase } from '@/common/commonTypes';
import style from './SmallCard.module.scss';
import { totalTaskFormatter } from '@/utils/formatters';
import { Rate } from '@/components/Rate';

type ISmallCard<T extends TaskBase> = {
  task: T;
  onClick?: (task: T) => void;
};

export const SmallCard = <T extends TaskBase>(props: ISmallCard<T>) => {
  const { task, onClick } = props;
  return (
    <div className={style['content']} onClick={() => onClick && onClick(task)}>
      <div
        className={style['content__img_block']}
        style={{ backgroundImage: `url(${task.imgURL})` }}
      >
        <div className={style['content__total_test']}>{totalTaskFormatter(task.totalTests)}</div>
        <div className={style['content__rate']}>
          <Rate rating={task.rate} gap={2} textColor="#f2f2f2" />
        </div>
      </div>
      <div className={style['content__title_wrapper']}>
        <h2 className={style['content__title']}>{task.title}</h2>
      </div>
    </div>
  );
};
