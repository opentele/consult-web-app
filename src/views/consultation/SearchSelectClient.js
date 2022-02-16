import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, Grid, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import BaseView from "../framework/BaseView";
import {Autocomplete} from "@mui/material";
import {i18n} from "consult-app-common";

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
        justifyContent: "center"
    }
});

class SearchSelectClient extends BaseView {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired
    }

    render() {
        const {
            classes,
            messageClose
        } = this.props;

        return <Grid container className={classes.sscMain}>
            <Grid item lg={10}>
                <Autocomplete
                    fullWidth={true}
                    freeSolo
                    options={["abc", "efg"]}
                    renderInput={(params) => <TextField {...params} label={i18n.t("search-client")}/>}
                />
            </Grid>
            <Grid item lg={10}>
                <Box className={classes.sscButtons}>
                    <Button variant="contained" color="primary">{i18n.t("select")}</Button>
                    <Button variant="contained" color="inherit" onClick={messageClose}>{i18n.t("cancel")}</Button>
                </Box>
            </Grid>
            <Grid item lg={10} className={classes.sscSeparation}/>
        </Grid>;
    }
}

export default withStyles(styles)(SearchSelectClient);
