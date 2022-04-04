import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, CircularProgress, Fab, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Typography} from '@material-ui/core';
import {Add, ArrowCircleDown, ArrowCircleUp, Person, VideoCall as VideoCallIcon} from '@mui/icons-material';
import PropTypes from 'prop-types';
import {i18n} from "consult-app-common";
import _ from 'lodash';
import {Link} from "react-router-dom";
import {ListItemButton} from "@mui/material";
import ModalStatus from "../../views/framework/ModalStatus";
import AddClient from "../../views/client/AddClient";
import BaseView from "../../views/framework/BaseView";
import {ServerCall, ServerCallStatus} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";

const styles = theme => ({
    root: {
        width: '100%',
    },
    addClient: {
        alignSelf: "flex-end",
        marginBottom: 20,
        marginTop: 20,
        marginRight: 10
    },
    crqContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 0
    }
});

class ConsultationRoomQueue extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            clientMenuAnchor: null,
            selectedAppointment: null,
            addClientModalStatus: ModalStatus.NOT_OPENED,
            moveClientCall: ServerCall.createInitial(),
            setAsCurrentCall: ServerCall.createInitial()
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

    getMoveClientHandler(direction, appointment) {
        return () => this.makeServerCall(ConsultationRoomService.moveClientInQueue(direction, this.props.consultationRoom, appointment), "moveClientCall");
    }

    getSetAsCurrentClientHandler(appointment) {
        return () => this.makeServerCall(ConsultationRoomService.setAsCurrentAppointment(this.props.consultationRoom, appointment), )
    }

    refresh() {
        this.props.onDataChanged();
    }

    onSuccessfulServerCall(serverCallName) {
        this.props.onDataChanged();
    }

    render() {
        const {
            classes,
            consultationRoom,
            containerClassName
        } = this.props;

        const {clientMenuAnchor, selectedAppointment, addClientModalStatus, moveClientCall, setAsCurrentCall} = this.state;

        const movingClient = moveClientCall.callStatus === ServerCallStatus.WAITING;

        return (
            <Box className={containerClassName}>
                <Typography variant="h5">{i18n.t('client-queue-title')}</Typography>
                <Paper className={classes.crqContainer} elevation={0}>
                    <Box>
                        <List dense={true}>
                            {
                                consultationRoom.appointments.map((appointment, index, arr) => {
                                    return <ListItem>
                                        <ListItemButton selected={appointment.current}
                                                        onClick={(e) => this.setState({clientMenuAnchor: e.currentTarget, selectedAppointment: appointment})}>
                                            <ListItemIcon>
                                                <Person/>
                                            </ListItemIcon>
                                            <ListItemText primary={appointment.clientName}/>
                                        </ListItemButton>
                                        {appointment.active &&
                                        <ListItemIcon>
                                            <VideoCallIcon/>
                                        </ListItemIcon>}
                                        {index !== 0 && (movingClient ? <CircularProgress color="inherit"/> :
                                            <ArrowCircleUp onClick={this.getMoveClientHandler("previous", appointment)}/>)}
                                        {index !== (arr.length - 1) && (movingClient ? <CircularProgress color="inherit"/> :
                                            <ArrowCircleDown onClick={this.getMoveClientHandler("next", appointment)}/>)}
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
                            <MenuItem onClick={this.getSetAsCurrentClientHandler(selectedAppointment)}>{i18n.t('set-as-active-client')}</MenuItem>
                            <MenuItem component={Link} to={`/client?id=${selectedAppointment.clientId}`}>{i18n.t('open-client-record')}</MenuItem>
                        </Menu>}
                    </Box>
                    <Box className={classes.addClient}>
                        <Button variant="text" color="primary" onClick={this.getModalOpenHandler("addClientModalStatus")}>
                            {`${i18n.t('add-client')}`}
                        </Button>
                    </Box>
                    {addClientModalStatus === ModalStatus.OPENED &&
                    <AddClient messageClose={this.getModalCloseHandler("addClientModalStatus")} consultationRoom={consultationRoom}
                               autocompletePlaceholderMessageKey="search-client-autocomplete-placeholder"/>}
                </Paper>
            </Box>
        );
    }
}

export default withStyles(styles)

(
    ConsultationRoomQueue
)
;
