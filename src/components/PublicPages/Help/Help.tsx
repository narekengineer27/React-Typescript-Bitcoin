import * as React from 'react';
import PublicPageLayout from 'Partials/PublicPageLayout';
import HelpView from 'Components/Help/HelpView';

const styles = require('./help.css');

export default class Help extends React.Component<{}, {}> {
  render() {
    return (
      <PublicPageLayout
        footerNoStepsSeparator
        afterHeader={(
          <div>
            <h1 className={styles.title}>FAQ</h1>
            <div className={styles.content}>
              <HelpView className="public"/>
            </div>
          </div>
        )}
      />
    );
  }
}
