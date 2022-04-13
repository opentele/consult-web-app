import RegisterState from "./RegisterState";

test('isOrgValid', function () {
    expect(RegisterState.newInstance().isOrgValid()).toBe(true);
});
