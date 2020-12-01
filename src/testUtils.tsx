import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { ReactElement } from 'react';
import Theme from './components/Theme';

const Providers: React.FC = ({ children }) => {
  return (
    // <ApolloProvider client={gqlClient}>
    <Theme>{children}</Theme>
    // </ApolloProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
