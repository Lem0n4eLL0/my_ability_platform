import { useMemo } from 'react';
import style from './Rate.module.scss';
import { assertNever } from '@/utils/utils';
import clsx from 'clsx';

type IRate = {
  rating: number;
  ratingMax?: number;
  starsNumber?: number;
  ratePosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  emptyColor?: string;
  textColor?: string;
  gap?: number | string;
  className?: string;
};

const starPath =
  'M7.13292 0L8.81677 5.18237H14.2658L9.85745 8.38525L11.5413 13.5676L7.13292 10.3647L2.72453 13.5676L4.40838 8.38525L-4.76837e-06 5.18237H5.44906L7.13292 0Z';

export const Rate = (props: IRate) => {
  const {
    rating,
    ratingMax = 5,
    color = '#FFC300',
    emptyColor = '#e0e0e0',
    textColor,
    starsNumber = 5,
    gap = 5,
    ratePosition = 'left',
    size = 'md',
    className,
  } = props;

  const flexDirection = useMemo(() => {
    switch (ratePosition) {
      case 'left':
        return 'row';
      case 'right':
        return 'row-reverse';
      default:
        assertNever(ratePosition);
        return 'row';
    }
  }, [ratePosition]);

  const [fontSize, starSize] = useMemo(() => {
    switch (size) {
      case 'sm':
        return [14, 14];
      case 'md':
        return [16, 16];
      case 'lg':
        return [18, 18];
      default:
        assertNever(size);
        return [16, 16];
    }
  }, [size]);

  return (
    <div
      className={clsx(style['star-rating'], className)}
      aria-label={`Рейтинг: ${rating} из ${starsNumber}`}
      style={{ flexDirection: flexDirection, gap: gap }}
    >
      <span
        className={style['star-rating__value']}
        style={{ color: textColor, fontSize: fontSize }}
      >
        {rating.toFixed(1)}
      </span>
      <div className={style['star-rating__stars']}>
        {Array.from({ length: starsNumber }).map((_, index) => {
          const starNumber = index;
          const starMaxRate = ratingMax / starsNumber;
          const curStarRate = rating - starNumber * starMaxRate;
          let fillPercentage = 0;
          if (curStarRate >= starMaxRate) {
            fillPercentage = 100;
          } else if (curStarRate > 0) {
            fillPercentage = Math.round((curStarRate / starMaxRate) * 100);
          } else {
            fillPercentage = 0;
          }
          return (
            <div key={index} className={style['star-rating__star']} style={{ width: starSize }}>
              <svg viewBox="0 0 15 15" className={style['star-rating__star-svg']}>
                <path d={starPath} fill={emptyColor} />

                <defs>
                  <clipPath id={`star-fill-${index}-${rating}`}>
                    <rect width={`${fillPercentage}%`} height="16" />
                  </clipPath>
                </defs>

                <g clipPath={`url(#star-fill-${index}-${rating})`}>
                  <path d={starPath} fill={color} />
                </g>
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};
