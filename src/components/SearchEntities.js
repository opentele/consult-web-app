import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {CircularProgress, Grid, TextField} from "@material-ui/core";
import {Autocomplete} from "@mui/material";
import {ServerCall, ServerCallStatus} from "react-app-common";
import {i18n} from "consult-app-common";

const styles = () => ({
    seMain: {
        paddingLeft: 230,
        paddingRight: 210,
        paddingTop: 20
    },
    seAutocomplete: {
        width: '300px'
    }
});

class SearchEntities extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            autoCompleteOpen: false,
            serverCall: ServerCall.createInitial([])
        };
    }

    static propTypes = {
        entitySelected: PropTypes.func.isRequired,
        searchParamName: PropTypes.string,
        searchParamValue: PropTypes.any,
        searchFn: PropTypes.func.isRequired,
        autocompletePlaceholderMessageKey: PropTypes.string.isRequired
    }

    searchOpenHandler = () => {
        this.makeDefaultServerCall(this.search(''), {autoCompleteOpen: true});
    }

    search(q) {
        return this.props.searchFn(q, this.props.searchParamName, this.props.searchParamValue);
    }

    searchCloseHandler = () => {
        this.setState({autoCompleteOpen: false, options: []});
    }

    searchChangeHandler = (e) => {
        this.makeDefaultServerCall(this.search(e.target.value));
    }

    render() {
        const {
            classes,
            entitySelected,
            autocompletePlaceholderMessageKey
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
                    getOptionLabel={(option) => `${option.name} - ${option.registrationNumber}`}
                    options={ServerCall.getData(serverCall)}
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
            </Grid>
        </Grid>;
    }}

export default withStyles(styles)(SearchEntities);
