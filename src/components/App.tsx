import * as React from 'react';
import { Provider } from 'react-redux';

import Routes, { history } from './Routes';

import 'Styles/normalize.less';
import 'Styles/base.less';
import 'Styles/common.less';
import 'Styles/iscroll.less';
import 'Styles/flex-table.less';
import 'Styles/slick-theme.less';
import 'Styles/slick.less';
import 'react-tabs/style/react-tabs.less';
import 'Styles/react-tab.less';
import 'Styles/react-datepicker-cssmodules.css';
import 'Styles/react-list-select.css';

import { Router } from 'react-router';

export default ({ store }: any) => (
  <div>
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Routes/>
        </Router>
      </div>
    </Provider>
  </div>
);
