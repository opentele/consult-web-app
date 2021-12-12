export default class Client {
    name;
    age;
    gender;
    registrationNumber;
    consultations;
    otherDetails;

    static getAgeDisplay(age) {
        const ageInYears = Math.floor(age);
        const months = (age - ageInYears) * 12;
        if (ageInYears === 0)
            return `${months} months`
        return `${ageInYears} years, ${months} months`;
    }

    static displayName(client) {
        return `${client.name} | ${this.getAgeDisplay(client.age)} | ${client.gender}`;
    }

    static totalConsultationsDisplay(client) {
        if (client.consultations.length > 1)
            return `${client.consultations.length} consultations`;
        return `One consultation`;
    }
}
