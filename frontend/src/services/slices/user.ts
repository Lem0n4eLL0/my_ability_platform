import {
  createCertificate,
  createEducation,
  createProject,
  createWorkExperience,
  deleteCertificate,
  deleteEducation,
  deleteProject,
  deleteWorkExperience,
  getProfile,
  getTestResultsHistory,
  getTestsResult,
  updateCertificate,
  updateEducation,
  updateProfile,
  updateProject,
  updateWorkExperience,
} from '@/api/api';
import { RequestError, RequestStatus } from '@/api/apiTypes';
import { TestResult, User } from '@/common/commonTypes';
import { READY_REQUEST_STATUS } from '@/common/constants';
import { asyncThunkCreator, buildCreateSlice, createSelector } from '@reduxjs/toolkit';
import { registrationStepOneAuth } from './auth';
import { RootState } from '../store';
import { getTestInformationTests } from './tests';

const createSlice = buildCreateSlice({
  // потом переместить в общий файл
  creators: { asyncThunk: asyncThunkCreator },
});

type UserState = {
  statuses: {
    getProfileStatus: RequestStatus;
    updateMainProfileStatus: RequestStatus;
    updateAboutMyselfStatus: RequestStatus;
    createProjectStatus: RequestStatus;
    updateProjectStatus: RequestStatus;
    deleteProjectStatus: RequestStatus;
    createEducationStatus: RequestStatus;
    updateEducationStatus: RequestStatus;
    deleteEducationStatus: RequestStatus;
    createWorkExperienceStatus: RequestStatus;
    updateWorkExperienceStatus: RequestStatus;
    deleteWorkExperienceStatus: RequestStatus;
    createCertificateStatus: RequestStatus;
    updateCertificateStatus: RequestStatus;
    deleteCertificateStatus: RequestStatus;
    getTestsResultStatus: RequestStatus;
  };
  data: {
    email: string | null;
    user: User | null;
    testResults: {
      [id: string]: {
        results: Array<TestResult>;
        getHistoryStatus: RequestStatus;
      };
    } | null;
  };
};

const initialState: UserState = {
  statuses: {
    getProfileStatus: READY_REQUEST_STATUS,
    updateMainProfileStatus: READY_REQUEST_STATUS,
    updateAboutMyselfStatus: READY_REQUEST_STATUS,
    createProjectStatus: READY_REQUEST_STATUS,
    updateProjectStatus: READY_REQUEST_STATUS,
    deleteProjectStatus: READY_REQUEST_STATUS,
    createEducationStatus: READY_REQUEST_STATUS,
    updateEducationStatus: READY_REQUEST_STATUS,
    deleteEducationStatus: READY_REQUEST_STATUS,
    createWorkExperienceStatus: READY_REQUEST_STATUS,
    updateWorkExperienceStatus: READY_REQUEST_STATUS,
    deleteWorkExperienceStatus: READY_REQUEST_STATUS,
    createCertificateStatus: READY_REQUEST_STATUS,
    updateCertificateStatus: READY_REQUEST_STATUS,
    deleteCertificateStatus: READY_REQUEST_STATUS,
    getTestsResultStatus: READY_REQUEST_STATUS,
  },
  data: {
    email: null,
    user: null,
    testResults: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: create => ({
    getProfile: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          return await getProfile();
        } catch (e) {
          return rejectWithValue(e);
        }
      },
      {
        pending: state => {
          state.statuses.getProfileStatus.status = 'PENDING';
          state.statuses.getProfileStatus.error = undefined;
        },
        rejected: (state, action) => {
          state.statuses.getProfileStatus.status = 'ERROR';
          state.statuses.getProfileStatus.error = action.error as RequestError;
        },
        fulfilled: (state, action) => {
          state.statuses.getProfileStatus.status = 'SUCCESS';
          state.statuses.getProfileStatus.error = undefined;
          state.data.user = action.payload;
        },
      }
    ),

    updateMainProfile: create.asyncThunk(updateProfile, {
      pending: state => {
        state.statuses.updateMainProfileStatus.status = 'PENDING';
        state.statuses.updateMainProfileStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.updateMainProfileStatus.status = 'ERROR';
        state.statuses.updateMainProfileStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.updateMainProfileStatus.status = 'SUCCESS';
        state.statuses.updateMainProfileStatus.error = undefined;
        state.data.user = action.payload;
      },
    }),

    updateAboutMyself: create.asyncThunk(updateProfile, {
      pending: state => {
        state.statuses.updateAboutMyselfStatus.status = 'PENDING';
        state.statuses.updateAboutMyselfStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.updateAboutMyselfStatus.status = 'ERROR';
        state.statuses.updateAboutMyselfStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.updateAboutMyselfStatus.status = 'SUCCESS';
        state.statuses.updateAboutMyselfStatus.error = undefined;
        state.data.user = action.payload;
      },
    }),

    createProject: create.asyncThunk(createProject, {
      pending: state => {
        state.statuses.createProjectStatus.status = 'PENDING';
        state.statuses.createProjectStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.createProjectStatus.status = 'ERROR';
        state.statuses.createProjectStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.createProjectStatus.status = 'SUCCESS';
        state.statuses.createProjectStatus.error = undefined;
        if (state.data.user) {
          state.data.user.projects.push(action.payload);
        }
      },
    }),
    updateProject: create.asyncThunk(updateProject, {
      pending: state => {
        state.statuses.updateProjectStatus.status = 'PENDING';
        state.statuses.updateProjectStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.updateProjectStatus.status = 'ERROR';
        state.statuses.updateProjectStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.updateProjectStatus.status = 'SUCCESS';
        state.statuses.updateProjectStatus.error = undefined;
        const index = state.data.user?.projects.findIndex(el => el.id === action.meta.arg.id);
        if (index && state.data.user) {
          state.data.user.projects[index] = action.payload;
        }
      },
    }),
    deleteProject: create.asyncThunk(deleteProject, {
      pending: state => {
        state.statuses.deleteProjectStatus.status = 'PENDING';
        state.statuses.deleteProjectStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.deleteProjectStatus.status = 'ERROR';
        state.statuses.deleteProjectStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.deleteProjectStatus.status = 'SUCCESS';
        state.statuses.deleteProjectStatus.error = undefined;
        if (state.data.user) {
          state.data.user.projects = state.data.user.projects.filter(
            el => el.id !== action.meta.arg
          );
        }
      },
    }),

    createEducation: create.asyncThunk(createEducation, {
      pending: state => {
        state.statuses.createEducationStatus.status = 'PENDING';
        state.statuses.createEducationStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.createEducationStatus.status = 'ERROR';
        state.statuses.createEducationStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.createEducationStatus.status = 'SUCCESS';
        state.statuses.createEducationStatus.error = undefined;
        if (state.data.user) {
          state.data.user.educations.push(action.payload);
        }
      },
    }),
    updateEducation: create.asyncThunk(updateEducation, {
      pending: state => {
        state.statuses.updateEducationStatus.status = 'PENDING';
        state.statuses.updateEducationStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.updateEducationStatus.status = 'ERROR';
        state.statuses.updateEducationStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.updateEducationStatus.status = 'SUCCESS';
        state.statuses.updateEducationStatus.error = undefined;
        const index = state.data.user?.educations.findIndex(el => el.id === action.meta.arg.id);
        if (index && state.data.user) {
          state.data.user.educations[index] = action.payload;
        }
      },
    }),
    deleteEducation: create.asyncThunk(deleteEducation, {
      pending: state => {
        state.statuses.deleteEducationStatus.status = 'PENDING';
        state.statuses.deleteEducationStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.deleteEducationStatus.status = 'ERROR';
        state.statuses.deleteEducationStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.deleteEducationStatus.status = 'SUCCESS';
        state.statuses.deleteEducationStatus.error = undefined;
        if (state.data.user) {
          state.data.user.educations = state.data.user.educations.filter(
            el => el.id !== action.meta.arg
          );
        }
      },
    }),

    createWorkExperience: create.asyncThunk(createWorkExperience, {
      pending: state => {
        state.statuses.createWorkExperienceStatus.status = 'PENDING';
        state.statuses.createWorkExperienceStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.createWorkExperienceStatus.status = 'ERROR';
        state.statuses.createWorkExperienceStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.createWorkExperienceStatus.status = 'SUCCESS';
        state.statuses.createWorkExperienceStatus.error = undefined;
        if (state.data.user) {
          state.data.user.workExperience.push(action.payload);
        }
      },
    }),
    updateWorkExperience: create.asyncThunk(updateWorkExperience, {
      pending: state => {
        state.statuses.updateWorkExperienceStatus.status = 'PENDING';
        state.statuses.updateWorkExperienceStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.updateWorkExperienceStatus.status = 'ERROR';
        state.statuses.updateWorkExperienceStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.updateWorkExperienceStatus.status = 'SUCCESS';
        state.statuses.updateWorkExperienceStatus.error = undefined;
        const index = state.data.user?.workExperience.findIndex(el => el.id === action.meta.arg.id);
        if (index && state.data.user) {
          state.data.user.workExperience[index] = action.payload;
        }
      },
    }),
    deleteWorkExperience: create.asyncThunk(deleteWorkExperience, {
      pending: state => {
        state.statuses.deleteWorkExperienceStatus.status = 'PENDING';
        state.statuses.deleteWorkExperienceStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.deleteWorkExperienceStatus.status = 'ERROR';
        state.statuses.deleteWorkExperienceStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.deleteWorkExperienceStatus.status = 'SUCCESS';
        state.statuses.deleteWorkExperienceStatus.error = undefined;
        if (state.data.user) {
          state.data.user.workExperience = state.data.user.workExperience.filter(
            el => el.id !== action.meta.arg
          );
        }
      },
    }),

    createCertificate: create.asyncThunk(createCertificate, {
      pending: state => {
        state.statuses.createCertificateStatus.status = 'PENDING';
        state.statuses.createCertificateStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.createCertificateStatus.status = 'ERROR';
        state.statuses.createCertificateStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.createCertificateStatus.status = 'SUCCESS';
        state.statuses.createCertificateStatus.error = undefined;
        if (state.data.user) {
          state.data.user.certificates.push(action.payload);
        }
      },
    }),
    updateCertificate: create.asyncThunk(updateCertificate, {
      pending: state => {
        state.statuses.updateCertificateStatus.status = 'PENDING';
        state.statuses.updateCertificateStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.updateCertificateStatus.status = 'ERROR';
        state.statuses.updateCertificateStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.updateCertificateStatus.status = 'SUCCESS';
        state.statuses.updateCertificateStatus.error = undefined;
        const index = state.data.user?.certificates.findIndex(el => el.id === action.meta.arg.id);
        if (index && state.data.user) {
          state.data.user.certificates[index] = action.payload;
        }
      },
    }),
    deleteCertificate: create.asyncThunk(deleteCertificate, {
      pending: state => {
        state.statuses.deleteCertificateStatus.status = 'PENDING';
        state.statuses.deleteCertificateStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.deleteCertificateStatus.status = 'ERROR';
        state.statuses.deleteCertificateStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.deleteCertificateStatus.status = 'SUCCESS';
        state.statuses.deleteCertificateStatus.error = undefined;
        if (state.data.user) {
          state.data.user.certificates = state.data.user.certificates.filter(
            el => el.id !== action.meta.arg
          );
        }
      },
    }),

    getTestsResult: create.asyncThunk(getTestsResult, {
      pending: state => {
        state.statuses.getTestsResultStatus.status = 'PENDING';
        state.statuses.getTestsResultStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getTestsResultStatus.status = 'ERROR';
        state.statuses.getTestsResultStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.getTestsResultStatus.status = 'SUCCESS';
        state.statuses.getTestsResultStatus.error = undefined;
        if (!state.data.testResults) {
          state.data.testResults = {};
          for (const result of action.payload) {
            const prev = state.data.testResults[result.testId];
            if (!prev) {
              state.data.testResults[result.testId] = {
                getHistoryStatus: READY_REQUEST_STATUS,
                results: [result],
              };
            } else {
              state.data.testResults[result.testId] = {
                getHistoryStatus: READY_REQUEST_STATUS,
                results: [result, ...prev.results],
              };
            }
          }
        }
      },
    }),
    getTestResultsHistory: create.asyncThunk(getTestResultsHistory, {
      pending: (state, action) => {
        const testId = action.meta.arg;
        if (!state.data.testResults) {
          state.data.testResults = {};
        }
        state.data.testResults[testId] = {
          getHistoryStatus: {
            status: 'PENDING',
          },
          results: state.data.testResults[testId].results ?? [],
        };
      },
      rejected: (state, action) => {
        const testId = action.meta.arg;
        state.data.testResults![testId] = {
          getHistoryStatus: {
            status: 'ERROR',
            error: action.error as RequestError,
          },
          results: state.data.testResults![testId].results,
        };
      },
      fulfilled: (state, action) => {
        const testId = action.meta.arg;
        state.data.testResults![testId] = {
          getHistoryStatus: {
            status: 'SUCCESS',
            error: undefined,
          },
          results: action.payload,
        };
      },
    }),
  }),

  extraReducers: builder => {
    builder
      .addCase(registrationStepOneAuth.pending, (state, action) => {
        state.data.email = action.meta.arg.email;
      })
      .addCase(getTestInformationTests.fulfilled, (state, action) => {
        if (action.payload.lastUserAttemp) {
          const testId = action.payload.lastUserAttemp.testId;
          if (state.data.testResults) {
            if (state.data.testResults[testId]) {
              const index = state.data.testResults[testId].results.findIndex(
                el => el.id === action.payload.lastUserAttemp?.id
              );
              if (index !== -1) {
                state.data.testResults[testId].results[index] = action.payload.lastUserAttemp;
              } else {
                state.data.testResults[testId].results.push(action.payload.lastUserAttemp);
              }
            } else {
              state.data.testResults[testId] = {
                results: [action.payload.lastUserAttemp],
                getHistoryStatus: READY_REQUEST_STATUS,
              };
            }
          } else {
            state.data.testResults = {};
            state.data.testResults[testId] = {
              results: [action.payload.lastUserAttemp],
              getHistoryStatus: {
                status: 'READY',
              },
            };
          }
        }
      });
  },

  selectors: {
    selectData: store => store.data,
    selectUser: store => store.data.user,
    selectEmail: store => store.data.email,
    selectTestsResult: store => store.data.testResults,
    selectUserIcon: store => store.data.user?.avatarLink,
    selectStatuses: store => store.statuses,
  },
});

export const selectUserState = (state: RootState) => state.user;

export const selectTestResults = (testId: string) =>
  createSelector([selectUserState], state =>
    state.data.testResults ? state.data.testResults[testId] : null
  );

export const userReduser = userSlice.reducer;

export const {
  getProfile: getProfileUser,
  updateMainProfile: updateMainProfileUser,
  updateAboutMyself: updateAboutMyselfUser,
  createProject: createProjectUser,
  updateProject: updateProjectUser,
  deleteProject: deleteProjectUser,
  createEducation: createEducationUser,
  updateEducation: updateEducationUser,
  deleteEducation: deleteEducationUser,
  createWorkExperience: createWorkExperienceUser,
  updateWorkExperience: updateWorkExperienceUser,
  deleteWorkExperience: deleteWorkExperienceUser,
  createCertificate: createCertificateUser,
  updateCertificate: updateCertificateUser,
  deleteCertificate: deleteCertificateUser,
  getTestsResult: getTestsResultUser,
  getTestResultsHistory: getTestResultsHistoryUser,
} = userSlice.actions;

export const {
  selectData,
  selectUser,
  selectUserIcon,
  selectTestsResult,
  selectEmail,
  selectStatuses: selectStatusesUser,
} = userSlice.selectors;
