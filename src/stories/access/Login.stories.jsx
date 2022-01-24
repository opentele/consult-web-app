import React from 'react';

import About from "../../views/Login";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Access / Login',
    component: About,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <About {...args} />;

export const LoginByEmailAndOtp = Template.bind({});
LoginByEmailAndOtp.args = {
    defaultEmail: "sachink@gmail.com",
};

export const LoginByEmailAndPassword = Template.bind({});
LoginByEmailAndPassword.args = {
    defaultEmail: "sachink@gmail.com",
    defaultPassword: "password"
};

export const LoginByMobileAndOtp = Template.bind({});
LoginByMobileAndOtp.args = {
    defaultCountryCode: "+91",
    defaultMobile: "9090909090",
    loginBy: "mobile"
};

export const LoginByMobileAndPassword = Template.bind({});
LoginByMobileAndPassword.args = {
    defaultCountryCode: "+91",
    defaultMobile: "9090909090",
    defaultPassword: "password",
    loginBy: "mobile"
};
