import * as React from 'react';
import Select from 'react-select';
import Button from 'Elements/Button';
import { returntypeof } from 'Utils/type';
import { connect } from 'react-redux';
import CustomText from 'Elements/CustomText';
import { saveProcessSetting } from 'Components/Admin/Settings/actions';
// import 'Styles/select.less';
// import 'Styles/react-select.less';

const styles = require('./settings.css');
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

class OneRow extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
        countdownTime: '',
        headerSelect: '',
        process1Text: '',
        process1Select: '',
        process2Text: '',
        process2Select: '',
        process3Text: '',
        process3Select: '',
        process4Text: '',
        process4Select: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

  }

  componentWillMount() {
    const { data } = this.props;
    this.setState({
        countdownTime: data.hours,
        headerSelect: data.header,
        process1Text: data.process1time,
        process1Select: data.process1item,
        process2Text: data.process2time,
        process2Select: data.process2item,
        process3Text: data.process3time,
        process3Select: data.process3item,
        process4Text: data.process4time,
        process4Select: data.process4item
    });
  }

  changeInputState(ev) {
    var returnObj = {};
    returnObj[ev.target.name] = ev.target.value;

    this.setState(returnObj);
  }

  handleChange(ev, name) {
    var returnObj = {};
    returnObj[name] = ev.value;

    this.setState(returnObj);
  }

  saveProcessSetting() {
    const { saveProcessSetting, data } = this.props;

    saveProcessSetting(data.id, this.state);
  }

  render() {
    
    var options = [
    ];

    const { processData } = this.props;

    var processArray = [];
    if(processData && processData.processes && !processData.status.error) {
        processArray = processData.processes;
    }

    processArray.map((m, index) => {
        options.push(
            {
                value: m.id,
                label: m.name
            }
        );
    });

    return (
        
        <tr>
            <td>
                <Button className={styles.buttonCss + " medium blue"}>Button1</Button>
            </td>
            <td className={styles.oneRowFixedTd}>
                <CustomText type="number" className="table-text" value={this.state.countdownTime} onChange={this.changeInputState.bind(this)} name="countdownTime" label="Time (Hours)"/>
            </td>
            <td className={styles.oneRowFixedTd}>
                <Select
                    value={this.state.headerSelect}
                    onChange={(ev)=>this.handleChange(ev, "headerSelect")}
                    options={options}
                    clearable={false}
                    name="headerSelect"
                    className="Custom-select"
                />
            </td>
            <td>
                <div className={styles.oneRowItemWrapper}>
                    <div className={styles.oneRowTextWrapper}>
                        <CustomText className="table-text" type="number" value={this.state.process1Text} onChange={this.changeInputState.bind(this)} name="process1Text" label="%"/>
                    </div>
                    <div className={styles.oneRowSelectWrapper}>
                        <Select
                            value={this.state.process1Select}
                            onChange={(ev)=>this.handleChange(ev, "process1Select")}
                            options={options}
                            clearable={false}
                            name="process1Select"
                            className="Custom-select"
                        />
                    </div>
                </div>
            </td>
            <td>
                <div className={styles.oneRowItemWrapper}>
                    <div className={styles.oneRowTextWrapper}>
                        <CustomText className="table-text" type="number" value={this.state.process2Text} onChange={this.changeInputState.bind(this)} name="process2Text" label="%"/>
                    </div>
                    <div className={styles.oneRowSelectWrapper}>
                        <Select
                            value={this.state.process2Select}
                            onChange={(ev)=>this.handleChange(ev, "process2Select")}
                            options={options}
                            clearable={false}
                            name="process2Select"
                            className="Custom-select"
                        />
                    </div>
                </div>
            </td>
            <td>
                <div className={styles.oneRowItemWrapper}>
                    <div className={styles.oneRowTextWrapper}>
                        <CustomText className="table-text" type="number" value={this.state.process3Text} onChange={this.changeInputState.bind(this)} name="process3Text" label="%"/>
                    </div>
                    <div className={styles.oneRowSelectWrapper}>
                        <Select
                            value={this.state.process3Select}
                            onChange={(ev)=>this.handleChange(ev, "process3Select")}
                            options={options}
                            clearable={false}
                            name="process3Select"
                            className="Custom-select"
                        />
                    </div>
                </div>
            </td>
            <td>
                <div className={styles.oneRowItemWrapper}>
                    <div className={styles.oneRowTextWrapper}>
                        <CustomText className="table-text" type="number" value={this.state.process4Text} onChange={this.changeInputState.bind(this)} name="process4Text" label="%"/>
                    </div>
                    <div className={styles.oneRowSelectWrapper}>
                        <Select
                            value={this.state.process4Select}
                            onChange={(ev)=>this.handleChange(ev, "process4Select")}
                            options={options}
                            clearable={false}
                            name="process4Select"
                            className="Custom-select"
                        />
                    </div>
                </div>
            </td>
            <td>
                <Button className={styles.saveBtn + " medium blue"} onClick={this.saveProcessSetting.bind(this)}>Save</Button>
            </td>
        </tr>
    );
  }
}

const mapStateToProps = rootState => ({
    processData: rootState.adminProcessData.processData
});

const mapDispatchToProps = {
    saveProcessSetting
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OneRow);