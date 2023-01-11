import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {Box, Button, Grid} from "@mui/material";
import _ from "lodash";
import {i18n} from "consult-app-common";
import CancelButton from "./CancelButton";
import ServerErrorMessage from "./ServerErrorMessage";
import {ActionButton} from "./ConsultButtons";
import {Add} from "@mui/icons-material";

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
        serverCall: PropTypes.object,
        cancelButtonTextKey: PropTypes.string
    };

    render() {
        const {classes, entity, addEntityHandler, messageClose, serverCall, cancelButtonTextKey} = this.props;

        return <Grid container className={classes.addEntityMain}>
            <Grid item lg={10}>
                <Box className={classes.addEntityButtons}>
                    <ActionButton show={true} serverCall={serverCall} className={classes.addEntitySelectButton} Icon={Add} onClick={addEntityHandler}
                                  variant="contained" displayKey="add-button" disabled={_.isNil(entity)}/>
                    <CancelButton onClickHandler={messageClose} cancelButtonTextKey={cancelButtonTextKey}/>
                </Box>
            </Grid>
            <Grid item lg={10}>
                <ServerErrorMessage serverCall={serverCall}/>
            </Grid>
        </Grid>;
    }
}

export default withStyles(styles)(AddEntity);
