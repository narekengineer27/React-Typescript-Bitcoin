import { Page } from './Page';

export class Meta {
  filter: object = {};
  page: Page = new Page();
  sort: string = '';
  mode: string = 'active';

  static createWithLimit(limit: number) {
    const meta = new Meta();
    meta.page.limit = limit;
    return meta;
  }

  setActivePage(activePage: number) {
    this.page.offset = activePage - 1;
    return this;
  }
}
