import * as React from "react";
import * as classNames from "classnames/bind";
import Responsive from 'Partials/Responsive';
import Dropdown from 'Elements/Dropdown';

const styles = require('./settings-panel.css');
let cx = classNames.bind(styles);

interface SettingsPanelProps {
  activeIndex?: number;
  menus?: { label: string, value: any, title: string, badge?: any }[];
  title?: string;
  className?: string;
  configuration?: any;
  onChange?(menu: { label: string, value: any }): void;
}

class SettingsPanel extends React.Component<SettingsPanelProps, any> {

  public static defaultProps: SettingsPanelProps = {
    activeIndex: 0,
    menus: [],
    title: '',
    configuration: null,
    onChange: () => {
      return;
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.activeIndex !== this.props.activeIndex) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      });
    }
  }

  onChange(activeIndex: number) {
    return () => {
      this.setState({
        activeIndex,
      });
      this.props.onChange(this.props.menus[activeIndex]);
    };
  }

  render() {
    const { className, menus, configuration } = this.props;
    const { activeIndex } = this.state;
    const baseStyles = cx('panel', className);
    return (
      <div className={styles.wrapper}>
        <Responsive name="desktop">
          <div className={baseStyles}>
            {menus.map((menu, index) => {
              return (
                <div
                  key={menu.label}
                  onClick={this.onChange(index).bind(this)}
                  className={styles.menu + ' ' + ((activeIndex === index) ? styles.active : '')}
                >
                  <div className={styles.menuLink}>{menu.label}</div>
                  {menu.badge || null}
                </div>
              );
            })}
            <div>
              {configuration}
            </div>
          </div>
        </Responsive>
        <Responsive name="phone">
          <div className={styles.menuDropdown}>
            <Dropdown
              textWeight={500}
              activeIndex={activeIndex}
              className="large"
              onChange={(menu) => this.onChange(menus.findIndex(m => (m === menu)))()}
              menus={menus}
            />
          </div>
        </Responsive>
        <div className={styles.main}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SettingsPanel;
