import * as React from 'react';

const styles = require('./main-header.css');

export default class Notifier extends React.Component<{}, { isOpen: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { isOpen: false };
  }

  render() {
    const { isOpen } = this.state;
    const items = [
      {
        time: '2 min ago',
        text: 'This is a test notification!',
      },
      {
        time: '3h ago',
        text: 'This is another notification, also for test purposes.',
      }
    ];

    return (
      <div className={styles.notifier} onClick={() => this.toggleOpen()}>
        <img src="/public/assets/images/icon-bell.svg" alt="Notifications"/>
        {items.length && <div className={styles.pill}>{items.length}</div>}
        {isOpen && (
          <div>
            <div className={styles.popupOverlay} onClick={() => this.toggleOpen()}/>
            <div className={styles.popup}>
              {items.map((item, index) => (
                <div key={index} className={styles.popupItem}>
                  <div className={styles.time}>{item.time}</div>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }
}
