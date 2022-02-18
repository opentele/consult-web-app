import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, CircularProgress, Grid, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import BaseView from "../framework/BaseView";
import {Autocomplete} from "@mui/material";
import {i18n} from "consult-app-common";
import {Container, ResponseUtil} from 'react-app-common';
import ClientService from "../../service/ClientService";

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
            loading: false,
            searchResponse: ResponseUtil.getOkResponse([])
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired
    }

    componentDidMount() {
        if (this.state.loading)
            Container.get(ClientService).search('', (response) => {
                this.setState({searchResponse: response});
            });
    }

    render() {
        const {
            classes,
            messageClose
        } = this.props;

        const {searchResponse, loading} = this.state;
        const {autoCompleteOpen} = this.state;

        return <Grid container className={classes.sscMain}>
            <Grid item lg={10}>
                <Autocomplete
                    open={autoCompleteOpen}
                    onOpen={() => this.setState({autoCompleteOpen: true, loading: true})}
                    onClose={() => {
                        this.setState({autoCompleteOpen: false, options: []});
                    }}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    getOptionLabel={(option) => option.name}
                    options={searchResponse.data}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search clients"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20}/> : null}
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
                    <Button variant="contained" color="primary" className={classes.sscSelectButton}>{i18n.t("select")}</Button>
                    <Button variant="contained" color="inherit" onClick={messageClose}>{i18n.t("cancel")}</Button>
                </Box>
            </Grid>
            <Grid item lg={10} className={classes.sscSeparation}/>
        </Grid>;
    }
}

export default withStyles(styles)(SearchSelectClient);
