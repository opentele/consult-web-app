import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, Grid, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import BaseView from "../framework/BaseView";
import {Autocomplete} from "@mui/material";
import {i18n} from "consult-app-common";

const styles = theme => ({
    container: {
        display: "grid",
        flexDirection: "column",
        alignItems: "center"
    },
    buttons: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

class SearchSelectClient extends BaseView {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {}

    render() {
        const {
            classes
        } = this.props;

        return <Grid container spacing={4}>
            <Grid item md={4} xs={1}/>
            <Grid item md={4} xs={10}>
                <Autocomplete
                    id="searchClient"
                    freeSolo
                    options={["abc", "efg"]}
                    renderInput={(params) => <TextField {...params} label={i18n.t("search-client")}/>}
                />
            </Grid>
            <Grid item md={4} xs={1}/>

            <Grid item md={4} xs={1}/>
            <Grid container md={4} xs={5} direction="row"
                  justifyContent="space-evenly"
                  alignItems="flex-start">
                <Button variant="contained" color="primary">{i18n.t("select")}</Button>
                <Button variant="contained" color="inherit">{i18n.t("cancel")}</Button>
            </Grid>
            <Grid item md={4} xs={1}/>
        </Grid>;
    }
}

export default withStyles(styles)(SearchSelectClient);
