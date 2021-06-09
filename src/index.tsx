import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'Components/App';

import configureStore from 'Store/configure-store';

const store = configureStore({});

ReactDOM.render(
  <AppContainer id="app-content">
    <App store={store} />
  </AppContainer>,
  document.getElementById('app') as HTMLElement
);

interface RequireImport {
  default: any;
}

if ((module as any).hot) {
  (module as any).hot.accept('./components/App', () => {
    const NextApp = (require('./components/App') as RequireImport).default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
