export default class Consultation {
    date;
    by;

    static getSummary(consultation) {
        return `${consultation.date} by ${consultation.by}`;
    }
}
