import React from 'react';
import {withStyles} from '@mui/styles';
import ConsultAppBar from "../../components/ConsultAppBar";
import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import {i18n, UserService} from "consult-app-common";
import {Link, Redirect} from "react-router-dom";
import BaseView from "../framework/BaseView";
import {ServerCall} from "react-app-common";
import PropTypes from 'prop-types';
import GlobalContext from "../../framework/GlobalContext";
import _ from 'lodash';
import ServerErrorMessage from "../../components/ServerErrorMessage";

const styles = theme => ({
    novMain: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    novTitle: {
        marginTop: 50
    },
    novContent: {
        marginTop: 50,
        marginBottom: 30
    },
    novOtherActionCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        padding: 20
    },
    novHelp: {
        marginBottom: 20
    },
    novStartOrganisationCard: {
        margin: 10,
        marginRight: 10,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        flexGrow: 1
    },
    novRegisterButton: {
        marginTop: theme.distance.unit * 4
    },
    novOrgTextField: {
        marginTop: theme.distance.unit * 6,
        alignItems: 'stretch'
    }
});

class NoOrganisationView extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            orgName: "",
            registerOrgServerCall: ServerCall.createInitial(),
            getUserServerCall: ServerCall.createInitial()
        };
    }

    onSubmit(e) {
        e.preventDefault();
        let {orgName} = this.state;
        this.makeServerCall(UserService.registerOrgForOwner(orgName), "registerOrgServerCall");
    }

    onSuccessfulServerCall(serverCallName) {
        if (serverCallName === "registerOrgServerCall")
            this.makeServerCall(UserService.getUser(), "getUserServerCall");
        else if (serverCallName === "getUserServerCall")
            GlobalContext.updateContext(this.state.getUserServerCall);
        this.props.onOrgRegistered();
    }

    static propTypes = {
        onOrgRegistered: PropTypes.func.isRequired
    };

    render() {
        const {classes} = this.props;
        const {registerOrgServerCall, getUserServerCall} = this.state;
        return <Box className={classes.novMain}>
            <ConsultAppBar/>
            <ServerErrorMessage serverCall={registerOrgServerCall}/>
            <ServerErrorMessage serverCall={getUserServerCall}/>
            <Typography variant="h4" className={classes.novTitle}>{i18n.t('not-part-of-organisation')}</Typography>
            <Grid container className={classes.novContent} direction="row" justifyContent="center" alignItems="stretch">
                <Grid item lg={4} xs={12}>
                    <Paper className={classes.novStartOrganisationCard} elevation={5} component="form">
                        <Typography variant="h6">{i18n.t('create-your-organisation')}</Typography>
                        <TextField
                            name="organisationName"
                            autoComplete="organisation"
                            required
                            className={classes.novOrgTextField}
                            label={i18n.t("register-org-name-label")}
                            value={this.state.orgName}
                            onChange={this.getValueChangedHandler("orgName")}
                        />
                        <Button type="submit" className={classes.novRegisterButton}
                                fullWidth
                                disabled={_.isEmpty(this.state.orgName)}
                                variant="contained" color="primary"
                                onClick={(e) => this.onSubmit(e)}>{i18n.t("register-org-submit-button")}</Button>
                    </Paper>
                </Grid>
                <Grid item lg={4} xs={12}>
                    <Paper elevation={0} className={classes.novOtherActionCard} raised={true}>
                        <Typography className={classes.novHelp} variant="h5">{i18n.t("contact-org-admin-to-get-added")}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>;
    }
}

export default withStyles(styles)(NoOrganisationView);
