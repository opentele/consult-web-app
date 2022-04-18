import _ from "lodash";

class AbstractEntity {
    id;
    createdBy;
    lastModifiedBy;

    modifiedBySomeoneElse() {
        return this.lastModifiedBy !== this.createdBy;
    }
}

export default AbstractEntity;
