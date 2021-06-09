import * as React from 'react';
import * as MediaQuery from 'react-responsive';

const breakpoints = {
  desktop: '(min-width: 768px)',
  tablet: '(min-width: 768px) and (max-width: 1200px)',
  phone: '(max-width: 767px)',
  widerDesktop: '(min-width: 1200px)',
  mobile: '(max-width: 1200px)',
};

export default class Responsive extends React.Component<any> {

  render() {
    const { name = 'desktop', children, } = this.props;
    const breakpoint = breakpoints[name];
    return (
      <MediaQuery {...this.props} query={breakpoint}>
        {children}
      </MediaQuery>
    );
  }
}
