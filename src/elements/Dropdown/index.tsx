import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames/bind';

const styles = require('./dropdown.css');
let cx = classNames.bind(styles);

export interface MenuProps {
  label: string;
  value: string;
  href?: string;
  nonSelectable?: boolean;
  data?: object;

  onClick?(): void;

  renderItem?: (menu: MenuProps, index: number, isActive: boolean, isOpen: boolean, onChange: () => void) => JSX.Element;
}

interface Props {
  activeIndex?: number;
  menus?: MenuProps[];
  className?: string;
  minWidth?: number;
  customMainWrapperClass?: string;
  menuMainCustomClass?: string;
  leftPanelDropDownSubCustomClass?: string;
  leftPanelCaretCustomClass?: string;
  textWeight?: number;
  loading?: boolean;

  onChange?(menu: {label: string, value: any}): void;
}

interface State {
  activeIndex?: number;
  isOpen?: boolean;
}

class Dropdown extends React.Component<Props, State> {

  public static defaultProps: Props = {
    activeIndex: 0,
    menus: [],
    minWidth: 114,
    className: 'large',
    customMainWrapperClass: '',
    menuMainCustomClass: '',
    leftPanelDropDownSubCustomClass: '',
    leftPanelCaretCustomClass: '',
    textWeight: 400,
    loading: false,
    onChange: () => {
      return;
    }
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
      isOpen: false
    };
  }

  onChange(menu: MenuProps, activeIndex: number) {
    return () => {
      if (menu.nonSelectable) {
        this.setState({ isOpen: false });
        if (menu.onClick) {
          menu.onClick();
        }
        return;
      }

      this.setState({
        activeIndex,
        isOpen: false,
      });
      if (menu.onClick) {
        menu.onClick();
      }
      this.props.onChange(menu);
    };
  }

  toggleMenus() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const {
      className,
      menus,
      minWidth,
      customMainWrapperClass,
      leftPanelCaretCustomClass,
      leftPanelDropDownSubCustomClass,
      menuMainCustomClass,
      textWeight,
      loading,
    } = this.props;
    const { activeIndex, isOpen } = this.state;
    const activeMenu = menus.length > 0 ? menus[activeIndex] : null;
    const baseStyles = cx('dropdown', className.split(' '));

    return (
      <div className={styles.wrapper + ' ' + customMainWrapperClass} style={{ minWidth }}>
        <div className={baseStyles}>
          <div
            className={styles.selected + ' ' + leftPanelDropDownSubCustomClass + ' ' + (isOpen ? styles.isOpen : '')}
            onClick={this.toggleMenus.bind(this)}>
            {loading || menus.length === 0 ? (
              <div className="vertical-center full-height">
                <i className={'fa fa-circle-o-notch fa-spin fa-fw '} id={styles.loader}/>
              </div>
            ) : (
              <div className="flex">
                <div className={styles.text + ` font${textWeight}`}>
                  {activeMenu && this.renderItem(activeMenu, 0, true, false, null)}
                </div>
                <i className={isOpen ? 'fa fa-caret-up' : 'fa fa-caret-down' + ' ' + leftPanelCaretCustomClass}
                   aria-hidden="true"/>
              </div>
            )}
          </div>
          {isOpen && (
            <div>
              <div className={styles.overlay} onClick={this.toggleMenus.bind(this)}/>
              <div className={styles.menus + ' ' + menuMainCustomClass}>
                {menus.map((menu, index) => {
                  return this.renderItem(
                    menu,
                    index,
                    activeIndex === index,
                    isOpen,
                    this.onChange(menu, index).bind(this)
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  renderItem(menu: MenuProps, index: number, isActive: boolean, isOpen: boolean, onChange: () => void) {
    if (!menu) {
      return null;
    }

    if (menu.renderItem) {
      return menu.renderItem(menu, index, isActive, isOpen, onChange);
    }

    if (!isOpen) {
      return menu.label;
    }

    return (
      <div
        key={menu.label}
        onClick={onChange}
        className={styles.menu + ' ' + (isActive ? styles.active : '')}
      >
        {menu.href ? <Link to={menu.href}>{menu.label}</Link> : menu.label}
      </div>
    );
  }

  setActiveIndex(index: number) {
    if (this.state.activeIndex !== index) {
      this.setState({ activeIndex: index });
    }
  }

}

export default Dropdown;
