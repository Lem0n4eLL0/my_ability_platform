import {
  Task,
  TestLevel,
  TestResult,
  TestResultSchema,
  User,
  UserCertificate,
  UserCertificateSchema,
  UserEducation,
  UserEducationSchema,
  UserProject,
  UserProjectSchema,
  UserRole,
  UserSchema,
  UserWorkExperience,
  UserWorkExperienceSchema,
} from '@/common/commonTypes';
import { CarouselTasksResponseDto, RegistrationStepThreeRequest, RequestError } from '../apiTypes';
import {
  CarouselTaskDto,
  DTORequestError,
  RegistrationStepThreeRequestDTO,
  TaskDto,
  TasksResponseDto,
  TestResultDTO,
  UserCertificateDTO,
  UserDTO,
  UserEducationDTO,
  UserProjectDTO,
  UserWorkExperienceDTO,
} from './dto';

export const errorMapper = (dto: DTORequestError): RequestError => {
  return {
    timestamp: new Date(dto.timestamp).toISOString(),
    path: dto.path,
    status: dto.status,
    error: dto.error,
    errorCode: dto.errorCode,
    message: dto.message,
  };
};

export const mapCarouselTaskDtoToDomain = (dto: CarouselTaskDto): CarouselTaskDto => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  rate: dto.rate,
  totalTasks: dto.totalTasks,
  imgURL: dto.imgURL,
});

export const mapCarouselTasksResponseToDomain = (
  dto: CarouselTasksResponseDto
): { tasks: CarouselTaskDto[] } => ({
  tasks: dto.tasks.map(mapCarouselTaskDtoToDomain),
});

export const mapTaskDtoToDomain = (dto: TaskDto): Task => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  rate: dto.rate,
  totalTasks: dto.totalTasks,
  imgURL: dto.imgURL,
  level: dto.level as TestLevel,
});

export const mapTaskDomainToDto = (task: Task): TaskDto => ({
  id: task.id,
  title: task.title,
  description: task.description,
  rate: task.rate,
  totalTasks: task.totalTasks,
  imgURL: task.imgURL,
  level: task.level,
});

export const mapTasksResponseToDomain = (dto: TasksResponseDto) => ({
  tasks: dto.tasks.map(mapTaskDtoToDomain),
});

export const mapStepThreeRequestToDTO = (
  value: RegistrationStepThreeRequest
): RegistrationStepThreeRequestDTO => ({
  firstName: value.firstName,
  lastName: value.lastName,
  surname: value.surname,
  birthday: value.birthday,
});

// Profile

export const projectResponseMapper = (dto: UserProjectDTO): UserProject => {
  const result: UserProject = {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    link: dto.link,
  };

  const res = UserProjectSchema.safeParse(result);
  // console.log(res);
  return result;
};

export const educationResponseMapper = (dto: UserEducationDTO): UserEducation => {
  const result: UserEducation = {
    id: dto.id,
    city: dto.city,
    university: dto.university,
    faculty: dto.faculty,
    specialization: dto.specialization,
    status: dto.status,
    yearGradudatuion: dto.yearGradudatuion,
  };

  const res = UserEducationSchema.safeParse(result);
  // console.log(res);
  return result;
};

export const workExperienceResponseMapper = (dto: UserWorkExperienceDTO): UserWorkExperience => {
  const result: UserWorkExperience = {
    id: dto.id,
    city: dto.city,
    company: dto.company,
    dateStart: dto.dateStart,
    dateEnd: dto.dateEnd,
    post: dto.post,
  };

  const res = UserWorkExperienceSchema.safeParse(result);
  // console.log(res);
  return result;
};

export const certificateResponseMapper = (dto: UserCertificateDTO): UserCertificate => {
  const result: UserCertificate = {
    id: dto.id,
    title: dto.title,
    link: dto.link,
  };

  const res = UserCertificateSchema.safeParse(result);
  // console.log(res);
  return result;
};

export const userResponseMapper = (dto: UserDTO): User => {
  const result: User = {
    id: dto.id,
    firstName: dto.firstName,
    secondName: dto.secondName,
    birthday: dto.birthday,
    profileUniqeLink: dto.profileUniqeLink,
    email: dto.email,
    avatarLink: dto.avatarLink,
    role: dto.role as UserRole,
    surname: dto.surname,
    aboutMyself: dto.aboutMyself,
    contactPhone: dto.contactPhone,
    github: dto.github,
    projects: dto.projects.map(projectResponseMapper),
    educations: dto.educations.map(educationResponseMapper),
    workExperience: dto.workExperience.map(workExperienceResponseMapper),
    certificates: dto.certificates.map(certificateResponseMapper),
  };

  const res = UserSchema.safeParse(result);
  // console.log(res);
  return result;
};

export const testResultResponseMapper = (dto: TestResultDTO): TestResult => {
  const result: TestResult = {
    id: dto.id,
    testId: dto.testId,
    title: dto.title,
    estimationProcent: dto.estimationProcent,
    isTestPassed: dto.isTestPassed,
    difficulty: dto.difficulty,
    reconfirmationDate: dto.reconfirmationDate,
  };

  const res = TestResultSchema.safeParse(result);
  // console.log(res);
  return result;
};
