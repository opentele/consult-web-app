import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';

import TabContent from '../components/loginSignup/TabContent';
import Login from './Login';
import Register from './Register';
import OrganisationRegister from "./OrganisationRegister";


const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    card: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            flexBasis: '41rem',
            flexGrow: 0
        }
    }
});

class LoginRegister extends Component {

    static propTypes = {
        transitionTimeout: PropTypes.number,
        header: PropTypes.element,
        footer: PropTypes.element,
        onLogin: PropTypes.func,
        loginFailed: PropTypes.string,
        registerFailed: PropTypes.string,
        onRegister: PropTypes.func
    };

    static defaultProps = {
        transitionTimeout: 1000,
    };

    constructor(props) {
        super(props);

        this.state = {
            tab: 0
        }
    }

    render() {
        const {
            classes,
            transitionTimeout,
            header,
            footer,
            onLogin,
            onRegister,
            loginFailed,
            registerFailed
        } = this.props;

        const {tab} = this.state;

        let activeTab;
        switch (tab) {
            case 0:
                activeTab =
                    <TabContent>
                        <Login onLogin={onLogin}
                               loginFailed={loginFailed}
                        />
                    </TabContent>;
                break;

            case 1:
                activeTab =
                    <TabContent>
                        <Register onRegister={onRegister} registerFailed={registerFailed}/>
                    </TabContent>;
                break;

            case 2:
                activeTab =
                    <TabContent>
                        <OrganisationRegister onRegister={onRegister} registerFailed={registerFailed}/>
                    </TabContent>;
                break;
        }

        return (
            <div className={classes.root}>
                <Card className={classes.card} variant="outlined">
                    {header && <div>{header}</div>}
                    {
                        <Tabs
                            value={this.state.tab}
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="Login"/>
                            <Tab label="Register User"/>
                            <Tab label="Register Organisation"/>
                        </Tabs>
                    }
                    {
                        transitionTimeout > 0 ?
                            <Fade key={tab} in={true} timeout={transitionTimeout}>
                                {activeTab}
                            </Fade>
                            : activeTab
                    }
                    {footer && <div>{footer}</div>}
                </Card>
            </div>
        );
    }

    handleTabChange = (event, value) => {
        this.setState({tab: value});
    }
}

export default withStyles(styles)(LoginRegister);
