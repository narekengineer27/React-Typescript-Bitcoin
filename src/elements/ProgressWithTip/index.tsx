import * as React from 'react';
var Line = require('rc-progress').Line;

const styles = require('./progress-with-tip.css');

const ProgressWithTip = (props) => {
  const {
    className,
    percent,
    strokeWidth,
    trailWidth,
    strokeColor,
    isToolTip
  } = props;

  return (
    <div className={styles.wrapper}>
        {
            isToolTip ? (
                <div className={styles.toolTip}>
                    <span>{percent + '%'}</span>
                </div>
            ) : ''
        }
        <Line className={styles[className]} percent={percent} strokeWidth={strokeWidth} trailWidth={trailWidth} strokeColor={strokeColor}/>
    </div>
  );
};

export default ProgressWithTip;