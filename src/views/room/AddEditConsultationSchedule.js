import BaseView from "../framework/BaseView";
import {Box} from "@material-ui/core";
import RRuleGenerator from 'react-rrule-generator';

class AddEditConsultationSchedule extends BaseView {
    constructor(props) {
        super(props);
    }

    render() {
        return <Box>
            <RRuleGenerator
                onChange={() => {}}
                value={"DTSTART:20190301T230000Z\nFREQ=YEARLY;BYMONTH=1;BYMONTHDAY=3"}
            />
        </Box>;
    }
}

export default AddEditConsultationSchedule;
