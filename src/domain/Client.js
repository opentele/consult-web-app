import {DateTimeUtil} from "react-app-common";
import ConsultationSessionRecord from "./ConsultationSessionRecord";
import _ from 'lodash';
import moment from "moment";
import {AbstractEntity} from "consult-app-common";

export default class Client extends AbstractEntity {
    name;
    age;
    ageDurationType;
    gender;
    registrationNumber;
    otherDetails;
    consultationSessionRecords;
    numberOfSessions;

    static newInstance() {
        let client = new Client();
        client.ageDurationType = DateTimeUtil.Years;
        client.gender = "Female";
        return client;
    }

    static fromServerResources(resources) {
        return resources.map(Client.fromServerResource);
    }

    static fromServerResource(resource) {
        const client = new Client();
        AbstractEntity.fromOther(resource, client);
        AbstractEntity.copyFields(resource, client, ["name", "gender", "registrationNumber", "otherDetails"]);

        const {age, ageDurationType} = DateTimeUtil.periodAsAge(resource.age);
        client.age = age;
        client.ageDurationType = ageDurationType;
        client.numberOfSessions = resource.numberOfSessions;

        if (!_.isNil(resource.consultationSessionRecords))
            client.consultationSessionRecords = resource.consultationSessionRecords.map((csr) => ConsultationSessionRecord.fromServerResource(csr));
        return client;
    }

    getDisplayName(i18n) {
        return `${this.name}; ${this.displayAge(i18n)}; ${i18n.t(this.gender)}`;
    }

    static displayNameFromServerResource(client) {
        return `${client.name}; ${DateTimeUtil.getAgeDisplay(client.age)}; ${client.gender}`;
    }

    displayAge(i18n) {
        return `${this.age} ${i18n.t(this.ageDurationType)}`;
    }

    static totalConsultationsDisplay(client) {
        if (client.consultationSessionRecords.length > 1)
            return `${client.consultationSessionRecords.length} consultations`;
        return `One consultation`;
    }

    clone() {
        const client = new Client();
        Object.assign(client, this);
        return client;
    }

    getCurrentSessionRecord(consultationRoom) {
        return _.find(this.consultationSessionRecords, (x) => x.consultationRoomId === consultationRoom.id);
    }

    getCurrentSessionRecordId(consultationRoom) {
        const currentSessionRecord = this.getCurrentSessionRecord(consultationRoom);
        return _.isNil(currentSessionRecord) ? null : currentSessionRecord.id;
    }

    getConsultationSessionRecordsInOrder() {
        return _.orderBy(this.consultationSessionRecords, (x) => moment(x.createdOn, moment.ISO_8601), ["desc"]);
    }
}
