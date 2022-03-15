import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {AddCircle, AllInclusive, History, Schedule, Today} from '@mui/icons-material';
import {Fab, Tab, Tabs} from "@material-ui/core";
import {BeanContainer} from 'react-app-common';
import ConsultationRoomService from "../../service/ConsultationRoomService";
import {i18n} from 'consult-app-common';
import ConsultationRooms from "./ConsultationRooms";
import ModalStatus from "../framework/ModalStatus";
import CreateEditConsultationRoom from "./CreateEditConsultationRoom";
import BaseView from "../framework/BaseView";
import ContainerView from "../framework/ContainerView";

const styles = theme => ({
    createRoom: {
        position: 'absolute',
        bottom: 16,
        right: 16
    },
    createRoomIcon: {
        marginRight: 10
    }
});

class Home extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.setState = this.setState.bind(this);
        this.state = {consultationRooms: [], tabIndex: 1};
        this.tabComponents = {
            0: () => <ConsultationRooms type="today"/>,
            1: () => <ConsultationRooms type="today"/>,
            2: () => <ConsultationRooms type="today"/>,
            3: () => <></>
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
        const {tabIndex, oneTimeConsultationRoomStatus} = this.state;
        return <ContainerView activeTab="home">
            <br/>
            <Tabs value={tabIndex} onChange={this.onTabChange()}>
                <Tab icon={<History/>} label={i18n.t('past-consultations')}/>
                <Tab icon={<Today/>} label={i18n.t('today')}/>
                <Tab icon={<Schedule/>} label={i18n.t('scheduled-later')}/>
                <Tab icon={<AllInclusive/>} label={i18n.t('all-rooms')}/>
                {<Fab variant="extended" size="medium" className={classes.createRoom} onClick={this.getModalOpenHandler("oneTimeConsultationRoomStatus")}>
                    <AddCircle className={classes.createRoomIcon}/>
                    {i18n.t('create-one-time-room')}
                </Fab>}
            </Tabs>
            {this.tabComponents[tabIndex]()}
            {oneTimeConsultationRoomStatus === ModalStatus.OPENED &&
            <CreateEditConsultationRoom messageClose={this.getModalCloseHandler("oneTimeConsultationRoomStatus")}/>}
        </ContainerView>;
    }
}

export default withStyles(styles)(Home);
