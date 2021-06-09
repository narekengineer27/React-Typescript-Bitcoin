import * as React from 'react';
import { BlogArticle } from 'Models/BlogArticle';
import { history } from 'Components/Routes';

const styles = require('./blog.css');

interface Props {
  article: BlogArticle;
}

export default class Card extends React.Component<Props, {}> {
  render() {
    const { article } = this.props;

    return (
      <div className={styles.card} onClick={() => history.push(`/public/blog/article/${article.slug}`)}>
        <div className={styles.photo}>
          <div className={styles.overlay}/>
          <img src={article.image || '/public/assets/images/default-blog.png'} alt=""/>
        </div>

        <div className={styles.title}>{article.title}</div>
        <div className={styles.summary}>{article.text.substring(0, 200).replace(/<(?:.|\n)*?>/gm, '')}</div>
        <div className={styles.date}>{article.date_posted}</div>
      </div>
    );
  }
}
