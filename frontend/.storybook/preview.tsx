import type { Preview } from '@storybook/react-vite';
import { userReduser } from '../src/services/slices/user';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const createMockStore = () =>
  configureStore({
    reducer: {
      user: userReduser,
    },
  });

const preview: Preview = {
  decorators: [
    Story => (
      <Provider store={createMockStore()}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      default: 'light-gray',
      values: [
        { name: 'light-gray', value: '#f2f2f2' },
        { name: 'dark-custom', value: '#212121' },
        { name: 'green', value: '#0c523a' },
        { name: 'yellow', value: '#f2b424' },
      ],
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
