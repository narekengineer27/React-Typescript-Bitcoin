import * as React from 'react';
import Select from 'react-select';
import Button from 'Elements/Button';
import { connect } from 'react-redux';
import { updateVotingSetupData } from './actions';

const env = require('Root/env.json');
const exchangeLogoUrl = env.exchangeLogoUrl;
const styles = require('./voting-setup.css');

class OneRow extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: '',
            exchange_name: '',
            exchange_logo: '',
            max_vote: '',
            status: '',
            total_vote: '',
        };
    }

    componentWillMount() {
        const { data } = this.props;
        this.setState({
            id: data.id,
            exchange_name: data.exchange_name,
            exchange_logo: data.exchange_logo,
            max_vote: data.max_vote,
            status: data.status,
            total_vote: data.total_vote
        });
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev, status) {
        var returnObj = {};
        returnObj[status] = ev.value;    
        this.setState(returnObj);
    }

    updateVote() {
        const { updateVotingSetupData, data } = this.props;
        const updateData = {
            status: this.state.status
        };
        updateVotingSetupData(data.id, updateData);
    }

    render() {
        const statusSelect = [
            {value: 'voting', label: 'Voting'},
            {value: 'completed', label: 'Completed'}
        ];
        return (                                        
            <tr>                            
                <td>
                    <img src="/public/assets/images/landing/live.png" />
                </td>
                <td>{this.state.exchange_name}</td>
                <td><img src={exchangeLogoUrl+this.state.exchange_logo} className={styles.logos}/></td>
                <td>{this.state.total_vote}</td>
                <td>{this.state.max_vote}</td>
                <td>
                    <Select 
                        options={statusSelect}
                        value={this.state.status}
                        onChange={(ev)=>this.handleChange(ev, "status")}
                        name={"status"}
                        placeholder="Select"
                    />
                </td>
                <td>
                    <Button className={styles.updateBtn + " medium"} onClick={this.updateVote.bind(this)}>UPDATE</Button>
                </td>
            </tr>                                            
        )
    }
}

const mapStateToProps = rootState => ({
    
});

const mapDispatchToProps = {
    updateVotingSetupData
};

export default connect(mapStateToProps, mapDispatchToProps)(OneRow);