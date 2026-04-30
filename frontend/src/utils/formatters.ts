import { QuestionType, TEST_LEVELS_RU, TestLevel, User } from '@/common/commonTypes';
import { assertNever } from './utils';

export const totalTaskFormatter = (value: number, lable: string = 'тестов'): string => {
  const strValue = String(value);
  if (strValue.length === 1) {
    return `${10}+ ${lable}`;
  } else {
    return `${Math.ceil(value / 10) * 10}+ ${lable}`;
  }
};

export const testLevelFormatter = (level: TestLevel): string => {
  return TEST_LEVELS_RU[level];
};

export const formatZError = (value: { [key: string]: string[] }): { [key: string]: string } => {
  return Object.fromEntries(
    Object.entries(value).map(([key, messages]) => [key, messages[0] ?? ''])
  );
};

export const fullNameFormatter = (user: User): string => {
  return `${user.secondName} ${user.firstName} ` + (user.surname ? user.surname : '');
};

export const dateForInputFormatter = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const testTypeFormatter = (type: QuestionType): string => {
  switch (type) {
    case 'CHOICE':
      return 'множественный выбор';
    case 'OPTION':
      return 'одиночный выбор';
    case 'TEXT':
      return 'ввод ответа';
    case 'CODE':
      return 'написание кода';
    default:
      assertNever(type);
      return '';
  }
};
