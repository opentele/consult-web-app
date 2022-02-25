import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {CircularProgress, Grid, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import BaseView from "../framework/BaseView";
import {Autocomplete} from "@mui/material";
import {BeanContainer, ServerCall, ServerCallStatus} from 'react-app-common';
import ClientService from "../../service/ClientService";
import _ from 'lodash';

const styles = theme => ({
    sscMain: {
        paddingLeft: 230,
        paddingRight: 210,
        paddingTop: 20
    },
    sscAutocomplete: {
        width: '300px'
    }
});

class SearchSelectClient extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            autoCompleteOpen: false,
            serverCall: ServerCall.noOngoingCall([])
        };
        this.service = BeanContainer.get(ClientService);
    }

    static propTypes = {
        clientSelected: PropTypes.func.isRequired,
        searchParamName: PropTypes.string.isRequired,
        searchParamValue: PropTypes.any.isRequired
    }

    searchOpenHandler = () => {
        this.search('', (response) => {
            this.setState({serverCall: ServerCall.responseReceived(this.state.serverCall, response)});
        });
        this.setState({autoCompleteOpen: true, serverCall: ServerCall.serverCallMade(this.state.serverCall)});
    }

    search(q, cb) {
        this.service.search(q, this.props.searchParamName, this.props.searchParamValue).then(cb);
    }

    searchCloseHandler = () => {
        this.setState({autoCompleteOpen: false, options: []});
    }

    searchChangeHandler = (e) => {
        this.search(e.target.value, (response) => {
            this.setState({serverCall: ServerCall.responseReceived(this.state.serverCall, response)});
        });
        this.setState({serverCall: ServerCall.serverCallMade(this.state.serverCall)});
    }

    render() {
        const {
            classes,
            clientSelected
        } = this.props;

        const {serverCall, autoCompleteOpen} = this.state;

        return <Grid container className={classes.sscMain}>
            <Grid item lg={10}>
                <Autocomplete
                    className={classes.sscAutocomplete}
                    open={autoCompleteOpen}
                    onInputChange={this.searchChangeHandler}
                    onOpen={this.searchOpenHandler}
                    onClose={this.searchCloseHandler}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => `${option.name} - ${option.registrationNumber}`}
                    options={ServerCall.getData(serverCall)}
                    loading={serverCall.lastCallStatus === ServerCallStatus.WAITING}
                    onChange={(event, value) => clientSelected(_.isNil(value) ? null : value.id)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search clients"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {serverCall.lastCallStatus === ServerCallStatus.WAITING ? <CircularProgress color="inherit" size={20}/> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                )
                            }}
                        />
                    )}
                />
            </Grid>
        </Grid>;
    }
}

export default withStyles(styles)(SearchSelectClient);
