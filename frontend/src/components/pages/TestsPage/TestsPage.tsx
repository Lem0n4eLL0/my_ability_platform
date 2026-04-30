import { useAppDispatch, useAppSelector } from '@/services/store';
import style from './TestsPage.module.scss';
import formStyle from '@styles/forms.module.scss';
import commonStyle from '@styles/common.module.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import {
  getMoreTestsTests,
  getTestsTests,
  selectStatusesTests,
  selectTests,
} from '@/services/slices/tests';
import { LineTestCard } from '@/components/cards/LineTestCard';
import { Checkbox } from '@/components/forms/Checkbox';
import { useMultipleChoice } from '@/hooks/useMultipleChoice';
import { Test, TEST_LEVELS_ARRAY, TEST_LEVELS_RU, TestLevel } from '@/common/commonTypes';
import clsx from 'clsx';
import { Loader } from '@/components/shells/Loader';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { TESTS_FILTERS_REQUEST_PARAMS_BASE } from '@/common/constants';
import { useNavigate } from 'react-router';

const SEARCH_DELAY_REQUEST = 500;
export const TestsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tests = useAppSelector(selectTests);
  const { getTestsStatus } = useAppSelector(selectStatusesTests);
  const isGetTestsPending = getTestsStatus.status === 'PENDING';

  const checkboxDifficulty = useMultipleChoice({
    type: 'checkbox',
    variants: TEST_LEVELS_ARRAY,
  });

  const [searchValue, setSearchValue] = useState('');
  const [testFilters, setTestFilters] = useState(TESTS_FILTERS_REQUEST_PARAMS_BASE);

  useEffect(() => {
    void dispatch(
      getTestsTests({
        filters: { ...testFilters, value: searchValue },
        pagination: tests.pagination,
      })
    );
  }, [testFilters]);

  const getTestsFormHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTestFilters(prev => ({
      ...prev,
      difficulty: checkboxDifficulty.selected as TestLevel[],
    }));
  };

  const searchTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const onSearchChangeHandler = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (searchTimeoutId.current) {
      clearTimeout(searchTimeoutId.current);
    }
    searchTimeoutId.current = setTimeout(() => {
      void dispatch(
        getTestsTests({
          filters: { ...testFilters, value: e.target.value },
          pagination: tests.pagination,
        })
      );
    }, SEARCH_DELAY_REQUEST);
  };

  const { containerRef, sentinelRef, isLoading, resetLoading } =
    useInfiniteScroll<HTMLUListElement>({
      enabled: tests.pagination.hasMore,
      onLoadMore: () => {
        void (async () => {
          await dispatch(
            getMoreTestsTests({
              filters: { ...testFilters, value: searchValue },
              pagination: tests.pagination,
            })
          );
          resetLoading();
        })();
      },
    });

  const onClearFiltersHandler = () => {
    checkboxDifficulty.clear();
    setTestFilters(TESTS_FILTERS_REQUEST_PARAMS_BASE);
  };

  const onTestClickHandler = (test: Test) => {
    void navigate(`/tests/${test.id}`);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutId.current) {
        clearTimeout(searchTimeoutId.current);
      }
    };
  }, []);

  return (
    <div className={style['content']}>
      <aside className={style['sort']}>
        <div className={style['sort__header']}>
          <h2 className={style['sort__title']}>Фильтры</h2>
          <button
            className={style['sort__reset']}
            disabled={isGetTestsPending}
            onClick={onClearFiltersHandler}
          >
            Сбросить
          </button>
        </div>
        <form name="get-tests-form" className={style['sort__form']} onSubmit={getTestsFormHandler}>
          <div className={style['sort__filter-block']}>
            <h3 className={style['sort__list-title']}>Сложность</h3>
            <ul className={style['sort__list']}>
              {TEST_LEVELS_ARRAY.map((el, ind) => (
                <li className={style['sort__list-element']} key={ind}>
                  <span className={style['sort__element-title']}>{TEST_LEVELS_RU[el]}</span>
                  <Checkbox {...checkboxDifficulty.register(el)} />
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className={clsx(
              style['sort__filters'],
              formStyle['form__button_small'],
              formStyle['form__button_small_green']
            )}
            disabled={isGetTestsPending}
          >
            Применить
          </button>
        </form>
      </aside>

      <section className={style['tests']}>
        <div className={style['tests__header']}>
          <h1 className={style['tests__title']}>Список тестов</h1>
          <input
            type="search"
            className={style['tests__search']}
            placeholder="Поиск..."
            value={searchValue}
            onChange={onSearchChangeHandler}
          />
        </div>

        {isGetTestsPending ? (
          <ul className={style['tests__list']}>
            {Array.from({ length: 11 }).map((_, ind) => (
              <li key={ind} className={style['tests__list-item_loader']}>
                <Loader isAbsolute={true} loaderClass={commonStyle['loader_bg']} />
              </li>
            ))}
          </ul>
        ) : tests.data.length !== 0 ? (
          <>
            <ul className={style['tests__list']} ref={containerRef}>
              {tests.data.map(el => (
                <li key={el.id} className={style['tests__list-item']}>
                  <LineTestCard test={el} onClick={onTestClickHandler} />
                </li>
              ))}
              <li>
                <div ref={sentinelRef}></div>
              </li>
            </ul>
            {isLoading && <div className={style['loader']}>Загрузка еще...</div>}
            {!tests.pagination.hasMore && <div>Тестов больше нет</div>}
          </>
        ) : (
          <div className={style['tests__empty']}>Данные не найдены</div>
        )}
      </section>
    </div>
  );
};
