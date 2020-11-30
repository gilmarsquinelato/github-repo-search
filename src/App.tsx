import React from 'react';

import Layout from './components/Layout';
import Theme from './components/Theme';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Theme>
      <Layout>
        <Home />
      </Layout>
    </Theme>
  );
};

export default App;
