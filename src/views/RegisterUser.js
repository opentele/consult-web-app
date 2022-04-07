import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import {Button, Card, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

import ValidatedTextField from '../components/loginSignup/ValidatedTextField';
import {UserService} from "consult-app-common";
import CommunicationMode from "../components/loginSignup/CommunicationMode";
import AuthenticationMode from "../components/loginSignup/AuthenticationMode";
import ServerErrorMessage from "../components/ServerErrorMessage";
import ModalContainerView from "./framework/ModalContainerView";

const styles = theme => ({
    root: {},
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        padding: 30
    },
    field: {
        marginTop: theme.spacing.unit
    },
    actions: {
        marginTop: theme.spacing.unit * 2
    }
});

class RegisterUser extends Component {
    static propTypes = {
        onRegister: PropTypes.func,
        registerFailed: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
            name: props.defaultName,
            email: props.defaultEmail,
            mobile: props.defaultMobile,
            countryCode: props.defaultCountryCode
        };

        this.setState = this.setState.bind(this);
    }

    render() {
        const {
            classes,
            error
        } = this.props;
        const {canSubmit} = this.state;
        return (
            <ModalContainerView titleKey="register-new-user">
                <Formsy className={classes.form}
                        onValid={this.enableSubmit} onInvalid={this.disableSubmit}
                        onValidSubmit={this.submit}>

                    <ValidatedTextField
                        name="name"
                        autoComplete="name"
                        mandatory={true}
                        className={classes.field}
                        label="Your name"
                        helperText="min 3 characters"
                        textValue={this.state.name}
                        handleChange={(event) => this.setState({name: event.target.value})}
                    />

                    <CommunicationMode countryCode={this.state.countryCode} email={this.state.email} mobile={this.state.mobile} onStateChange={this.setState}/>

                    <Card className={classes.card}>
                        <AuthenticationMode onAuthModeChange={this.setState} authMode={this.state.authMode}/>
                    </Card>

                    <ServerErrorMessage serverCall={null}/>

                    <div className={classes.actions}>
                        <Button type="submit"
                                fullWidth
                                variant="contained" color="primary"
                                onSubmit={this.submit}
                                disabled={!canSubmit}>Register User</Button>
                    </div>
                </Formsy>
            </ModalContainerView>
        );
    }

    submit = () => {
        let {name, orgName, email, mobile, password} = this.state;
        UserService.registerOrg(name, orgName, email, mobile, password).then(() => {
        }, () => {
        });
    }

    disableSubmit = () => {
        this.setState({canSubmit: false});
    };

    enableSubmit = () => {
        this.setState({canSubmit: true});
    };
}

export default withStyles(styles)(RegisterUser);
