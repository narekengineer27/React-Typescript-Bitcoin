import * as React from 'react';
import Button from 'Elements/Button';
import { returntypeof } from 'Utils/type';
import { connect } from 'react-redux';
import CustomText from 'Elements/CustomText';
import OneRow from 'Components/Admin/Settings/OneRow';
import { fetchProcesses, saveProcess, fetchProcessSettings } from './actions';


const styles = require('./settings.css');

class Settings extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
        processName: ''
    };
  }

    componentWillMount() {
        const { processData, fetchProcesses, fetchProcessSettings, processSettingData } = this.props;
        if(!processData || !processData.processes) {
            fetchProcesses();
        }

        if(!processSettingData || !processSettingData.processSettings) {
            fetchProcessSettings();
        }
    }

    changeInputState(ev) {
        var returnObj = {};
        returnObj[ev.target.name] = ev.target.value;

        this.setState(returnObj);
    }

    saveProcess() {
        const { saveProcess } = this.props;

        saveProcess(this.state.processName);
    }

  render() {
    
    const { processData, fetchProcesses, processSettingData, fetchProcessSettings } = this.props;
    var processArray = [];
    if(!processData || !processData.processes || processData.status.error) {
        fetchProcesses();
    } else {
        processArray = processData.processes;
    }

    var processSettingsArray = [];
    if(!processSettingData || !processSettingData.processSettings || processSettingData.status.error) {
        fetchProcessSettings();
    } else {
        processSettingsArray = processSettingData.processSettings;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.contentWrapper}>
                <div className={styles.title}>
                    <span>Settings</span>
                </div>
                <div className={styles.content}>
                    <div className={styles.topContent}>
                        <div className={styles.topFormWrapper}>
                            <span className={styles.topFormText}>Add Process</span>
                            <CustomText className="normal" type="text" value={this.state.processName} onChange={this.changeInputState.bind(this)} name="processName" label="Process Name"/>
                            <Button className={styles.topFormBtn + ' medium blue'} onClick={this.saveProcess.bind(this)}>ADD</Button>
                        </div>
                        <div className={styles.processList}>
                        {
                            processArray.map((m, index) => {
                                return (
                                    <div className={styles.processItem} key={index}>
                                        <span>{m.name}</span>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className={styles.tableView}>
                        <table cellPadding="0">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Count Down Time (hrs)</th>
                                    <th scope="col">Header</th>
                                    <th scope="col">Process Progress 1(%)</th>
                                    <th scope="col">Process Progress 2(%)</th>
                                    <th scope="col">Process Progress 3(%)</th>
                                    <th scope="col">Process Progress 4(%)</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    processSettingsArray.map((m, index) => {
                                        return (
                                            <OneRow data={m}/>
                                        )
                                    })
                                }
                            </tbody>                        
                        </table>
                    </div>
                </div>    
            </div>
            
        </div>
    );
  }
}

const mapStateToProps = rootState => ({
    processData: rootState.adminProcessData.processData,
    processSettingData: rootState.adminProcessData.processSettingsData
});

const mapDispatchToProps = {
    fetchProcesses,
    saveProcess,
    fetchProcessSettings
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Settings);