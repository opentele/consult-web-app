import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, Grid} from "@material-ui/core";
import _ from "lodash";
import {i18n} from "consult-app-common";
import {ServerCallStatus} from "react-app-common";
import ErrorAlert from "./ErrorAlert";

const styles = theme => ({
    addEntityMain: {
        paddingLeft: 230,
        paddingRight: 210,
        paddingTop: 20,
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
        serverCallStatus: PropTypes.object
    };

    render() {
        const {classes, entity, addEntityHandler, messageClose, serverCallStatus} = this.props;

        return <Grid container className={classes.addEntityMain}>
            <Grid item lg={10}>
                <Box className={classes.addEntityButtons}>
                    <Button disabled={_.isNil(entity)} variant="contained" color="primary" onClick={addEntityHandler}
                            className={classes.addEntitySelectButton}>{i18n.t("select")}</Button>
                    <Button variant="contained" color="inherit" onClick={() => messageClose(false)}>{i18n.t("cancel")}</Button>
                </Box>
            </Grid>
            <Grid item lg={10}>
                {serverCallStatus === ServerCallStatus.FAILURE && <ErrorAlert title={'unexpected-error-title'} message={'unexpected-error-message'}/>}
            </Grid>
        </Grid>;
    }
}

export default withStyles(styles)(AddEntity);
