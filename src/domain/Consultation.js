export default class Consultation {
    dateOfConsultation;
    by;
    complaints;
    observations;
    keyInference;
    recommendations;
    followUpIn;

    static getSummary(consultation) {
        return `${consultation.dateOfConsultation} by ${consultation.by}`;
    }
}
