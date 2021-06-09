import * as React from 'react';
import { connect } from 'react-redux';
import PublicPageLayout from 'Partials/PublicPageLayout/PublicPageLayout';
import { history } from 'Components/Routes';
import Card from 'Components/PublicPages/Blog/Card';
import { IState } from 'Components/PublicPages/Blog/types';
import { loadArticle, loadRecentArticles } from 'Components/PublicPages/Blog/actions';
import { returntypeof } from 'Utils/type';
import { RouteComponentProps } from 'react-router';

const styles = require('./blog.css');

class Article extends React.Component<Props, {}> {
  componentWillMount() {
    this.loadData(this.props.match.params.slug);
  }

  componentWillUpdate(nextProps: Props) {
    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.loadData(nextProps.match.params.slug);
    }
  }

  loadData(slug: string) {
    const { loadArticle, loadRecentArticles, } = this.props;

    loadArticle(slug);
    loadRecentArticles();

    window.scrollTo(0, 0);
  }

  render() {
    const { article, recentArticles } = this.props;

    const content = (
      <div>
        <div className={styles.article}>
          <div className={styles.back}>
            <img src="/public/assets/images/icon-back-gray.svg" alt="" onClick={() => history.goBack()}/>
          </div>
          <div className={styles.articleBody}>

            {article.status.success && (
              <div>
                <div className={styles.date}>{article.data.date_posted}</div>
                <h1>{article.data.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: article.data.text }}/>
              </div>
            )}

          </div>
        </div>

        {recentArticles.status.success && recentArticles.data.length > 0 && (
          <div>
            <div className={styles.articleOther}>Browse through our latest blog posts</div>
            <div className={styles.cards + ' ' + styles.articleCards}>
              {recentArticles.data.slice(0, 3).map((item, index) => <Card key={index} article={item}/>)}
            </div>
          </div>
        )}

      </div>
    );

    return (
      <PublicPageLayout footerMinimal afterHeader={content}/>
    );
  }
}

const mapStateToProps = rootState => {
  const state = rootState.publicBlog as IState;
  return {
    article: state.article,
    recentArticles: state.recentArticles,
  };
};

const mapDispatchToProps = {
  loadArticle,
  loadRecentArticles,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & RouteComponentProps<{ slug: string }>;

export default connect(mapStateToProps, mapDispatchToProps)(Article);
