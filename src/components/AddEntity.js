import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {Box, Button, Grid} from "@mui/material";
import _ from "lodash";
import {i18n} from "consult-app-common";
import CancelButton from "./CancelButton";
import ServerErrorMessage from "./ServerErrorMessage";

const styles = theme => ({
    addEntityMain: {
        marginBottom: 270
    },
    addEntityButtons: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    addEntitySelectButton: {
        marginRight: 10
    },
    addEntitySeparation: {
        marginTop: 300
    }
});

class AddEntity extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        entity: PropTypes.object,
        addEntityHandler: PropTypes.func.isRequired,
        messageClose: PropTypes.func.isRequired,
        serverCall: PropTypes.object
    };

    render() {
        const {classes, entity, addEntityHandler, messageClose, serverCall} = this.props;

        return <Grid container className={classes.addEntityMain}>
            <Grid item lg={10}>
                <Box className={classes.addEntityButtons}>
                    <Button disabled={_.isNil(entity)} variant="contained" color="primary" onClick={addEntityHandler}
                            className={classes.addEntitySelectButton}>{i18n.t("add-button")}</Button>
                    <CancelButton onClickHandler={messageClose}/>
                </Box>
            </Grid>
            <Grid item lg={10}>
                <ServerErrorMessage serverCall={serverCall}/>
            </Grid>
        </Grid>;
    }
}

export default withStyles(styles)(AddEntity);
