import * as React from 'react';
import 'Styles/react-toggle.less';
import 'Styles/toggle.less';

const styles = require('./small-toggle.css');

const SmallToggle = (props) => {
  const {
    checked,
    leftChecked,
    onClick,
    color
  } = props;

  return (
    <div className={styles.wrapper} onClick={onClick}>
        {
            checked ? (
                <div>
                    <div className={styles.track}>
                        
                    </div>
                    <div className={styles.ball + ' ' + (leftChecked ? styles.leftChecked : styles.checked) + ' ' + styles[color]}></div>
                </div>
            ) : (
                <div>
                    <div className={styles.track}>
                        
                    </div>
                    <div className={styles.ball + ' ' + (leftChecked ? styles.leftUnchecked : styles.unchecked)}></div>
                </div>
            )
        }
        
    </div>
  );
};

export default SmallToggle;