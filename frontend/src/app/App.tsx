import { Route, Routes } from 'react-router';
import { MainLayout } from '../components/layouts/MainLayout';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { MainPage } from '@/components/pages/MainPage';
import { AuthProtector } from '@/components/protectors/AuthProtector';
import { RegistrationProtector } from '@/components/protectors/RegistrationProtector';

const App = () => {
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
          <Route path="registration/step-one" element={<div>Auth step one</div>}></Route>
          <Route path="registration/step-two" element={<div>Auth step two</div>}></Route>
          <Route path="registration/step-three" element={<div>Auth step three</div>}></Route>
          <Route path="auth/confirm-email" element={<div>Auth confirm email</div>}></Route>
          <Route path="auth/login" element={<div>Auth login</div>}></Route>
        </Route>
      </Route>
      <Route element={<AuthProtector isRedirectAuthorized={false} redirectPath="/" />}>
        <Route
          element={
            <RegistrationProtector isRedirectRegistration={false} redirectPath="auth/step-three" />
          }
        >
          <Route element={<MainLayout header={<div>Header 2</div>} footer={<Footer />} />}>
            <Route path="profile" element={<div>Profile</div>}></Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<div>Error 404</div>}></Route>
    </Routes>
  );
};

export default App;
