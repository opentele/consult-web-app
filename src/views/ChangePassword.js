import React, {Component} from "react";
import {Button, TextField, Typography} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: props.defaultCurrentPassword,
            password: props.defaultPassword,
            confirmPassword: props.defaultPassword
        }
    }

    static propTypes = {
        currentPasswordRequired: PropTypes.string.isRequired
    }

    render() {
        const {
            classes,
            userId,
            currentPasswordRequired
        } = this.props;

        return <div className={classes.root}>
            <div>
                <Typography variant="h6">Update password</Typography>
                <Typography variant="body1">{`USER: ${userId}`}</Typography>
            </div>

            {currentPasswordRequired && <TextField
                type="password"
                name="oldPassword"
                required
                fullWidth
                className={classes.field}
                label="Old Password"
                onChange={this.currentPasswordChanged}
                value={this.state.currentPassword}
            />}
            <TextField
                type="password"
                name="password"
                required
                fullWidth
                className={classes.field}
                label="Password"
                onChange={this.passwordChanged}
                value={this.state.password}
            />
            <TextField
                type="password"
                name="confirmPassword"
                required
                fullWidth
                className={classes.field}
                label="Confirm Password"
                onChange={this.confirmPasswordChanged}
                value={this.state.confirmPassword}
            />
            <div className={classes.actions}>
                <Button type="submit"
                        name="updatePassword"
                        fullWidth
                        variant="contained" color="primary" onClick={this.submit}>Update Password</Button>
            </div>
        </div>;
    }

    currentPasswordChanged = (e) => {
        this.setState({currentPassword: e.target.value});
    }

    passwordChanged = (e) => {
        this.setState({password: e.target.value});
    }

    confirmPasswordChanged = (e) => {
        this.setState({confirmPassword: e.target.value});
    }

    submit = (e) => {
    }
}

export default withStyles(styles)(ChangePassword);
