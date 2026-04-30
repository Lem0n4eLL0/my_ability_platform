import {
  Test,
  TestLevel,
  TestResult,
  User,
  UserCertificate,
  UserEducation,
  UserProject,
  UserRole,
  UserWorkExperience,
} from '@/common/commonTypes';
import {
  CarouselTasksResponseDto,
  GetTestInformationResponse,
  GetTestsResponse,
  PaginationResponse,
  RegistrationStepThreeRequest,
  RequestError,
} from '../apiTypes';
import {
  CarouselTaskDto,
  DTORequestError,
  GetTestInformationResponseDTO,
  GetTestsResponseDTO,
  PaginationResponseDTO,
  RegistrationStepThreeRequestDTO,
  TestDTO,
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

// export const mapTaskDtoToDomain = (dto: TaskDto): Task => ({
//   id: dto.id,
//   title: dto.title,
//   description: dto.description,
//   rate: dto.rate,
//   totalTasks: dto.totalTasks,
//   imgURL: dto.imgURL,
//   level: dto.level as TestLevel,
// });

// export const mapTaskDomainToDto = (task: Task): TaskDto => ({
//   id: task.id,
//   title: task.title,
//   description: task.description,
//   rate: task.rate,
//   totalTasks: task.totalTasks,
//   imgURL: task.imgURL,
//   level: task.level,
// });

// export const mapTasksResponseToDomain = (dto: TasksResponseDto) => ({
//   tasks: dto.tasks.map(mapTaskDtoToDomain),
// });

export const mapStepThreeRequestToDTO = (
  value: RegistrationStepThreeRequest
): RegistrationStepThreeRequestDTO => ({
  firstName: value.firstName,
  lastName: value.lastName,
  surname: value.surname,
  birthday: value.birthday,
});

// Profile

export const projectResponseMapper = (dto: UserProjectDTO): UserProject => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  link: dto.link,
});

export const educationResponseMapper = (dto: UserEducationDTO): UserEducation => ({
  id: dto.id,
  city: dto.city,
  university: dto.university,
  faculty: dto.faculty,
  specialization: dto.specialization,
  status: dto.status,
  yearGradudatuion: dto.yearGradudatuion,
});

export const workExperienceResponseMapper = (dto: UserWorkExperienceDTO): UserWorkExperience => ({
  id: dto.id,
  city: dto.city,
  company: dto.company,
  dateStart: dto.dateStart,
  dateEnd: dto.dateEnd,
  post: dto.post,
});

export const certificateResponseMapper = (dto: UserCertificateDTO): UserCertificate => ({
  id: dto.id,
  title: dto.title,
  link: dto.link,
});

export const userResponseMapper = (dto: UserDTO): User => ({
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
});

export const testResultResponseMapper = (dto: TestResultDTO): TestResult => ({
  id: dto.id,
  testId: dto.testId,
  title: dto.title,
  estimationProcent: dto.estimationProcent,
  isTestPassed: dto.isTestPassed,
  difficulty: dto.difficulty as TestLevel,
  reconfirmationDate: dto.reconfirmationDate,
  completionDate: dto.completionDate,
});

export const paginationMapper = (dto: PaginationResponseDTO): PaginationResponse => ({
  limit: dto.limit,
  offset: dto.offset,
  hasMore: dto.hasMore,
});

export const testsFromDTOMapper = (dto: TestDTO): Test => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  rate: dto.rate,
  imgURL: dto.imgURL,
  difficulty: dto.difficulty as TestLevel,
  timeLimitSeconds: dto.timeLimitSeconds,
  rechargeTimeSecondes: dto.rechargeTimeSecondes,
  reconfirmationTimeSeconds: dto.reconfirmationTimeSeconds,
  questionsTypesQuantity: dto.questionsTypesQuantity,
});

export const testsResponseMapper = (dto: GetTestsResponseDTO): GetTestsResponse => ({
  pagination: paginationMapper(dto.pagination),
  tests: dto.tests.map(testsFromDTOMapper),
});

export const testInformationResponseMapper = (
  dto: GetTestInformationResponseDTO
): GetTestInformationResponse => ({
  test: testsFromDTOMapper(dto.test),
  lastUserAttemp: dto.lastUserAttemp
    ? testResultResponseMapper(dto.lastUserAttemp)
    : dto.lastUserAttemp,
});
