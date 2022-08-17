import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import ModalContainerView from "../framework/ModalContainerView";
import {Box, FormControlLabel, FormLabel, RadioGroup, Radio} from "@mui/material";
import {i18n, Languages, User, UserService} from "consult-app-common";
import SaveCancelButtons from "../../components/SaveCancelButtons";
import {ServerCall} from "react-app-common";
import GlobalContext from "../../framework/GlobalContext";
import WaitView from "../../components/WaitView";
import BaseView from "../framework/BaseView";

const styles = theme => ({});

class ChangeLanguage extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loadUserCallToChangeLanguage: ServerCall.createInitial()
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired
    };

    componentDidMount() {
        const user = GlobalContext.getUser();
        this.loadEntity(user.id, () => UserService.loadUser(user.id), "loadUserCallToChangeLanguage", User.newUser());
    }

    updateServerResponseState(newState, serverCallName) {
        newState.user = User.fromOther(ServerCall.getData(newState.loadUserCallToChangeLanguage), new User());
        this.setState(newState);
    }

    saveLanguagePreference() {

    }

    render() {
        const {classes, messageClose} = this.props;
        const loadUserCallToChangeLanguage = this.state;

        if (ServerCall.noCallOrWait(this.state.loadUserCallToChangeLanguage))
            return <WaitView/>;

        return <ModalContainerView titleKey="change-language-title">
            <Box style={{padding: 20}}>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="languages">
                    {Languages.map((l) => <FormControlLabel value={l} control={<Radio/>} label={i18n.t(l)}/>)}
                </RadioGroup>
                <SaveCancelButtons serverCall={loadUserCallToChangeLanguage} onCancelHandler={messageClose} onSaveHandler={() => this.saveLanguagePreference()}/>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(ChangeLanguage);
