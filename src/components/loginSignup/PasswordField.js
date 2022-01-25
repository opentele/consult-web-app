import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {i18n} from "consult-app-common";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const styles = theme => ({});

class PasswordField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassword: false
        };
    }

    static propTypes = {
        name: PropTypes.string,
        className: PropTypes.string.isRequired,
        labelKey: PropTypes.string,
        value: PropTypes.string.isRequired,
        onChangeHandler: PropTypes.func.isRequired,
        hasError: PropTypes.bool.isRequired,
        errorText: PropTypes.string.isRequired
    }

    static defaultProps = {
        name: "password",
        labelKey: "enter-password-label"
    }

    render() {
        const {name, className, labelKey, value, onChangeHandler, hasError, errorText} = this.props;
        const {showPassword} = this.state;

        return <TextField
            name={name}
            className={className}
            label={i18n.t(labelKey)}
            required
            value={value}
            onChange={onChangeHandler}
            error={hasError}
            helperText={errorText}
            type={showPassword ? "text" : "password"}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={this.getToggleVisibilityHandler()}
                                    onMouseDown={this.getToggleVisibilityHandler()}>
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>)
            }}
        />;
    }

    getToggleVisibilityHandler() {
        return () => {
            this.setState({showPassword: !this.state.showPassword});
        }
    }
}

PasswordField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PasswordField);
