import * as React from 'react';
import * as classNames from 'classnames/bind';
import Responsive from 'Partials/Responsive';

const styles = require('./pagination.css');
let cx = classNames.bind(styles);

interface PaginationProps {
  activePage?: number;
  totalPages?: number;
  className?: string;
  visiblePages?: number;

  onChange?(targetIndex: number): void;
}

class Pagination extends React.Component<PaginationProps, any> {

  public static defaultProps: PaginationProps = {
    activePage: 1,
    totalPages: 0,
    className: '',
    visiblePages: 5,
    onChange: () => {
      return;
    },
  };

  componentWillUpdate(nextProps: PaginationProps) {
    if (nextProps.activePage !== this.props.activePage) {
      this.setState({
        activePage: nextProps.activePage,
      });
    }
  }

  constructor(props: PaginationProps) {
    super(props);
    this.state = {
      activePage: props.activePage,
    };
  }

  onChange(activePage: number) {
    return () => {
      if (activePage >= 1 && activePage <= this.props.totalPages) {
        this.setState({
          activePage,
        });
        this.props.onChange(activePage);
      }
    };
  }

  renderPage(pageNo: number = -1) {
    if (pageNo === -1) {
      return <div className={styles.page} key={new Date().getTime() * Math.random() * 10000}>...</div>;
    }
    const { activePage } = this.state;
    const pageClasses = cx('page', {
      active: activePage === pageNo,
    });
    return <div className={pageClasses} key={pageNo} onClick={this.onChange(pageNo).bind(this)}>{pageNo}</div>;
  }

  renderMobile() {
    const { totalPages } = this.props;
    const { activePage } = this.state;
    return (
      <div className={styles.mobile}>
        <div className={styles.leftArrow} onClick={this.onChange(activePage - 1).bind(this)}>
          <i
            className={'fa fa-long-arrow-left ' + (activePage === 1 ? '' : 'blue')}
            aria-hidden="true">
          </i>
        </div>
        <div className={styles.numbers}>
          Page {activePage} / {totalPages}
        </div>
        <div className={styles.rightArrow} onClick={this.onChange(activePage + 1).bind(this)}>
          <i
            className={'fa fa-long-arrow-right ' + (activePage === totalPages ? '' : 'blue')}
            aria-hidden="true"></i>
        </div>
      </div>
    );
  }

  render() {
    const { totalPages, className, visiblePages } = this.props;
    const { activePage } = this.state;
    const baseStyles = cx('pagination', className);
    let pageNumbers = [];
    const renderPage = this.renderPage.bind(this);

    pageNumbers.push(
      <div
        className={styles.page + ' ' + (activePage === 1 ? styles.disabled : '')}
        key={-1}
        onClick={this.onChange(activePage - 1).bind(this)}>
        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
      </div>
    );

    // The current page is in the middle.
    if (activePage > visiblePages && activePage <= totalPages - visiblePages) {
      pageNumbers = pageNumbers.concat([
        renderPage(1),
        renderPage(),
        renderPage(activePage - 1),
        renderPage(activePage),
        renderPage(activePage + 1),
        renderPage(),
        renderPage(totalPages),
      ]);
    } else {
      // If total pages is less than 5
      if (totalPages <= visiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(renderPage(i));
        }
      } else {
        // If the current page is at the beginning
        if (activePage <= visiblePages) {
          for (let i = 1; i <= visiblePages; i++) {
            pageNumbers.push(renderPage(i));
          }
          if (totalPages > visiblePages + 1) {
            pageNumbers.push(renderPage());
          }
          pageNumbers.push(renderPage(totalPages));
        } else { // If the current page is at the end
          pageNumbers.push(renderPage(1));
          if (totalPages > visiblePages + 1) {
            pageNumbers.push(renderPage());
          }
          for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
            pageNumbers.push(renderPage(i));
          }
        }
      }
    }

    pageNumbers.push(
      <div
        className={styles.page + ' ' + (activePage === totalPages ? styles.disabled : '')}
        key={totalPages + 1}
        onClick={this.onChange(activePage + 1).bind(this)}>
        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
      </div>
    );

    return (
      <div className={styles.wrapper}>
        <Responsive name="desktop">
          <div className={baseStyles}>
            {pageNumbers}
          </div>
        </Responsive>
        <div className={baseStyles}>
          <Responsive name="phone">
            {this.renderMobile()}
          </Responsive>
        </div>
      </div>
    );
  }
}

export default Pagination;
