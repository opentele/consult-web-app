import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import Login from './Login';
import ConsultAppBar from "../components/ConsultAppBar";
import {Box, Button, Typography} from "@material-ui/core";
import {i18n} from "consult-app-common";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    loginCard: {
        padding: 20
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
    },
    otherActionsCard: {
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
                <ConsultAppBar/>
                <Box className={classes.content}>
                    <Card className={classes.loginCard} variant="outlined">
                        <Login onLogin={() => {
                        }} loginFailed={() => {
                        }}/>
                    </Card>
                    <Card className={classes.otherActionsCard}>
                        <Typography>{i18n.t("register-help")}</Typography>
                        <Button variant="contained" color="primary">{i18n.t("register")}</Button>
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
