import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Box, Fab, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Paper} from '@material-ui/core';
import {Add, ArrowCircleDown, ArrowCircleUp, Person, VideoCall as VideoCallIcon} from '@mui/icons-material';
import PropTypes from 'prop-types';
import {i18n} from "consult-app-common";
import _ from 'lodash';
import {Link} from "react-router-dom";
import {ListItemButton} from "@mui/material";
import ModalStatus from "../../views/framework/ModalStatus";
import AddClient from "../../views/client/AddClient";
import BaseView from "../../views/framework/BaseView";
import ConsultationRoom from "../../domain/ConsultationRoom";

const styles = theme => ({
    root: {
        width: '100%',
    },
    addClient: {
        alignSelf: "flex-end"
    },
    crqContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 20,
        marginBottom: 100
    },
    crqActivePatient: {
        backgroundColor: "lightsteelblue"
    },
    crqPatient: {
    }
});

class ConsultationRoomQueue extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            clientMenuAnchor: null,
            selectedAppointment: null,
            addClientModalStatus: ModalStatus.NOT_OPENED
        }
    }

    static propTypes = {
        consultationRoom: PropTypes.object.isRequired,
        containerClassName: PropTypes.string,
        onDataChanged: PropTypes.func.isRequired
    }

    getCloseClientMenuHandler() {
        return (e) => {
            this.setState({clientMenuAnchor: null})
        }
    }

    refresh() {
        this.props.onDataChanged();
    }

    render() {
        const {
            classes,
            consultationRoom,
            containerClassName
        } = this.props;

        const {clientMenuAnchor, selectedAppointment, addClientModalStatus} = this.state;

        return (
            <Paper className={[classes.crqContainer, containerClassName]} elevation={2}>
                <Box>
                    <h4>Patients</h4>
                    <List>
                        {
                            consultationRoom.appointments.map((appointment, index, arr) => {
                                const className = appointment.current ? [classes.crqPatient, classes.crqActivePatient] : classes.crqPatient;
                                return <ListItem className={className}
                                                 onClick={(e) => this.setState({clientMenuAnchor: e.currentTarget, selectedAppointment: appointment})}>
                                    <ListItemButton style={{marginLeft: -15}}>
                                        <ListItemIcon>
                                            <Person/>
                                        </ListItemIcon>
                                        <ListItemText primary={appointment.clientName} style={{marginLeft: -25}}/>
                                    </ListItemButton>
                                    {appointment.active &&
                                    <ListItemIcon>
                                        <VideoCallIcon/>
                                    </ListItemIcon>}
                                    {index !== 0 && <ArrowCircleUp/>}
                                    {index !== (arr.length - 1) && <ArrowCircleDown/>}
                                </ListItem>;
                            })
                        }
                    </List>
                    {!_.isNil(clientMenuAnchor) && <Menu anchorEl={clientMenuAnchor} open={true} onClose={this.getCloseClientMenuHandler()}
                                                         anchorOrigin={{
                                                             vertical: 'top',
                                                             horizontal: 'left',
                                                         }}
                                                         transformOrigin={{
                                                             vertical: 'top',
                                                             horizontal: 'left',
                                                         }}>
                        <MenuItem onClick={this.getCloseClientMenuHandler()}>{i18n.t('set-as-active-client')}</MenuItem>
                        <MenuItem component={Link} to={`/client?id=${selectedAppointment.clientId}`}>{i18n.t('open-client-record')}</MenuItem>
                    </Menu>}
                </Box>
                <Box className={classes.addClient}>
                    <Fab color="primary" variant="extended" onClick={this.getModalOpenHandler("addClientModalStatus")}>
                        <Add/>{`${i18n.t('add-client')}`}
                    </Fab>
                </Box>
                {addClientModalStatus === ModalStatus.OPENED &&
                <AddClient messageClose={this.getModalCloseHandler("addClientModalStatus")} consultationRoom={consultationRoom}
                           autocompletePlaceholderMessageKey="search-client-autocomplete-placeholder"/>}
            </Paper>
        );
    }
}

export default withStyles(styles)(ConsultationRoomQueue);
