import * as React from 'react';
import PublicPageLayout from 'Partials/PublicPageLayout';
import Pagination from 'Elements/Pagination';
import Card from './Card';
import { IState } from 'Components/PublicPages/Blog/types';
import { loadArticles } from './actions';
import { connect } from 'react-redux';
import { returntypeof } from 'Utils/type';
import { RouteComponentProps } from 'react-router';

const styles = require('./blog.css');

class Blog extends React.Component<Props, {}> {

  componentWillMount() {
    this.loadData(this.props.match.params.page);
  }

  componentWillUpdate(nextProps: Props) {
    if (nextProps.match.params.page !== this.props.match.params.page) {
      this.loadData(nextProps.match.params.page);
    }
  }

  loadData(page: string) {
    this.props.loadArticles(+page || 1);
  }

  render() {
    const { articles: { data, meta, }, history } = this.props;

    return (
      <PublicPageLayout>
        <h1>Browse through our latest blog posts</h1>

        <div>
          <div className={styles.cards}>
            {data.map(item => <Card key={item.id} article={item}/>)}
          </div>

          <div className={styles.pager}>
            <Pagination
              totalPages={meta.page.total_pages}
              activePage={+meta.page.offset + 1}
              className={'large'}
              onChange={targetIndex => history.push(`/public/blog/page/${targetIndex}`)}
            />
          </div>
        </div>
      </PublicPageLayout>
    );
  }
}

const mapStateToProps = (rootState, ownProps: {}) => {
  const state = rootState.publicBlog as IState;
  return {
    articles: state.articles,
  };
};

const mapDispatchToProps = {
  loadArticles,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & RouteComponentProps<{ page: string }>;

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
