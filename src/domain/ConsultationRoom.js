import _ from "lodash";
import Alert from "./Alert";
import {i18n} from "consult-app-common";

export const AllConsultationRoomActions = {
    addClient: 'add-client',
    viewMyClients: 'view-my-clients',
    joinConference: 'join-conference'
}

class ConsultationRoom {
    title;
    scheduledStartTime;
    scheduledEndTime;
    scheduledOn;
    totalSlots;
    numberOfClients;
    numberOfUserClients;
    numberOfClientsPending;
    numberOfUserClientsPending;
    nextClient;

    constructor() {
        this.days = [];
    }

    static toggleDay(room, day) {
        if (room.days.includes(day))
            _.remove(room.days, (x) => x === day);
        else
            room.days.push(day);
    }

    static getAlerts(room) {
        const alerts = [];
        if (this.hasMoreClients(room))
            alerts.push(Alert.info(i18n.t("conference-client-next", {client: room.nextClient})));

        if (room.numberOfUserClientsPending > 0)
            alerts.push(Alert.success(i18n.t("conference-all-clients-completed", {
                numberOfClientsCompleted: this.numberOfUserClientCompleted(room),
                numberOfClientsPending: room.numberOfUserClientsPending
            })));
        if (room.numberOfClients === 0)
            alerts.push(Alert.info(i18n.t("conference-no-client")));

        if (!this.hasVacancy(room))
            alerts.push(Alert.error(i18n.t("conference-no-vacancy")));

        return alerts;
    }

    static numberOfUserClientCompleted(room) {
        return room.numberOfUserClients - room.numberOfUserClientsPending;
    }

    static hasMoreClients(room) {
        let b = _.isEmpty(room.nextClient);
        return !b;
    }

    static hasVacancy(room) {
        return room.totalSlots - room.numberOfClients > 0;
    }

    static getUsherActions(room) {
        const actions = [];
        if (this.hasVacancy(room))
            actions.push(AllConsultationRoomActions.addClient);
        if (room.numberOfUserClients > 0) {
            actions.push(AllConsultationRoomActions.viewMyClients);
            actions.push(AllConsultationRoomActions.joinConference);
        }
        return actions;
    }

    static getConsultantActions(room) {
        const actions = [];
        if (this.hasVacancy(room))
            actions.push(i18n.t('add-client'));
        if (room.numberOfUserClients > 0) {
            actions.push(i18n.t('view-my-clients'));
            actions.push(i18n.t('start-conference'));
        }
        return actions;
    }
}

export default ConsultationRoom;
