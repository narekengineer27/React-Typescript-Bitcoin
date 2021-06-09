import * as React from 'react';
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import * as classNames from 'classnames/bind';
import { returntypeof } from 'Utils/type';
import { IState } from './types';
import HelpForm from './HelpForm';
import { history } from 'Components/Routes';

const styles = require('./help.css');
let cx = classNames.bind(styles);

interface OwnProps {
  className?: 'public';
}

class HelpView extends React.Component<Props, {}> {
  render() {
    const pathname = history.location.pathname;

    const { articles: { data }, className } = this.props;

    return (
      <div className={'row ' + cx((className || '').split(' '))}>
        <div className="col-md-4">
          <div className={styles.searchPanel}>
            <HelpForm/>
            <div>
              {data.map(article => (
                <div className={styles.link} key={article.id}>
                  <HashLink to={pathname + '#' + article.id}>{article.question}</HashLink>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h1 className={styles.extraTitle}>Tutorials</h1>
          {data.map(article => (
            <div className={styles.article} key={article.id}>
              <div className={styles.title} id={article.id + ''}>{article.question}</div>
              <div dangerouslySetInnerHTML={{ __html: article.answer }}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props: OwnProps) => {
  const localState = state.help as IState;
  return {
    articles: localState.articles,
  };
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & OwnProps;

export default connect(mapStateToProps)(HelpView);
