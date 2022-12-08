import {withStyles} from "@mui/styles";
import {Chip} from "@mui/material";
import React from "react";

const styles = theme => ({
    chip: {
        marginRight: 8,
        borderRadius: 4,
        backgroundColor: theme.palette.background.default
    }
});

function ProviderChip({provider, classes}) {
    return <Chip label={provider.name} key={provider.id} className={classes.chip}/>
}

export default withStyles(styles)(ProviderChip);
