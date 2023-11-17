import _ from "lodash";
import moment from "moment";

class FormRecordGroupsByDate {
    static getRecentFormRecordId(formRecordGroups) {
        const recentDate = _.last(_.sortBy(Object.keys(formRecordGroups), (x) => moment(x)));
        return formRecordGroups[recentDate].formRecordId;
    }
}

export default FormRecordGroupsByDate;
