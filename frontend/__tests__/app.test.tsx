import { render } from '@testing-library/react';
import App from '../src/app/App';
import { BrowserRouter } from 'react-router';

describe('App page', () => {
  test('renders page title and is not empty', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(document.body).not.toBeEmptyDOMElement();
  });
});
