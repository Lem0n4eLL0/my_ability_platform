import style from './TestsPage.module.scss';

export const TestsPage = () => {
  return (
    <div className={style['content']}>
      <aside className={style['sort']}>
        <h2 className={style['sort__title']}>Фильтры</h2>
        <div className={style['sort__title']}></div>
      </aside>
      <section className={style['tests']}>
        <input type="search" className={style['tests__search']}></input>
        <h1 className={style['tests__title']}>Список тестов</h1>
        <ul className={style['tests__list']}>{/* <li><SmallCard task={}></SmallCard></li> */}</ul>
      </section>
    </div>
  );
};
