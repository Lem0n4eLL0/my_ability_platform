import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.module.css';
import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
