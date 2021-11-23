import React from "react";
import {withStyles} from '@material-ui/core/styles';
import commonStyles from "./framework/CommonStyles";
import {Button, TextField} from "@material-ui/core";
import PropTypes from 'prop-types';
import BaseView from "./framework/BaseView";
import EmailField from "../components/EmailField";
import MobileNumberField from "../components/MobileNumberField";

const styleObj = {
    root: commonStyles.root,
    actions: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    button: {
        marginLeft: 10,
        marginRight: 10
    },
    formField: {
        marginTop: 20,
    }
}
const styles = theme => (styleObj);

class UpdateProfile extends BaseView {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {
            name: props.name,
            email: props.email,
            mobile: props.mobile
        }
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        mobile: PropTypes.string,
    }

    render() {
        const {
            classes
        } = this.props;

        return <div className={classes.root}>
            <TextField
                name="name"
                required
                fullWidth
                className={classes.formField}
                label="Name"
                onChange={this.nameChanged}
                value={this.state.name}
            />

            <EmailField email={this.state.email} onEmailChange={this.setState} containerProvidedStyle={styleObj.formField}/>
            <MobileNumberField email={this.state.mobile} onEmailChange={this.setState} containerProvidedStyle={styleObj.formField}/>

            <div className={classes.actions}>
                <Button type="submit"
                        variant="contained" color="primary"
                        className={classes.button}
                        onSubmit={this.submit}>Update Profile</Button>
                <Button type="button"
                        variant="contained" color="default"
                        className={classes.button}
                        onSubmit={this.cancel}>Cancel</Button>
            </div>
        </div>;
    }

    nameChanged = (e) => {
        this.setValue("name", e);
    };
}

export default withStyles(styles)(UpdateProfile);
