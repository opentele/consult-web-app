import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {CircularProgress, Grid, TextField} from "@mui/material";
import {Autocomplete} from "@mui/material";
import {ServerCall, ServerCallStatus} from "react-app-common";
import {i18n} from "consult-app-common";
import BaseView from "../views/framework/BaseView";
import ServerErrorMessage from "./ServerErrorMessage";

const styles = () => ({
    seMain: {
        paddingLeft: 230,
        paddingRight: 210,
        paddingTop: 20
    },
    seAutocomplete: {
        width: '400px'
    }
});

class SearchEntities extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            autoCompleteOpen: false,
            serverCall: ServerCall.createInitial({entities: []})
        };
    }

    static propTypes = {
        entitySelected: PropTypes.func.isRequired,
        searchFn: PropTypes.func.isRequired,
        displayFn: PropTypes.func.isRequired,
        autocompletePlaceholderMessageKey: PropTypes.string.isRequired
    }

    searchOpenHandler = () => {
        this.makeServerCall(this.search(''));
    }

    serverCallMade(serverCallName) {
        const newState = {};
        newState[serverCallName] = ServerCall.serverCallMade(this.state[serverCallName]);
        newState.autoCompleteOpen = true;
        this.setState(newState);
    }

    search(q) {
        return this.props.searchFn(q);
    }

    searchCloseHandler = () => {
        this.setState({autoCompleteOpen: false, options: []});
    }

    searchChangeHandler = (e) => {
        this.makeServerCall(this.search(e.target.value));
    }

    render() {
        const {
            classes,
            entitySelected,
            autocompletePlaceholderMessageKey,
            displayFn
        } = this.props;

        const {serverCall, autoCompleteOpen} = this.state;

        return <Grid container className={classes.seMain}>
            <Grid item lg={10}>
                <Autocomplete
                    className={classes.seAutocomplete}
                    open={autoCompleteOpen}
                    onInputChange={this.searchChangeHandler}
                    onOpen={this.searchOpenHandler}
                    onClose={this.searchCloseHandler}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => `${displayFn(option)}`}
                    options={ServerCall.hasFailed(serverCall) ? [] : ServerCall.getData(serverCall).entities}
                    loading={serverCall.callStatus === ServerCallStatus.WAITING}
                    onChange={(event, value) => entitySelected(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={i18n.t(autocompletePlaceholderMessageKey)}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {serverCall.callStatus === ServerCallStatus.WAITING ? <CircularProgress color="inherit" size={20}/> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                )
                            }}
                        />
                    )}
                />
                <ServerErrorMessage serverCall={serverCall}/>
            </Grid>
        </Grid>;
    }
}

export default withStyles(styles)(SearchEntities);
