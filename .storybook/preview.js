import GlobalStyle from '../src/common/GlobalStyle';
import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <Story />
      <GlobalStyle />
    </MemoryRouter>
  ),
];