import _ from "lodash";
import ActiveConferences from "../testdata/active-conferences.json";
import Queue from "../testdata/queue.json";

class ConsultationServiceStub {
    getActiveRooms() {
        return Promise.resolve(ActiveConferences);
    }

    getQueue(conferenceId) {
        return Promise.resolve(Queue);
    }
}

export default new ConsultationServiceStub();
