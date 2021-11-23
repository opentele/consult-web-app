import _ from "lodash";
import React, {Component} from "react";
import {Button, TextField} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import {FieldValidator} from "consult-app-common";
import commonStyles from "./framework/CommonStyles";

const styles = theme => ({
    root: commonStyles.root,
    userId: {
        alignSelf: 'center'
    },
    actions: {
        marginTop: theme.spacing.unit * 2
    }
});

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.defaultUserId,
            userIdType: props.userIdType
        }
    }

    render() {
        const {
            classes
        } = this.props;

        return <div className={classes.root}>
            <TextField
                fullWidth
                name="emailOrMobile"
                autoComplete={this.state.userIdType === "email" ? "email" : "mobile"}
                required
                className={classes.userId}
                label={this.state.userIdType === "email" ? "Email" : "Mobile"}
                onChange={this.state.userIdType === "email" ? this.emailChanged : this.mobileChanged}
                value={this.state.userId}
            />
            <div className={classes.actions}>
                <Button type="submit"
                        name="resetPassword"
                        fullWidth
                        variant="contained" color="primary" onClick={this.otpRequested}>Get Reset Password Link</Button>
            </div>
        </div>;
    }

    emailChanged = (e) => {
        let message = FieldValidator.emailValidator(e.target.value);
        this.setState({error: message, userId: e.target.value});
    }

    mobileChanged = (e) => {
        let message = FieldValidator.mobileValidator(e.target.value);
        this.setState({error: message, userId: e.target.value});
    }
}

export default withStyles(styles)(ResetPassword);
