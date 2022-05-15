import _ from "lodash";
import {AbstractEntity} from "consult-app-common";

class Appointment extends AbstractEntity {
    queueNumber;
    clientId;
    clientName;
    current;

    static fromResources(resources) {
        if (_.isNil(resources)) return [];
        return resources.map(Appointment.fromResource);
    }

    static fromResource(resource) {
        const appointment = AbstractEntity.fromOther(resource, new Appointment());
        return AbstractEntity.copyFields(resource, appointment, ["queueNumber", "clientId", "clientName", "current"]);
    }
}

export default Appointment;
