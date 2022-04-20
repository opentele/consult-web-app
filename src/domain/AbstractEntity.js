import _ from "lodash";
import moment from "moment";

class AbstractEntity {
    id;
    createdBy;
    lastModifiedBy;
    createdOn;
    updatedOn;

    modifiedBySomeoneElse() {
        return this.lastModifiedBy !== this.createdBy;
    }

    isNew() {
        return _.isNil(this.id) || this.id === 0;
    }

    static getCreatedOn(record) {
        return this.getDate(record.createdOn);
    }

    static getDate(date) {
        return moment(date, moment.ISO_8601).format("YYYY-MM-DD HH:mm");
    }

    populateAuditDates(resource) {
        this.updatedOn = AbstractEntity.getDate(resource.updatedOn);
        this.createdOn = AbstractEntity.getDate(resource.createdOn);
    }
}

export default AbstractEntity;
