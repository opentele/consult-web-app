import _ from "lodash";
import Alert from "./Alert";
import {i18n} from "consult-app-common";
import GlobalContext from "../framework/GlobalContext";
import {ProviderType} from 'consult-app-common';
import moment from 'moment';

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
        const user = GlobalContext.getUser();
        const alerts = [];
        if (this.hasMoreClients(room) && user["providerType"] === ProviderType.Usher)
            alerts.push(Alert.info(i18n.t("conference-client-next", {client: room.nextClient})));

        if (room.numberOfUserClientsPending > 0 && user["providerType"] === ProviderType.Usher)
            alerts.push(Alert.success(i18n.t("conference-all-clients-completed", {
                numberOfClientsCompleted: this.numberOfUserClientCompleted(room),
                numberOfClientsPending: room.numberOfUserClientsPending
            })));
        if (!this.hasVacancy(room) && user["providerType"] === ProviderType.Usher)
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

    static isInPast(room) {
        return moment(room.scheduledOn).startOf('day').isBefore(moment().startOf('day'));
    }

    static hasVacancy(room) {
        return !this.isInPast(room) && (room.totalSlots - room.numberOfClients > 0);
    }

    static canAddClient(room) {
        return this.hasVacancy(room);
    }

    static canViewClients(room) {
        return GlobalContext.getUser().providerType === ProviderType.Consultant ? (room.numberOfClients > 0) : (room.numberOfUserClients > 0);
    }

    static canJoinConference(room) {
        return (!this.isInPast(room)) && (GlobalContext.getUser().providerType === ProviderType.Consultant ? (room.numberOfClientsPending > 0) : (room.numberOfUserClientsPending > 0));
    }
}

export default ConsultationRoom;
