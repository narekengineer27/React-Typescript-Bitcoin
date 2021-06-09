import * as React from 'react';
import Button from 'Elements/Button';
import { Link } from 'react-router-dom';
import ActivateRobot from 'Components/Manager/StrategySetup/ActivateRobot/index';
const styles = require('./section-header.css');

interface SectionHeaderProps {
  title?: string;
  goBack?: string;
  skip?: string;
  hasBorder?: boolean;
  activateRobotBlock?: any;
  onCloseRobot?: any;
  onActivateRobot?: any;
  activateRobotIsOpen?: boolean;
  iconBackCustomClass?: string;
  headingTextCustomClass?: string;
  sectionHeaderCustomClass?: string;
  beforeLogin?: boolean;
}

class SectionHeader extends React.Component<SectionHeaderProps, any> {

  public static defaultProps: SectionHeaderProps = {
    title: '',
    goBack: '',
    skip: '',
    hasBorder: true,
    activateRobotBlock: '',
    activateRobotIsOpen: false,
    beforeLogin: false,
  };

  render() {
    const { title, goBack, skip, hasBorder, activateRobotBlock, onActivateRobot,
      iconBackCustomClass, headingTextCustomClass, sectionHeaderCustomClass, beforeLogin } = this.props;
    const $goBack = goBack ? (
      <Link to={goBack} className={styles.goBack + ' ' + iconBackCustomClass}>
        <img src="/public/assets/images/icon_back.svg" className={styles.iconBack}/>
        Go back
      </Link>
    ) : null;

    const $activateRobotBlock = activateRobotBlock ? (
      <span>
        <Button className={'large blue pull-right ' + styles.btnActivateRobot} onClick={onActivateRobot}>
          Activate Robot
        </Button>
        <ActivateRobot {...this.props} />
      </span>
    ) : null;

    const $skip = skip ? (
      <Link to={skip} className={styles.goSkip}>
        Skip
        <i className={'fa fa-arrow-right ' + styles.iconSkip}/>
      </Link>
    ) : null;

    const headerClasses = (hasBorder ? styles.border : '') + ' ' + styles.header + ' ' + sectionHeaderCustomClass;

    const $title = beforeLogin ? (
      <div className={headerClasses}>
        {$goBack}
        <h3
          id={headingTextCustomClass ? headingTextCustomClass : 'default-section-header'}
          className={styles.headingText +  ' ' + (goBack ? '' : styles.noGoBackHeader) + ' ' + styles.beforeLogin}>
          {title}
        </h3>
        {$skip} {$activateRobotBlock}
      </div>
    ) : (
      <h3
        id={headingTextCustomClass ? headingTextCustomClass : 'default-section-header'}
        className={styles.headingText +  ' ' + styles.afterLogin}>
        {title}
      </h3>
    );

    return (
      <div>
        {$title}
      </div>
    );
  }
}

export default SectionHeader;

