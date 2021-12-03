import {i18n} from 'consult-app-common';
import Alert from "./Alert";

class Conference {
    totalClients;
    clientCompleted;
    nextClient;
    nextClientIn;

    static hasMoreClients(conference) {
        return conference.totalClients - conference.clientCompleted > 0;
    }

    static getAlert(conference) {
        if (this.hasMoreClients(conference))
            return Alert.info(i18n.t("conference-client-next", {client: conference.nextClient, duration: conference.nextClientIn}));
        else if (!this.hasMoreClients(conference) && conference.totalClients > 0)
            return Alert.success(i18n.t("conference-all-clients-completed", {numberOfClients: conference.totalClients}));
        else
            return Alert.success(i18n.t("conference-no-client"));
    }
}

export default Conference;
