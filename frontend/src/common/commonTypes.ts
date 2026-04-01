export type UUID = string;

export type TestLevel = 'ENTRANCE' | 'MEDIUM' | 'HARD' | 'EXPERT';

export type TaskBase = {
  id: UUID;
  title: string;
  description: string;
  rate: number;
  totalTests: number;
  imgURL: string;
};

export type Task = TaskBase & {
  level: TestLevel;
};

export type СarouselTask = TaskBase;
export type ComparePreviewTask = TaskBase;
