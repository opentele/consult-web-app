import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {withStyles} from '@material-ui/core/styles';
import ModalContainerView from "../framework/ModalContainerView";
import EditUserFields from "../../components/loginSignup/EditUserFields";
import BaseView from "../framework/BaseView";

const styles = theme => ({});

class EditUser extends BaseView {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        userId: PropTypes.number.isRequired
    };

    render() {
        const {classes, userId} = this.props;
        return <ModalContainerView titleKey="edit-user">
            <EditUserFields askForProviderType={true} userId={userId} notifyStateChange={()=>{}}/>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(EditUser);
