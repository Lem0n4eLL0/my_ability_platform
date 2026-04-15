import { Route, Routes } from 'react-router';
import { MainLayout } from '../components/layouts/MainLayout';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { MainPage } from '@/components/pages/MainPage';
import { AuthProtector } from '@/components/protectors/AuthProtector';
import { RegistrationProtector } from '@/components/protectors/RegistrationProtector';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { AuthImg } from '@/components/layouts/AuthImg';
import { RegistrationStepOne } from '@/components/pages/RegistrationStepOne';
import { RegistrationStepTwo } from '@/components/pages/RegistrationStepTwo';
import { RegistrationStepThree } from '@/components/pages/RegistrationStepThree';
import { AuthPage } from '@/components/pages/AuthPage';
import { ConfirmEmailPage } from '@/components/pages/ConfirmEmailPage';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { authenticationVerificationAuth, selectStatusesAuth } from '@/services/slices/auth';
import { getProfileUser, selectStatusesUser } from '@/services/slices/user';
import { Loader } from '@/components/shells/Loader';
import commonStyle from '@styles/common.module.scss';
import style from './App.module.scss';
import { HeaderApp } from '@/components/layouts/HeaderApp';

const App = () => {
  const dispatch = useAppDispatch();
  const { authenticationVerificationStatus } = useAppSelector(selectStatusesAuth);
  const { getProfile } = useAppSelector(selectStatusesUser);

  useEffect(() => {
    Promise.allSettled([
      dispatch(authenticationVerificationAuth()),
      dispatch(getProfileUser()),
    ]).catch(_ => {});
  }, []);

  if (authenticationVerificationStatus.status === 'PENDING' || getProfile.status === 'PENDING') {
    return (
      <div className={style['content__loader']}>
        <Loader loaderClass={commonStyle['loader__main']} />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<MainLayout header={<Header />} footer={<Footer />} />}>
        <Route path="employers" element={<div>Employers</div>}></Route>
        <Route path="about" element={<div>About</div>}></Route>
      </Route>

      <Route element={<AuthProtector isRedirectAuthorized={true} redirectPath="/profile" />}>
        <Route element={<MainLayout header={<Header />} footer={<Footer />} />}>
          <Route index element={<MainPage />}></Route>
        </Route>
        <Route element={<MainLayout />}>
          <Route path="auth/confirm-email/:token" element={<ConfirmEmailPage />} />
          <Route element={<AuthLayout rightComponent={<AuthImg />} />}>
            <Route path="registration/step-one" element={<RegistrationStepOne />} />
            <Route path="registration/step-two" element={<RegistrationStepTwo />} />
            <Route path="auth/login" element={<AuthPage />} />
          </Route>
        </Route>
      </Route>

      <Route element={<AuthProtector isRedirectAuthorized={false} redirectPath="/" />}>
        <Route element={<MainLayout />}>
          <Route element={<AuthLayout rightComponent={<AuthImg />} />}>
            <Route path="registration/step-three" element={<RegistrationStepThree />} />
          </Route>
        </Route>
        <Route
          element={
            <RegistrationProtector
              isRedirectRegistration={false}
              redirectPath="registration/step-three"
            />
          }
        >
          <Route element={<MainLayout header={<HeaderApp />} footer={<Footer />} />}>
            <Route path="profile" element={<div>Profile</div>}></Route>
            <Route path="tests" element={<div>Tests</div>}></Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<div>Error 404</div>}></Route>
    </Routes>
  );
};

export default App;
