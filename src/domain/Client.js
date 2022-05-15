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
    consultationSessionRecords;
    otherDetails;

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

        const {years, months} = DateTimeUtil.parsePeriod(resource.age);
        if (!_.isEmpty(years) && parseInt(years) > 0) {
            client.age = years;
            client.ageDurationType = DateTimeUtil.Years;
        }
        else if (!_.isEmpty(months) && parseInt(months) > 0) {
            client.age = months;
            client.ageDurationType = DateTimeUtil.Months;
        } else {
            client.age = "";
            client.ageDurationType = DateTimeUtil.Months;
        }
        client.consultationSessionRecords = resource.consultationSessionRecords.map((csr) => ConsultationSessionRecord.fromServerResource(csr));
        return client;
    }

    static displayName(client) {
        return `${client.name}; ${DateTimeUtil.getAgeDisplay(client.age)}; ${client.gender}`;
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
