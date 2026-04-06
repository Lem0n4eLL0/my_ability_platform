import { LOCAL_STORAGE_ACCESS_TOKEN_ALIAS } from '@/common/constants';
import { baseHeaders, bulidURL, checkResponse, fetchWithRefresh } from './apiHelp';
import { CarouselTasksResponseDto, HTTP_METHODS, RefreshTokenResponce } from './apiTypes';
import { mapCarouselTasksResponseToDomain, mapTasksResponseToDomain } from './dto/schemas';
import { TasksResponseDto } from './dto/dto';

export const URL_API = import.meta.env.VITE_APP_API_URL || '';

export const URL_PREFIX = '/api/v1/';

export const refreshToken = () => {
  return fetch(bulidURL('auth/refresh'), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    credentials: 'include',
  })
    .then(res => checkResponse<RefreshTokenResponce>(res))
    .then(res => {
      const mappedRes = res;
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS, mappedRes.token);
      return mappedRes;
    });
};

export const getCarouselTasks = () => {
  return fetch(bulidURL('tasks/carousel'), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
    credentials: 'include',
  })
    .then(res => checkResponse<CarouselTasksResponseDto>(res))
    .then(res => {
      return mapCarouselTasksResponseToDomain(res);
    });
};

export const getComparePreviewTasks = () => {
  return fetch(bulidURL('tasks/compare-preview'), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
    credentials: 'include',
  })
    .then(res => checkResponse<TasksResponseDto>(res))
    .then(res => {
      return mapTasksResponseToDomain(res);
    });
};

export const logoutMe = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS);

  return fetchWithRefresh(bulidURL(`auth/logout`), {
    method: HTTP_METHODS.DELETE,
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  }).then(() => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS, '');
    location.reload();
  });
};
