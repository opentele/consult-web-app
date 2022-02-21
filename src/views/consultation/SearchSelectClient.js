import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, CircularProgress, Grid, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import BaseView from "../framework/BaseView";
import {Autocomplete} from "@mui/material";
import {i18n} from "consult-app-common";
import {Container, ServerCall} from 'react-app-common';
import ClientService from "../../service/ClientService";
import _ from 'lodash';
import ErrorAlert from "../../components/ErrorAlert";

const styles = theme => ({
    sscMain: {
        paddingLeft: 230,
        paddingRight: 210,
        paddingTop: 20
    },
    sscSeparation: {
        marginTop: 300
    },
    sscSearch: {
        width: '100%'
    },
    sscButtons: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    sscSelectButton: {
        marginRight: 10
    }
});

class SearchSelectClient extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            autoCompleteOpen: false,
            serverCall: ServerCall.noOngoingCall()
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        clientSelected: PropTypes.func.isRequired,
        serverCallStatus: PropTypes.object.isRequired
    }

    searchOpenHandler = () => {
        Container.get(ClientService).search('', (response) => {
            this.setState({serverCall: ServerCall.responseReceived(this.state.serverCall, response)});
        });
        this.setState({autoCompleteOpen: true});
    }

    searchCloseHandler = () => {
        this.setState({autoCompleteOpen: false, options: []});
    }

    searchChangeHandler = (e) => {
        Container.get(ClientService).search(e.target.value, (response) => {
            this.setState({serverCall: ServerCall.responseReceived(this.state.serverCall, response)});
        });
        this.setState({serverCall: ServerCall.serverCallMade(this.state.serverCall)});
    }

    clientSelectHandler = () => {
        this.props.clientSelected(this.state.selectedClient.id);
    }

    render() {
        const {
            classes,
            messageClose,
            inError
        } = this.props;

        const {serverCall, autoCompleteOpen, selectedClient} = this.state;

        return <Grid container className={classes.sscMain}>
            <Grid item lg={10}>
                <Autocomplete
                    open={autoCompleteOpen}
                    onInputChange={this.searchChangeHandler}
                    onOpen={this.searchOpenHandler}
                    onClose={this.searchCloseHandler}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => `${option.name} - ${option.registrationNumber}`}
                    options={ServerCall.getData(serverCall)}
                    loading={serverCall.lastCallStatus}
                    onChange={(event, value) => this.setState({selectedClient: value})}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search clients"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {serverCall.lastCallStatus ? <CircularProgress color="inherit" size={20}/> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                )
                            }}
                        />
                    )}
                />
            </Grid>
            <Grid item lg={10}>
                <Box className={classes.sscButtons}>
                    <Button disabled={_.isNil(selectedClient)} variant="contained" color="primary" onClick={this.clientSelectHandler} className={classes.sscSelectButton}>{i18n.t("select")}</Button>
                    <Button variant="contained" color="inherit" onClick={messageClose}>{i18n.t("cancel")}</Button>
                </Box>
            </Grid>
            <Grid item lg={10} className={classes.sscSeparation}>
                {inError && <ErrorAlert title={'unexpected-error-title'} message={'unexpected-error-message'}/>}
            </Grid>
        </Grid>;
    }
}

export default withStyles(styles)(SearchSelectClient);
