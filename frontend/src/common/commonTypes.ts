import z from 'zod';

export type UUID = string;

export const TEST_LEVELS = {
  ENTRANCE: 'Entrance',
  MEDIUM: 'Medium',
  HARD: 'Hard',
  EXPERT: 'Expert',
};

export type TestLevel = keyof typeof TEST_LEVELS;

export type TaskBase = {
  id: UUID;
  title: string;
  description: string;
  rate: number;
  totalTasks: number;
  imgURL: string;
};

export type Task = TaskBase & {
  level: TestLevel;
};

export type СarouselTask = TaskBase;
export type ComparePreviewTask = Task;

const User = z.object({
  firstName: z.email(),
  lastName: z.string(),
  surname: z.string(),
  birthday: z.boolean(),
  aboutMe: z.string(),
});

export type User = z.infer<typeof User>;
