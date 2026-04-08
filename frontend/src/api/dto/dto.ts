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
  surname: string;
  birthday: string;
}
