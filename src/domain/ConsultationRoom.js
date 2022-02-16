import _ from "lodash";

class ConsultationRoom {
    title;
    scheduledStartTime;
    scheduledEndTime;
    scheduledOn;

    constructor() {
        this.days = [];
    }

    static toggleDay(room, day) {
        if (room.days.includes(day))
            _.remove(room.days, (x) => x === day);
        else
            room.days.push(day);
    }
}

export default ConsultationRoom;
