import { Route, Routes } from 'react-router';
import { MainLayout } from '../components/layouts/MainLayout';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout header={<Header />} footer={<Footer />} />}>
        <Route
          index
          element={<div style={{ height: 'calc(100vh - 80px)' }}>Hello, world!</div>}
        ></Route>
      </Route>
      <Route path="*" element={<div>Error 404</div>}></Route>
    </Routes>
  );
};

export default App;
