import * as React from 'react';
import * as _ from 'lodash';
import { RouteComponentProps } from 'react-router';
import SectionHeader from 'Partials/SectionHeader';
import SettingsPanel from 'Partials/SettingsPanel';
import Article from './Article';
import ArticleForm from './Article/ArticleForm';
import Blog from './Blog';
import BlogForm from './Blog/BlogForm';
import Faq from './Faq';
import FaqForm from './Faq/FaqForm';

const styles = require('./data-management.css');

export enum MenuTabs {
  Blog = 'blog',
  FAQ = 'faq',
  Article = 'article',
}

const menus = [{
  label: 'Blog',
  value: MenuTabs.Blog,
  title: 'Blog Management',
  control: Blog,
  add: BlogForm,
  edit: BlogForm,
}, {
  label: 'FAQ',
  value: MenuTabs.FAQ,
  title: 'FAQ Management',
  control: Faq,
  add: FaqForm,
  edit: FaqForm,
}, {
  label: 'Article',
  value: MenuTabs.Article,
  title: 'Article',
  control: Article,
  add: ArticleForm,
  edit: ArticleForm,
}];

export default class DataManagement extends React.Component<RouteComponentProps<{ modelType: string, actionType: string }>, any> {
  render() {
    const { match, history } = this.props;
    const modelType = _.get(match, 'params.modelType', 'Blog');
    const actionType = _.get(match, 'params.actionType', '');
    const id = _.get(match, 'params.id', -1);
    const activeMenuIndex = Math.max(menus.findIndex(menu => menu.value === modelType), 0);
    const activeMenu = menus[activeMenuIndex];

    const title = activeMenu.title;
    const Control = activeMenu.control;
    const MainControl = actionType ? activeMenu[actionType] : Control;

    return (
      <div className={`container-fluid ` + styles.wrapper}>
        <SectionHeader
          goBack="/mtr"
          hasBorder={false}
          title={title}
        />
        <div>
          <SettingsPanel
            activeIndex={activeMenuIndex}
            menus={menus}
            onChange={(menu) => history.push('/admin/data-management/' + menu.value)}
          >
            <div className={styles.page}>
              <MainControl modelType={modelType} id={id}/>
            </div>
          </SettingsPanel>
        </div>
      </div>
    );
  }
}
