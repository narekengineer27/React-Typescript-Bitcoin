import * as React from 'react';
import * as _ from 'lodash';

export class Table extends React.Component<any, any> {
  render() {
    const { className = '' } = this.props;
    const props = _.omit(this.props, ['className']);
    return (
      <div className={'table ' + className} {...props}>
        {this.props.children}
      </div>
    );
  }
}

export class TableRow extends React.Component<any, any> {
  render() {
    const { className = '' } = this.props;
    const props = _.omit(this.props, ['className']);
    return (
      <div className={'tr ' + className} {...props}>
        {this.props.children}
      </div>
    );
  }
}

export class TableCell extends React.Component<any, any> {
  render() {
    const { className = '', header = false, bold = false } = this.props;
    const props = _.omit(this.props, ['className', 'header', 'bold']);
    const classes = header ? (bold ? 'bold th' : 'th') : 'td';
    return (
      <div className={classes + ' ' + className} {...props}>
        {this.props.children}
      </div>
    );
  }
}

export class TableHead extends React.Component<any, any> {
  render() {
    const { className = '', header = false, bold = false, data = Object } = this.props;
    const props = _.omit(this.props, ['className', 'header', 'bold']);
    const classes = header ? (bold ? 'bold th' : 'th') : 'td';
    return (
      <div className={classes + ' ' + className} {...props}>
        {this.props.children}
      </div>
    );
  }
}
