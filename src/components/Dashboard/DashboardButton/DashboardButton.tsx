import * as React from 'react';

const styles = require('../dashboard.css');

class DashboardButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isHovering: false,
        };
    }

    handleMouseHover() {
        this.setState({
            isHovering: !this.state.isHovering,
        });
    }

    render() {
        const { content, reportLine, img, title, onClick } = this.props;
        return (
            <div className={styles.buttonItem}>
                <div className={styles.imageWrapper}>
                    <img className={styles.hexaImage} src={img} onClick={onClick} onMouseEnter={this.handleMouseHover.bind(this)} onMouseLeave={this.handleMouseHover.bind(this)} />
                    {
                        this.state.isHovering && (<div className={ reportLine==1?styles.reportLine_1:styles.reportLine_2 }>
                            <div className={styles.circle}></div>
                            <div className={styles.reportText}>
                                <span className={styles.reportTitle}>
                                    {title}
                                </span>
                                <span className={styles.reportDesc}>
                                    {content}
                                </span>
                            </div>
                        </div> )
                    }                                        
                </div>
            </div>                                           
        );
    }
}

export default DashboardButton;
