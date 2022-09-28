import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {AddCircle, AllInclusive, History, Schedule, Today} from '@mui/icons-material';
import {Fab, IconButton, Tab, Tabs} from "@mui/material";
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
import CreateEditConsultationRoom from "./CreateEditConsultationRoom";
import TabState from "../../state/TabState";

const styles = theme => ({
    createRoom: {
        position: 'absolute',
        width: 200,
        right: 16
    },
    createRoomSchedule: {
        position: 'absolute',
        width: 160,
        right: 225
    },
    createRoomIcon: {
        marginRight: 10
    }
});

class Home extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.setState = this.setState.bind(this);
        this.state = {
            tabState: TabState.initialState(1, ["past", "today", "future", "schedules"]),
            scheduleConsultationRoom: ModalStatus.NOT_OPENED,
            createConsultationRoom: ModalStatus.NOT_OPENED
        };
        this.tabComponents = {
            0: (updateIndex) => <ConsultationRooms type="past" key={updateIndex}/>,
            1: (updateIndex) => <ConsultationRooms type="today" key={updateIndex}/>,
            2: (updateIndex) => <ConsultationRooms type="future" key={updateIndex}/>,
            3: (updateIndex) => <ConsultationRoomSchedules key={updateIndex}/>
        }
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    };

    onTabChange(tabId) {
        this.state.tabState.tabChanged(tabId);
        this.setState({tabState: this.state.tabState.clone(), busy: true});
    }

    refresh(stateFieldChanged) {
        this.state.tabState.tabDataChanged();
        this.setState({tabState: this.state.tabState.clone()});
    }

    render() {
        const {classes} = this.props;
        const {tabState, scheduleConsultationRoom, createConsultationRoom} = this.state;
        const getTabComponent = this.tabComponents[tabState.tabIndex];
        const key = tabState.getCurrentUpdateIndex();

        return _.isEmpty(GlobalContext.getOrganisation()) ?
            <NoOrganisationView onOrgRegistered={() => this.setState(Object.assign({}, this.state))}/>
            :
            <ContainerView activeTab="home" onRefresh={() => this.refresh()}>
                {scheduleConsultationRoom === ModalStatus.OPENED &&
                <AddEditConsultationSchedule messageClose={this.getModalCloseHandler("scheduleConsultationRoom")}/>}

                {createConsultationRoom === ModalStatus.OPENED && <CreateEditConsultationRoom
                    messageClose={this.getModalCloseHandler("createConsultationRoom")}/>}
                <br/>
                <Tabs value={tabState.tabIndex} onChange={(event, tabId) => this.onTabChange(tabId)}>
                    <Tab icon={<IconButton><History/></IconButton>} label={i18n.t('past-consultations')}/>
                    <Tab icon={<IconButton><Today/></IconButton>} label={i18n.t('today')}/>
                    <Tab icon={<IconButton><Schedule/></IconButton>} label={i18n.t('scheduled-later')}/>
                    <Tab icon={<IconButton><AllInclusive/></IconButton>} label={i18n.t('all-scheduled-rooms')}/>
                    <Fab variant="extended" size="medium" className={classes.createRoom}
                         onClick={() => this.onModalOpen("createConsultationRoom")}>
                        <AddCircle className={classes.createRoomIcon}/>
                        {i18n.t('start-new-room')}
                    </Fab>
                    <Fab variant="extended" size="medium" className={classes.createRoomSchedule}
                         onClick={() => this.onModalOpen("scheduleConsultationRoom")}>
                        <AddCircle className={classes.createRoomIcon}/>
                        {i18n.t('schedule')}
                    </Fab>
                </Tabs>
                {getTabComponent(key)}
            </ContainerView>;
    }
}

export default withStyles(styles)(Home);
