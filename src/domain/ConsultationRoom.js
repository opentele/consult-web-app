import _ from "lodash";
import Alert from "./Alert";
import {AbstractEntity, i18n} from "consult-app-common";
import GlobalContext from "../framework/GlobalContext";
import {ProviderType} from 'consult-app-common';
import moment from 'moment';
import Provider from "./Provider";
import Appointment from "./Appointment";
import {DateTimeUtil, ServerCall} from "react-app-common";

class ConsultationRoom extends AbstractEntity {
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

    static newRoom() {
        const consultationRoom = new ConsultationRoom();
        consultationRoom.providers = [];
        consultationRoom.appointments = [];
        consultationRoom.scheduledOn = DateTimeUtil.today();
        consultationRoom.scheduledStartTime = DateTimeUtil.time();
        consultationRoom.scheduledEndTime = DateTimeUtil.time(moment().add(2, "hours"));
        return consultationRoom;
    }

    static entityFromServerCall(serverCall) {
        return this.fromServerResource(ServerCall.getData(serverCall));
    }

    static fromServerResource(resource) {
        const consultationRoom = new ConsultationRoom();
        AbstractEntity.fromOther(resource, consultationRoom);
        AbstractEntity.copyFields(resource, consultationRoom,
            ["title", "scheduledStartTime", "scheduledEndTime", "scheduledOn", "totalSlots", "numberOfClients", "numberOfUserClients", "numberOfClientsPending", "numberOfUserClientsPending", "activeTeleConferenceId"]);
        consultationRoom.providers = Provider.fromResources(resource.providers);
        consultationRoom.appointments = Appointment.fromResources(resource.appointments);
        return consultationRoom;
    }

    static fromServerResources(resources) {
        if (_.isNil(resources)) return [];
        return resources.map(ConsultationRoom.fromServerResource);
    }

    getAlerts() {
        const user = GlobalContext.getUser();
        const alerts = [];
        if (this.hasMoreClients() && user["providerType"] === ProviderType.Usher)
            alerts.push(Alert.info(i18n.t("conference-client-next", {client: this.getCurrentClientName()})));

        if (this.numberOfUserClientsPending > 0 && user["providerType"] === ProviderType.Usher)
            alerts.push(Alert.success(i18n.t("conference-all-clients-completed", {
                numberOfClientsCompleted: this.numberOfUserClientCompleted(),
                numberOfClientsPending: this.numberOfUserClientsPending
            })));
        if (!this.hasVacancy() && user["providerType"] === ProviderType.Usher)
            alerts.push(Alert.error(i18n.t("conference-no-vacancy")));

        return alerts;
    }

    numberOfUserClientCompleted() {
        return this.numberOfUserClients - this.numberOfUserClientsPending;
    }

    hasMoreClients() {
        const currentAppointment = this.getCurrentAppointment();
        return _.some(this.appointments, (app) => app.queueNumber > currentAppointment.queueNumber);
    }

    isInPast() {
        return moment(this.scheduledOn).startOf('day').isBefore(moment().startOf('day'));
    }

    hasVacancy() {
        return !this.isInPast() && (this.totalSlots - this.numberOfClients > 0);
    }

    canAddClient() {
        return this.hasVacancy();
    }

    canViewClients() {
        return GlobalContext.getUser().providerType === ProviderType.Consultant ? (this.numberOfClients > 0) : (this.numberOfUserClients > 0);
    }

    canJoinConference() {
        return (!this.isInPast()) && (GlobalContext.getUser().providerType === ProviderType.Consultant ?
            (this.numberOfClientsPending > 0) : (this.numberOfUserClientsPending > 0));
    }

    getDisplayTitle() {
        return `${this.title} - ${moment(this.scheduledOn).format("DD MMM")}`
    }

    isFirstClientActive() {
        return _.first(this.appointments).current;
    }

    isLastClientActive() {
        return _.last(this.appointments).current;
    }

    getCurrentAppointment() {
        return _.find(this.appointments, (app) => app.current);
    }

    getCurrentClientName() {
        const currentAppointment = this.getCurrentAppointment();
        return _.isNil(currentAppointment) ? i18n.t('no-active-client') : currentAppointment.clientName;
    }

    getCurrentClientId() {
        const currentAppointment = this.getCurrentAppointment();
        return currentAppointment.clientId;
    }

    getProvidersDisplayForClient() {
        return this.providers.map((x) => x.providerClientDisplay).join(". ");
    }

    validate() {
        const errors = {};
        if (_.isEmpty(this.title)) errors["title"] = "mandatory-field";
        if (_.isNil(this.scheduledOn)) errors["scheduledOn"] = "mandatory-field";
        if (_.isNil(this.scheduledStartTime)) errors["scheduledStartTime"] = "mandatory-field";
        if (_.isNil(this.scheduledEndTime)) errors["scheduledEndTime"] = "mandatory-field";

        if (_.isNil(this.totalSlots)) errors["totalSlots"] = "mandatory-field";
        else if (this.totalSlots <= 0) errors["totalSlots"] = "cannot-be-less-than-zero";
        return errors;
    }
}

export default ConsultationRoom;
