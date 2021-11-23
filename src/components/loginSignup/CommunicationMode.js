import _ from "lodash";
import {Card, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import ValidatedTextField from "./ValidatedTextField";
import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {i18n} from 'consult-app-common';

const styles = theme => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        padding: 30
    },
    radioGroup: {
        flexDirection: 'row',
    },
    field: {
        marginTop: theme.spacing.unit
    }
});

class CommunicationMode extends Component{
    constructor(props) {
        super(props);

        this.state = {
            communicationMode: "email"
        };
    }

    static propTypes = {
        onStateChange: PropTypes.func.isRequired,
        countryCode: PropTypes.string,
        mobile: PropTypes.string,
        email: PropTypes.string
    };

    render() {
        const {
            classes,
            mobile,
            countryCode,
            email,
            onStateChange
        } = this.props;

        return <Card className={classes.card}>
            <FormLabel component="legend">{i18n.t('reg-comm')}</FormLabel>
            <RadioGroup
                defaultValue="email"
                name="radio-buttons-group"
                className={classes.radioGroup}
            >
                <FormControlLabel value="email" control={<Radio onChange={this.communicationModeChange}/>} label="Email"/>
                <FormControlLabel value="mobile" control={<Radio onChange={this.communicationModeChange}/>} label="Mobile"/>
            </RadioGroup>
            {this.state.communicationMode === "mobile" && <>
                <ValidatedTextField
                    name="mobileCountryCode"
                    validations={{isNumeric: true}}
                    validationErrors={{
                        minLength: "1 digit"
                    }}
                    mandatory={false}
                    className={classes.field}
                    label="Country code"
                    helperText="1 to 3 digit number (e.g. 91, 1, 234)"
                    textValue={countryCode}
                    handleChange={(event) => onStateChange({countryCode: event.target.value})}
                />
                <ValidatedTextField
                    name="mobile"
                    validations={{isNumeric: true, isLength: 10}}
                    validationErrors={{
                        minLength: "10 digit mobile number"
                    }}
                    mandatory={false}
                    className={classes.field}
                    label="Mobile number"
                    helperText="10 digit number"
                    textValue={mobile}
                    handleChange={(event) => onStateChange({mobile: event.target.value})}
                />
            </>}
            {this.state.communicationMode === "email" && <ValidatedTextField
                name="email"
                validations="isEmail"
                validationErrors={{
                    minLength: "Not a valid email"
                }}
                className={classes.field}
                label="Email"
                mandatory={false}
                textValue={email}
                handleChange={(event) => onStateChange({email: event.target.value})}
            />}
        </Card>
    }

    communicationModeChange = e => {
        this.setState({communicationMode: e.target.value});
    }
}


export default withStyles(styles)(CommunicationMode);
