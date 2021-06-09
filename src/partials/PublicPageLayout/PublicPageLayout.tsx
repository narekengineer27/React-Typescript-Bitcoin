import * as React from 'react';
import PublicHeader from 'Partials/PublicPageLayout/PublicHeader';
import PublicFooter from 'Partials/PublicPageLayout/PublicFooter';

const styles = require('./public-page-layout.css');

export default class PublicPageLayout extends React.Component<Props, {}> {
  render() {
    return (
      <div className={styles.wrapper}>
        <PublicHeader/>
        {this.props.afterHeader}

        <div className={styles.content}>
          {this.props.children}

          {!this.props.footerHidden && (
            <PublicFooter
              minimal={this.props.footerMinimal}
              noStepsSeparator={this.props.footerNoStepsSeparator}
            />
          )}
        </div>
      </div>
    );
  }
}

interface Props {
  footerHidden?: boolean;
  footerMinimal?: boolean;
  footerNoStepsSeparator?: boolean;
  afterHeader?: JSX.Element;
}
