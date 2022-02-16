import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ConsultationRoomAvailabilityDetails from "../../domain/ConsultationRoomAvailabilityDetails";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {Edit} from "@mui/icons-material";
import {Alert} from "@mui/material";
import {Container, ResponseUtil} from "react-app-common";
import ConsultationRoomService from "../../services/ConsultationRoomService";
import BaseView from "../framework/BaseView";
import TimeField from "../../components/TimeField";

const styles = theme => ({
    rooms: {
        margin: 30
    },
    conferenceBox: {
        marginTop: 15,
        padding: 10,
    }
});

const functionNames = {
    today: "getTodayRooms"
}

class ConsultationRooms extends BaseView {
    constructor(props, context) {
        super(props, context);
    }

    static props = {
        type: PropTypes.string.isRequired
    };

    componentDidMount() {
        const service = Container.get(ConsultationRoomService);
        service[functionNames[this.props.type]]((response) => {
            this.setState({response: response});
        });
    }

    render() {
        const {response} = this.state;
        if (ResponseUtil.errorOrWait(response))
            return this.renderForErrorOrWait(response);

        const {classes} = this.props;
        const consultationRooms = this.state.response.data;

        return <Box className={classes.rooms}>
            {
                consultationRooms.map((consultationRoom) => {
                    const alerts = ConsultationRoomAvailabilityDetails.getAlerts(consultationRoom);
                    const hasAction = ConsultationRoomAvailabilityDetails.hasVacancy(consultationRoom) || ConsultationRoomAvailabilityDetails.hasMoreClients(consultationRoom);
                    return <Card raised={true} elevation={3} className={classes.conferenceBox}>
                        <CardContent>
                            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} style={{width: '100%'}}>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <Box sx={{display: "flex", flexDirection: "row"}}>
                                        <Typography variant="h5" style={{marginRight: 10}}>{consultationRoom.title}</Typography>
                                        <Edit/>
                                    </Box>
                                    <TimeField value={consultationRoom.scheduledStartTime} label="Start time"/>
                                    <TimeField value={consultationRoom.scheduledEndTime} label="End time"/>
                                </Box>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    {alerts.map((alert) => <Alert sx={{alignSelf: "flex-start", m: 0.25}} severity={alert.type}>{alert.message}</Alert>)}
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions>
                            {hasAction &&
                            ConsultationRoomAvailabilityDetails.getUsherActions(consultationRoom).map((action) => <Button variant="contained"
                                                                                                                          color="primary">{action}</Button>)}
                        </CardActions>
                    </Card>
                })
                }
                </Box>;
            }
            }

    export
    default

    withStyles(styles)

(
    ConsultationRooms
)
    ;
