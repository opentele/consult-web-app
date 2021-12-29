import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import Login from './Login';
import {Box, Button, Typography} from "@material-ui/core";
import {i18n} from "consult-app-common";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    loginCard: {
        padding: 20,
        marginRight: 20
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    welcome: {
        marginTop: 60,
        marginBottom: 40
    },
    otherActionsCard: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    registrationHelp: {
        marginBottom: 20,
        width: "75%"
    }
});

class Home extends Component {

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
            classes
        } = this.props;

        return (
            <Box className={classes.root}>
                <Typography variant="h3" className={classes.welcome}>{i18n.t("home-welcome")}</Typography>
                <Box className={classes.content}>
                    <Card className={classes.loginCard} variant="elevation" raised={true}>
                        <Login onLogin={() => {
                        }} loginFailed={() => {
                        }}/>
                    </Card>
                    <Card className={classes.otherActionsCard} variant="elevation" raised={true}>
                        <Typography className={classes.registrationHelp} variant="h6">{i18n.t("register-help")}</Typography>
                        <Button variant="contained" color="primary">{i18n.t("register-organisation")}</Button>
                    </Card>
                </Box>
            </Box>
        );
    }

    handleTabChange = (event, value) => {
        this.setState({tab: value});
    }
}

export default withStyles(styles)(Home);
