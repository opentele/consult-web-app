export default class Client {
    name;
    age;
    gender;
    consultations;

    static getAgeDisplay(age) {
        const ageInYears = Math.floor(age);
        const months = (age - ageInYears) * 1.2;
        if (ageInYears === 0)
            return `${months} months`
        return `${ageInYears} years, ${months} months`;
    }

    static displayName(client) {
        return `${client.name} | ${this.getAgeDisplay(client.age)} | ${client.gender}`;
    }
}
