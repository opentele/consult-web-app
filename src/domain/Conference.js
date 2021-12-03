import {i18n} from 'consult-app-common';
import Alert from "./Alert";

class Conference {
    totalClients;
    clientCompleted;
    nextClient;
    nextClientIn;
    queueSpareCapacity;

    static hasMoreClients(conference) {
        return conference.totalClients - conference.clientCompleted > 0;
    }

    static hasVacancy(conference) {
        return conference.queueSpareCapacity > 0;
    }

    static getAlerts(conference) {
        const alerts = [];
        if (this.hasMoreClients(conference))
            alerts.push(Alert.info(i18n.t("conference-client-next", {client: conference.nextClient, duration: conference.nextClientIn})));
        else if (!this.hasMoreClients(conference) && conference.totalClients > 0)
            alerts.push(Alert.success(i18n.t("conference-all-clients-completed", {numberOfClients: conference.totalClients})));
        else
            alerts.push(Alert.info(i18n.t("conference-no-client")));

        if (!this.hasVacancy(conference))
            alerts.push(Alert.error(i18n.t("conference-no-vacancy")));

        return alerts;
    }

    static getActions(conference) {
        const actions = [];
        if (this.hasVacancy(conference))
            actions.push(i18n.t('add-client'));
        if (conference.totalClients > 0) {
            actions.push(i18n.t('view-my-clients'));
            actions.push(i18n.t('join-conference'));
        }
        return actions;
    }
}

export default Conference;
