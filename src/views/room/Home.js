import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {AddCircle, AllInclusive, History, Schedule, Today} from '@mui/icons-material';
import {Fab, IconButton, Tab, Tabs} from "@mui/material";
import {BeanContainer} from 'react-app-common';
import ConsultationRoomService from "../../service/ConsultationRoomService";
import {i18n} from 'consult-app-common';
import ConsultationRooms from "./ConsultationRooms";
import BaseView from "../framework/BaseView";
import ContainerView from "../framework/ContainerView";
import ConsultationRoomSchedules from "./ConsultationRoomSchedules";
import GlobalContext from "../../framework/GlobalContext";
import NoOrganisationView from "../access/NoOrganisationView";
import _ from 'lodash';
import AddEditConsultationSchedule from "./AddEditConsultationSchedule";
import ModalStatus from "../framework/ModalStatus";

const styles = theme => ({
    createRoom: {
        position: 'absolute',
        width: 200,
        right: 16
    },
    createRoomSchedule: {
        position: 'absolute',
        width: 160,
        right: 220
    },
    createRoomIcon: {
        marginRight: 10
    }
});

class Home extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.setState = this.setState.bind(this);
        this.state = {consultationRooms: [], tabIndex: 1, scheduleConsultationRoom: ModalStatus.NOT_OPENED};
        this.tabComponents = {
            0: () => <ConsultationRooms type="past"/>,
            1: () => <ConsultationRooms type="today"/>,
            2: () => <ConsultationRooms type="future"/>,
            3: () => <ConsultationRoomSchedules/>
        }
    }

    componentDidMount() {
        this.getActiveRooms();
    }

    getActiveRooms() {

    }

    getAllConsultationSchedules() {
        return BeanContainer.get(ConsultationRoomService).getConsultationSchedules().then((response) => {
            this.setState({consultationSchedules: response.data});
        });
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    };

    onTabChange() {
        return (event, tabId) => {
            this.setState({tabIndex: tabId, busy: true});
        }
    }

    render() {
        const {classes} = this.props;
        const {tabIndex, scheduleConsultationRoom} = this.state;
        return _.isEmpty(GlobalContext.getOrganisation()) ?
            <NoOrganisationView onOrgRegistered={() => this.setState(Object.assign({}, this.state))}/>
            :
            <ContainerView activeTab="home">
                {scheduleConsultationRoom === ModalStatus.OPENED && <AddEditConsultationSchedule
                    messageClose={this.getModalCloseHandler("scheduleConsultationRoom")}/>}
                <br/>
                <Tabs value={tabIndex} onChange={this.onTabChange()}>
                    <Tab icon={<IconButton><History/></IconButton>} label={i18n.t('past-consultations')}/>
                    <Tab icon={<IconButton><Today/></IconButton>} label={i18n.t('today')}/>
                    <Tab icon={<IconButton><Schedule/></IconButton>} label={i18n.t('scheduled-later')}/>
                    <Tab icon={<IconButton><AllInclusive/></IconButton>} label={i18n.t('all-rooms')}/>
                    <Fab variant="extended" size="medium" className={classes.createRoom}
                         onClick={() => this.onModalOpen("oneTimeConsultationRoomStatus")}>
                        <AddCircle className={classes.createRoomIcon}/>
                        {i18n.t('start-new-room')}
                    </Fab>
                    <Fab variant="extended" size="medium" className={classes.createRoomSchedule}
                         onClick={() => this.onModalOpen("scheduleConsultationRoom")}>
                        <AddCircle className={classes.createRoomIcon}/>
                        {i18n.t('schedule')}
                    </Fab>
                </Tabs>
                {this.tabComponents[tabIndex]()}
            </ContainerView>;
    }
}

export default withStyles(styles)(Home);
