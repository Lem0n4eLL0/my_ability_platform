import { TEST_LEVELS_RU, TestLevel, TestResult } from '@/common/commonTypes';
import style from './TestsResult.module.scss';
import commonStyle from '@styles/common.module.scss';
import { TestResultSmall } from '@/components/TestResultSmall';
import { InformationField } from '@/components/FieldInformation';
import clsx from 'clsx';
import { useNavigate } from 'react-router';

type ITestsResult = {
  tests: TestResult[];
};

export const TestsResult = (props: ITestsResult) => {
  const { tests } = props;
  const navigate = useNavigate();
  const difficultyTestsMap: Record<TestLevel, TestResult[]> = (() => {
    const res: Record<TestLevel, TestResult[]> = {
      ENTRANCE: [],
      MEDIUM: [],
      HARD: [],
      EXPERT: [],
    };
    tests.forEach(el => {
      res[el.difficulty].push(el);
    });
    return res;
  })();

  const onTestClick = (id: string) => {
    void navigate(`tests-ressult/${id}`);
  };

  if (tests.length === 0) {
    return <InformationField lable="Результаты тестирования">Нет данных</InformationField>;
  }

  return (
    <>
      <h2 className={style['results__title']}>Результаты тестирования</h2>
      <div className={style['results']}>
        {difficultyTestsMap.EXPERT.length !== 0 && (
          <div className={style['results__block']}>
            <span className={clsx(style['results__list-title'], commonStyle['test__expert_color'])}>
              {TEST_LEVELS_RU.EXPERT}
            </span>
            <ul className={style['results__list']}>
              {difficultyTestsMap.EXPERT.map(el => (
                <li className={style['results__list-item']} key={el.id}>
                  <TestResultSmall onClick={_ => onTestClick(el.id)} test={el} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {difficultyTestsMap.HARD.length !== 0 && (
          <div className={style['results__block']}>
            <span className={clsx(style['results__list-title'], commonStyle['test__hard_color'])}>
              {TEST_LEVELS_RU.HARD}
            </span>
            <ul className={style['results__list']}>
              {difficultyTestsMap.HARD.map(el => (
                <li className={style['results__list-item']} key={el.id}>
                  <TestResultSmall onClick={_ => onTestClick(el.id)} test={el} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {difficultyTestsMap.MEDIUM.length !== 0 && (
          <div className={style['results__block']}>
            <span className={clsx(style['results__list-title'], commonStyle['test__medium_color'])}>
              {TEST_LEVELS_RU.MEDIUM}
            </span>
            <ul className={style['results__list']}>
              {difficultyTestsMap.MEDIUM.map(el => (
                <li className={style['results__list-item']} key={el.id}>
                  <TestResultSmall onClick={_ => onTestClick(el.id)} test={el} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {difficultyTestsMap.ENTRANCE.length !== 0 && (
          <div className={style['results__block']}>
            <span
              className={clsx(style['results__list-title'], commonStyle['test__entrance_color'])}
            >
              {TEST_LEVELS_RU.ENTRANCE}
            </span>
            <ul className={style['results__list']}>
              {difficultyTestsMap.ENTRANCE.map(el => (
                <li className={style['results__list-item']} key={el.id}>
                  <TestResultSmall onClick={_ => onTestClick(el.id)} test={el} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
