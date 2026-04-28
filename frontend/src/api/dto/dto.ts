export type DTORequestError = {
  timestamp: string;
  path: string;
  status: number;
  error: string;
  errorCode: string;
  message: string;
  requestId: string;
};

export interface CarouselTaskDto {
  id: string;
  title: string;
  description: string;
  rate: number;
  totalTasks: number;
  imgURL: string;
}

export type TaskDto = CarouselTaskDto & {
  level: string;
};

export interface CarouselTasksResponseDto {
  tasks: CarouselTaskDto[];
}

export interface TasksResponseDto {
  tasks: TaskDto[];
}

export interface RegistrationStepThreeRequestDTO {
  firstName: string;
  lastName: string;
  surname: string | null;
  birthday: string;
}

// Profile
export type UserProjectDTO = {
  id: string;
  title: string;
  description: string;
  link: string;
};

export type UserEducationDTO = {
  id: string;
  city: string;
  university: string;
  faculty: string;
  specialization: string;
  status: string | null;
  yearGradudatuion: number | null;
};

export type UserWorkExperienceDTO = {
  id: string;
  city: string;
  company: string;
  dateStart: string;
  dateEnd: string | null;
  post: string;
};

export type UserCertificateDTO = {
  id: string;
  title: string;
  link: string;
};

export type UserDTO = {
  id: number;
  firstName: string;
  secondName: string;
  surname: string | null;
  birthday: string;
  profileUniqeLink: string;
  aboutMyself: string | null;
  contactPhone: string | null;
  github: string | null;
  email: string;
  avatarLink: string | null;
  role: string;
  projects: Array<UserProjectDTO>;
  educations: Array<UserEducationDTO>;
  workExperience: Array<UserWorkExperienceDTO>;
  certificates: Array<UserCertificateDTO>;
};

export type TestResultDTO = {
  id: string;
  testId: string;
  title: string;
  estimationProcent: number;
  isTestPassed: boolean;
  difficulty: string;
  reconfirmationDate: string;
};

export type PaginationResponseDTO = {
  limit: number;
  offset: number;
  hasMore: boolean;
};

export type GetTestsResponseDTO = {
  pagination: PaginationResponseDTO;
  tests: Array<TestDTO>;
};

export type TestDTO = {
  id: string;
  title: string;
  description: string | null;
  rate: number;
  imgURL: string | null;
  difficulty: string;
  timeLimitSeconds: number | null;
  rechargeTimeSecondes: number | null;
  reconfirmationTimeSeconds: number | null;
};
