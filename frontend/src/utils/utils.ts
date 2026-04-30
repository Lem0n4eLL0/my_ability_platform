import { TEST_LEVELS_PRIORITY, TestLevel, TestResult } from '@/common/commonTypes';

export const assertNever = (_: never) => {
  throw new Error('Not possible');
};

export type OmitID<T extends { id: string }> = Omit<T, 'id'>;

export const findBestTestResult = (results: Array<TestResult>) => {
  const difficultyMap = new Map<string, Array<TestResult>>();
  const now = new Date();
  results.forEach(el => {
    const value = difficultyMap.get(el.difficulty);
    difficultyMap.set(el.difficulty, value ? [...value, el] : [el]);
  });

  const difficultyPriority = (Object.keys(TEST_LEVELS_PRIORITY) as TestLevel[]).sort(
    (a, b) => TEST_LEVELS_PRIORITY[b] - TEST_LEVELS_PRIORITY[a]
  );

  for (const dif of difficultyPriority) {
    const value = difficultyMap.get(dif);
    if (!value) continue;
    const procentSort = value.sort((a, b) => b.estimationProcent - a.estimationProcent);
    for (const procentEl of procentSort) {
      if (procentEl.isTestPassed && new Date(procentEl.reconfirmationDate) > now) return procentEl;
    }
  }
  return null;
};

export const findLastTestResult = (results: Array<TestResult>) => {
  if (results.length === 0) return null;
  let reslut = results[0];
  for (let i = 1; i < results.length; i++) {
    if (new Date(reslut.completionDate) < new Date(results[i].completionDate)) {
      reslut = results[i];
    }
  }
  return reslut;
};
