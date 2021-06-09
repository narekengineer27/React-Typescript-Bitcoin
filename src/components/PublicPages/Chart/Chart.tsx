import * as React from 'react';
import 'Styles/table.less';
import { connect } from 'react-redux';
import { Status } from 'Models/Status';
import Responsive from 'Partials/Responsive';
// import ComingSoon from 'Components/Chart/ComingSoon';
import PublicPageLayout from 'Partials/PublicPageLayout';
import DeploymentCountdown from 'Components/DeploymentCountdown';

const styles = require('./chart.css');

class Chart extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isOpen: true
        };
    }

    componentDidMount() {
        
    }

    onClose() {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <PublicPageLayout footerHidden>
                <div className={styles.titleWrapper}>
                    <img src="/public/assets/images/landing1/xrAsset.png"/>
                    <span>XchangeRate Ecosystem</span>
                </div>
                
                <div className={styles.chartContent}>
                    <Responsive name="desktop">
                        <img src="/public/assets/images/landing1/chart.png" />
                    </Responsive>
                    <Responsive name="phone">
                        <img src="/public/assets/images/landing1/chartMobile.png" />
                    </Responsive>
                </div>
                <DeploymentCountdown isOpen={true} onCancel={this.onClose.bind(this)} width="700"/>
                {/* <ComingSoon isOpen={this.state.isOpen} onCancel={this.onClose.bind(this)} width="700" /> */}
            </PublicPageLayout>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
