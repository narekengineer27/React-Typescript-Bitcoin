import * as React from 'react';
import Button from 'Elements/Button';

const styles = require('./data-dashboard.css');

export default class DataDashboard extends React.Component<{}, {}> {

  constructor(props: any) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.contentWrapper}>
                <div className={styles.title}>
                    <h2>Admin Data Dashboard</h2>
                </div>
                <div className={styles.content}>
                    <div className={styles.firstRow}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Exchnages</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Exchange1
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Exchange2
                                    </td>
                                </tr>
                            </tbody>
                            <div className={styles.exchangePlusBtn}><span>+</span></div>
                        </table>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Exchnages</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Exchange1
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Exchange2
                                    </td>
                                </tr>
                            </tbody>
                            <div className={styles.exchangePlusBtn}><span>+</span></div>
                        </table>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Exchnages</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Exchange1
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Exchange2
                                    </td>
                                </tr>
                            </tbody>
                            <div className={styles.exchangePlusBtn}><span>+</span></div>
                        </table>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Exchnages</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Exchange1
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Exchange2
                                    </td>
                                </tr>
                            </tbody>
                            <div className={styles.exchangePlusBtn}><span>+</span></div>
                        </table>
                    </div>
                    <div className={styles.secondRow}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Market Maker</th>
                                    <th>Wallet Address</th>
                                    <th>Exchnages1</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Exchange1
                                    </td>
                                    <td>
                                        Exchange1
                                    </td>
                                    <td>
                                        <div>
                                            <span>Exchange1</span>
                                        </div>
                                        <div>
                                            <span>Exchange1</span>
                                        </div>
                                        <div>
                                            <span>Exchange1</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Coin</th>
                                    <th>Offer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Exchange1
                                    </td>
                                    <td>
                                        <div>
                                            <span>Exchange1</span>
                                        </div>
                                        <div>
                                            <span>Exchange1</span>
                                        </div>
                                        <div>
                                            <span>Exchange1</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>    
            </div>
            
        </div>
    );
  }
}
