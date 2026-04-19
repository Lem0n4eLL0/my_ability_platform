import { TEST_LEVELS, TestLevel, User } from '@/common/commonTypes';

export const totalTaskFormatter = (value: number, lable: string = 'тестов'): string => {
  const strValue = String(value);
  if (strValue.length === 1) {
    return `${10}+ ${lable}`;
  } else {
    return `${Math.ceil(value / 10) * 10}+ ${lable}`;
  }
};

export const testLevelFormatter = (level: TestLevel): string => {
  return TEST_LEVELS[level];
};

export const formatZError = (value: { [key: string]: string[] }): { [key: string]: string } => {
  return Object.fromEntries(
    Object.entries(value).map(([key, messages]) => [key, messages[0] ?? ''])
  );
};

export const fullNameFormatter = (user: User): string => {
  return `${user.firstName} ${user.secondName}` + (user.surname ? user.surname : '');
};

export const dateForInputFormatter = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
