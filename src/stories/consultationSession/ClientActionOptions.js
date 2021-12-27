import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Dialog, DialogTitle, List, ListItem, ListItemText} from '@material-ui/core';
import PropTypes from 'prop-types';
import {i18n} from "consult-app-common";

const styles = theme => ({
    container: {}
});

class ClientActionOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        clientName: PropTypes.string.isRequired
    }

    render() {
        const {
            classes,
            clientName
        } = this.props;

        return <Box className={classes.container}>
            <Dialog onClose={() => {}} open={true}>
                <DialogTitle>{clientName}</DialogTitle>
                <List sx={{pt: 0}}>
                    <ListItem button onClick={this.openRecordHandler()} key="openRecord">
                        <ListItemText primary={i18n.t("open-record")}/>
                    </ListItem>
                    <ListItem button onClick={this.startSessionHandler()} key="setCurrentClient">
                        <ListItemText primary={i18n.t("set-current-client")}/>
                    </ListItem>
                </List>
            </Dialog>
        </Box>;
    }

    openRecordHandler() {
        return undefined;
    }

    startSessionHandler() {
        return undefined;
    }
}

export default withStyles(styles)(ClientActionOptions);
