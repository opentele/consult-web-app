import RegisterState from "./RegisterState";

test('isOrgValid', function () {
    expect(RegisterState.newInstance().isOrgValid()).toBe(true);

    const validOrg = RegisterState.newInstance();
    validOrg.orgName = "XYZ";
    validOrg.submissionAttempted = true;
    expect(validOrg.isOrgValid()).toBe(true);

    const emptyOrg = RegisterState.newInstance();
    emptyOrg.orgName = "";
    emptyOrg.submissionAttempted = true;
    expect(emptyOrg.isOrgValid()).toBe(false);

    const emptyOrgNoSubmission = RegisterState.newInstance();
    emptyOrgNoSubmission.orgName = "";
    emptyOrgNoSubmission.submissionAttempted = false;
    expect(emptyOrgNoSubmission.isOrgValid()).toBe(true);

    const longOrgName = RegisterState.newInstance();
    longOrgName.submissionAttempted = true;
    longOrgName.orgName = "dsfsdfdsfdsdsdjfjdsfjdskfjdsklfjdsjfdfjddsfsdfdsfdsdsdjfjdsfjdskfjdsklfjdsjfdfjddsfsdfdsfdsdsdjfjdsfjdskfjdsklfjdsjfdfjddsfsdfdsfdsdsdjfjdsfjdskfjdsklfjdsjfdfjddsfsdfdsfdsdsdjfjdsfjdskfjdsklfjdsjfdfjddsfsdfdsfdsdsdjfjdsfjdskfjdsklfjdsjfdfjddsfsdfdsfdsdsdjfjdsfjdskfjdsklfjdsjfdfjddsfsdfdsfdsdsdjfjdsfjdskfjdsklfjdsjfdfjddsfsdfdsfdsdsdjfjdsfjdskfjdsklfjdsjfdfjddsfsdfdsfdsdsdjfjdsfjdskfjdsklfjdsjfdfjddsfsdfdsfdsdsdjfjdsfjdskfjdsklfjdsjfdfjd";
    expect(longOrgName.isOrgValid()).toBe(false);
});
