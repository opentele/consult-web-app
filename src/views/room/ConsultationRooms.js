import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ConsultAppBar from "../../components/ConsultAppBar";
import {AddCircle, Edit, History, Schedule, Today, AllInclusive} from '@mui/icons-material';
import {Box, Button, Card, CardActions, CardContent, Fab, Tab, Tabs, Typography} from "@material-ui/core";
import {Container} from 'react-app-common';
import ConsultationRoomService from "../../services/ConsultationRoomService";
import {i18n, UserType} from 'consult-app-common';
import {Alert} from "@mui/material";
import ConsultationRoomAvailabilityDetails from "../../domain/ConsultationRoomAvailabilityDetails";

const styles = theme => ({
    rooms: {
        margin: 30
    },
    conferenceBox: {
        marginTop: 15,
        padding: 10,
    },
    createRoom: {
        position: 'absolute',
        bottom: 16,
        right: 16
    },
    createRoomIcon: {
        marginRight: 10
    }
});

class ConsultationRooms extends Component {
    constructor(props, context) {
        super(props, context);
        this.setState = this.setState.bind(this);
        this.state = {consultationRooms: [], tabIndex: 1};
        this.tabActions = {
            0: () => {},
            1: this.getActiveRooms.bind(this),
            2: () => {},
            3: this.getAllConsultationSchedules.bind(this)
        }
    }

    componentDidMount() {
        this.getActiveRooms();
    }

    getActiveRooms() {
        Container.get(ConsultationRoomService).getActiveRooms((response) => {
            this.setState({consultationRooms: response.data});
        });
    }

    getAllConsultationSchedules() {
        Container.get(ConsultationRoomService).getConsultationSchedules((response) => {
            this.setState({consultationSchedules: response.data});
        });
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
        role: PropTypes.string.isRequired,
        user: PropTypes.object.isRequired
    };

    onTabChange() {
        return (event, tabId) => {
            this.setState({tabIndex: tabId, busy: true});
            this.tabActions[tabId]();
        }
    }

    render() {
        const {classes, role, user} = this.props;
        const {consultationRooms, tabIndex} = this.state;
        return <>
            <ConsultAppBar user={user}/>
            <br/>
            <Tabs value={tabIndex} onChange={this.onTabChange()}>
                <Tab icon={<History/>} label={i18n.t('past-consultations')}/>
                <Tab icon={<Today/>} label={i18n.t('active')}/>
                <Tab icon={<Schedule/>} label={i18n.t('scheduled-later')}/>
                <Tab icon={<AllInclusive/>} label={i18n.t('all-rooms')}/>
                {role === UserType.Consultant && <Fab variant="extended" size="medium" className={classes.createRoom}>
                    <AddCircle className={classes.createRoomIcon}/>
                    {i18n.t('create-new-room')}
                </Fab>}
            </Tabs>
            <Box className={classes.rooms}>
                {
                    consultationRooms.map((conference) => {
                        const alerts = ConsultationRoomAvailabilityDetails.getAlerts(conference);
                        const hasAction = ConsultationRoomAvailabilityDetails.hasVacancy(conference) || ConsultationRoomAvailabilityDetails.hasMoreClients(conference);
                        return <Card raised={true} elevation={3} className={classes.conferenceBox}>
                            <CardContent>
                                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} style={{width: '100%'}}>
                                    <Box sx={{display: "flex", flexDirection: "column"}}>
                                        <Box sx={{display: "flex", flexDirection: "row"}}>
                                            <Typography variant="h5" style={{marginRight: 10}}>{conference["name"]}</Typography>
                                            <Edit/>
                                        </Box>
                                        <Typography>{`Started: ${conference["started"]}`}</Typography>
                                        <Typography>{`Open Till: ${conference["toEnd"]}`}</Typography>
                                    </Box>
                                    <Box sx={{display: "flex", flexDirection: "column"}}>
                                        {alerts.map((alert) => <Alert sx={{alignSelf: "flex-start", m: 0.25}} severity={alert.type}>{alert.message}</Alert>)}
                                    </Box>
                                </Box>
                            </CardContent>
                            <CardActions>
                                {hasAction &&
                                ConsultationRoomAvailabilityDetails.getUsherActions(conference).map((action) => <Button variant="contained"
                                                                                                                        color="primary">{action}</Button>)}
                            </CardActions>
                        </Card>
                    })
                }
            </Box>
        </>;
    }
}

export default withStyles(styles)(ConsultationRooms);
