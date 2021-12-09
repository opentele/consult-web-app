export default class Consultation {
    date;
    by;

    static getSummary(consultation) {
        return `On ${consultation.date} by ${consultation.by}`;
    }
}
