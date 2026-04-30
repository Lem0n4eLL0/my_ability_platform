import { TestResult } from '@/common/commonTypes';
import style from './TestResultSmall.module.scss';
import { SyntheticEvent, useMemo } from 'react';
import { testResultClasses } from '@/utils/className';
import clsx from 'clsx';

type ITestResultSmall = {
  test: TestResult;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
};

export const TestResultSmall = (props: ITestResultSmall) => {
  const { test, onClick } = props;
  const size = 16,
    strokeWidth = 2.2,
    radius = (size - strokeWidth) / 2,
    circumference = 2 * Math.PI * radius,
    percent = test.estimationProcent || 0,
    targetOffset = circumference - (percent / 100) * circumference + 1.1;

  const offset = useMemo(() => targetOffset, [targetOffset]);

  const [shadowClassName, colorClassName, strokeClassName] = useMemo(
    () => testResultClasses(test.difficulty),
    [test]
  );

  return (
    <button
      type="button"
      className={clsx(style['result'], shadowClassName)}
      onClick={e => onClick && onClick(e)}
    >
      <span className={style['result__title']}>{test.title}</span>
      <div className={style['result__dot']}></div>
      <div style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            className={style['result__bg-circle']}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className={clsx(strokeClassName, style['result__circle'])}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className={clsx(style['result__procent'], colorClassName)}>
        {Math.round(test.estimationProcent)}%
      </span>
    </button>
  );
};
