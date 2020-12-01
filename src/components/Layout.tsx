import React from 'react';
import styled from '@emotion/styled';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const Layout: React.FC = ({ children }) => {
  return (
    <Root>
      <CssBaseline />

      <Container component="main" maxWidth="md">
        {children ?? <></>}
      </Container>
    </Root>
  );
};

export default Layout;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing(4)}px 0;
`;
