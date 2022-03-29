import _ from "lodash";
import Alert from "./Alert";
import {i18n} from "consult-app-common";
import GlobalContext from "../framework/GlobalContext";
import {ProviderType} from 'consult-app-common';
import moment from 'moment';

class ConsultationRoom {
    id;
    title;
    scheduledStartTime;
    scheduledEndTime;
    scheduledOn;
    totalSlots;
    numberOfClients;
    numberOfUserClients;
    numberOfClientsPending;
    numberOfUserClientsPending;
    providers;
    appointments;
    activeTeleConferenceId;

    static isNew(room) {
        return !(room.id > 0);
    }

    static getAlerts(room) {
        const user = GlobalContext.getUser();
        const alerts = [];
        if (this.hasMoreClients(room) && user["providerType"] === ProviderType.Usher)
            alerts.push(Alert.info(i18n.t("conference-client-next", {client: ConsultationRoom.getCurrentClientName(room)})));

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
        const currentAppointment = this.getCurrentAppointment(room);
        return _.some(room.appointments, (app) => app.queueNumber > currentAppointment.queueNumber);
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

    static getDisplayTitle(room) {
        return `${room.title} - ${moment(room.scheduledOn).format("DD MMM")}`
    }

    static getProviderIds(room) {
        return room.providers.map((x) => x.id);
    }

    static getProvider(room, providerId) {
        return _.find(room.providers, (x) => x.id === providerId);
    }

    static setProviders(room, providerIds, allProviders) {
        room.providers = providerIds.map((providerId) => _.find(allProviders, (x) => x.id === providerId));
    }

    static isFirstClientActive(room) {
        return _.first(room.appointments).current;
    }

    static isLastClientActive(room) {
        return _.last(room.appointments).current;
    }

    static getCurrentAppointment(room) {
        return _.find(room.appointments, (app) => app.current);
    }

    static getCurrentClientName(room) {
        const currentAppointment = this.getCurrentAppointment(room);
        return _.isNil(currentAppointment) ? i18n.t('no-active-client') : currentAppointment.clientName;
    }

    static getCurrentClientId(room) {
        const currentAppointment = this.getCurrentAppointment(room);
        return currentAppointment.clientId;
    }
}

export default ConsultationRoom;
