import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import ModalContainerView from "./ModalContainerView";
import {i18n} from "consult-app-common";
import {Box, Button, Typography} from "@mui/material";

const styles = theme => ({});

class ConfirmationBox extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        titleKey: PropTypes.string.isRequired,
        titleObj: PropTypes.string,
        detailedMessageKey: PropTypes.string.isRequired,
        onConfirmed: PropTypes.func.isRequired,
        onCancelled: PropTypes.func.isRequired
    };

    render() {
        const {titleKey, titleObj, detailedMessageKey, onCancelled, onConfirmed} = this.props;
        return <ModalContainerView titleKey={titleKey} titleObj={titleObj}>
            <Box style={{padding: 20}}>
                <Typography variant="h6">{i18n.t(detailedMessageKey)}</Typography>
                <Box style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 10}}>
                    <Button variant="contained" color="secondary" onClick={onCancelled} style={{marginRight: 5}}>{i18n.t('cancel')}</Button>
                    <Button variant="contained" color="primary" onClick={onConfirmed}>{i18n.t('confirm')}</Button>
                </Box>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(ConfirmationBox);
