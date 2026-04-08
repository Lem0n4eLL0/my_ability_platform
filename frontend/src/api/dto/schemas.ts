import { Task, TestLevel } from '@/common/commonTypes';
import { CarouselTasksResponseDto, RegistrationStepThreeRequest, RequestError } from '../apiTypes';
import {
  CarouselTaskDto,
  DTORequestError,
  RegistrationStepThreeRequestDTO,
  TaskDto,
  TasksResponseDto,
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
  birthday: value.birthday.toISOString(),
});
