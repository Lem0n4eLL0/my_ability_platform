import { render } from '@testing-library/react';
import App from '../src/app/App';

describe('App page', () => {
  test('renders page title and is not empty', () => {
    render(<App />);

    expect(document.body).not.toBeEmptyDOMElement();
  });
});
