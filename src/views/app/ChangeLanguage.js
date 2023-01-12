import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import ModalContainerView from "../framework/ModalContainerView";
import {Box, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {i18n, Languages, User, UserService} from "consult-app-common";
import SaveCancelButtons from "../../components/SaveCancelButtons";
import {ServerCall} from "react-app-common";
import GlobalContext from "../../framework/GlobalContext";
import BaseView from "../framework/BaseView";
import {CardsSkeleton} from "../../components/ConsultSkeleton";

const styles = theme => ({});

class ChangeLanguage extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loadUserCallToChangeLanguage: ServerCall.createInitial(),
            saveLanguagePreferenceServerCall: ServerCall.createInitial()
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired
    };

    componentDidMount() {
        const user = GlobalContext.getUser();
        if (!_.isNil(user))
            this.loadEntity(user.id, () => UserService.loadUser(user.id), "loadUserCallToChangeLanguage", User.newUser());
    }

    updateServerResponseState(newState, serverCallName) {
        const data = ServerCall.getData(newState.loadUserCallToChangeLanguage);
        newState.user = User.copyFields(new User(), data);
        this.setState(newState);
    }

    saveLanguagePreference() {
        this.makeServerCall(UserService.saveLanguagePreference(this.state.user), "saveLanguagePreferenceServerCall")
            .then(i18n.changeLanguage(this.state.user.language))
            .then(this.getEntitySaveHandler("saveLanguagePreferenceServerCall"));
    }

    onLanguageChange(e) {
        this.state.user.language = e.target.value;
        this.setState({user: this.state.user.clone()});
    }

    render() {
        const {messageClose} = this.props;
        const {loadUserCallToChangeLanguage, user} = this.state;

        return <ModalContainerView titleKey="change-language-title">
            {ServerCall.noCallOrWait(this.state.loadUserCallToChangeLanguage) ? <CardsSkeleton/> :
                <Box style={{padding: 20}}>
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="languages" value={user.language}
                                onChange={(e) => this.onLanguageChange(e)}>
                        {Languages.map((l) => <FormControlLabel value={l.code} control={<Radio/>} label={i18n.t(l.displayKey)}/>)}
                    </RadioGroup>
                <SaveCancelButtons serverCall={loadUserCallToChangeLanguage} onCancelHandler={messageClose} onSaveHandler={() => this.saveLanguagePreference()}/>
                </Box>}
        </ModalContainerView>;
    }
}

export default withStyles(styles)(ChangeLanguage);
