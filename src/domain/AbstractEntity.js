import _ from "lodash";

class AbstractEntity {
    id;
    createdBy;
    lastModifiedBy;

    modifiedBySomeoneElse() {
        return this.lastModifiedBy !== this.createdBy;
    }

    isNew() {
        return _.isNil(this.id) || this.id === 0;
    }
}

export default AbstractEntity;
