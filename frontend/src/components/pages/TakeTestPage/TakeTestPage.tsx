import { getTestInformationTests, selectStatusesTests, selectTest } from '@/services/slices/tests';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { useNavigate, useParams } from 'react-router';
import style from './TakeTestPage.module.scss';
import commonStyle from '@styles/common.module.scss';
import formStyle from '@styles/forms.module.scss';
import { Rate } from '@/components/Rate';
import { useEffect, useMemo, useState } from 'react';
import { Loader } from '@/components/shells/Loader';
import clsx from 'clsx';
import { QuestionType, TEST_LEVELS_RU } from '@/common/commonTypes';
import { testLevelClasses } from '@/utils/className';
import { timeFormatterText } from '@/features/Timer/TimeFormatter';
import { Time } from '@/features/Timer/Time';
import { selectTestResults } from '@/services/slices/user';
import { findLastTestResult } from '@/utils/utils';
import { BackButton } from '@/components/BackButton';
import { testTypeFormatter } from '@/utils/formatters';

export const TakeTestPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const test = useAppSelector(selectTest(id ?? ''));
  const { getTestStatus } = useAppSelector(selectStatusesTests);
  const testResults = useAppSelector(selectTestResults(id ?? ''));
  const [mountTime] = useState(Date.now);

  useEffect(() => {
    if (id && getTestStatus.status !== 'ERROR') {
      void dispatch(getTestInformationTests(id));
    }
  }, [dispatch, id]);

  const [bgDifficultyClassName, boxShadowDifficultyClassName] = useMemo(
    () => (test ? testLevelClasses(test.difficulty) : []),
    [test]
  );

  const lastResult = findLastTestResult(testResults?.results ?? []);
  const canTake =
    lastResult && test
      ? mountTime - new Date(lastResult.completionDate).getTime() >
        test.rechargeTimeSecondes! * 1000
      : true;

  if (getTestStatus.status === 'PENDING') {
    return <Loader loaderClass={commonStyle['loader__main']} isAbsolute={true} />;
  }

  if (!test) {
    return 'Error Тест не найден';
  }

  return (
    <div className={style['content']}>
      <div className={style['content__back-button-wrapper']}>
        <BackButton onClick={() => void navigate(-1)} />
      </div>

      <section className={style['information']}>
        <div className={style['information__title-wrapper']}>
          <h1 className={style['information__title']}>{test.title}</h1>
          <span
            className={clsx(
              style['information__difficulty'],
              bgDifficultyClassName,
              boxShadowDifficultyClassName
            )}
          >
            {TEST_LEVELS_RU[test.difficulty]}
          </span>
        </div>
        <div className={style['information__rate']}>
          <Rate rating={test.rate} size={window.innerWidth < 768 ? 'md' : 'lg'} />
        </div>

        <p className={style['information__description']}>{test.description}</p>
        <div className={style['information__controls']}>
          <button
            className={clsx(style['information__start-button'], formStyle['form__button_green'])}
            disabled={!canTake}
          >
            {canTake ? 'Начать' : 'Недоступно'}
          </button>
          {!canTake && (
            <span className={style['information__reconfirmation-date']}>
              до&nbsp;
              {new Date(
                test.rechargeTimeSecondes! * 1000 + new Date(lastResult!.completionDate).getTime()
              ).toLocaleDateString()}
            </span>
          )}
        </div>
      </section>
      <aside className={style['addition']}>
        <div className={style['card']}>
          <div className={style['card__time']}>
            <h2 className={style['card__time-title']}>Время прохождения:</h2>
            <span className={style['card__time-value']}>
              {test.timeLimitSeconds
                ? timeFormatterText(new Time(test.timeLimitSeconds), 'hours', 'minuts')
                : 'Неограниченное'}
            </span>
          </div>
          {test.questionsTypesQuantity && (
            <div className={style['card__tasks-type']}>
              <h2 className={style['card__tasks-type-title']}>Задания:</h2>
              <ul className={style['card__tasks-type-list']}>
                {(Object.keys(test.questionsTypesQuantity) as QuestionType[]).map(
                  el =>
                    test.questionsTypesQuantity![el] !== 0 && (
                      <li className={style['card__tasks-type-list-item']} key={el}>
                        <span className={style['card__tasks-type-item-value']}>
                          {test.questionsTypesQuantity![el]}
                        </span>
                        &nbsp;-&nbsp;
                        {testTypeFormatter(el)}
                      </li>
                    )
                )}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
