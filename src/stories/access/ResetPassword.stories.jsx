import React from 'react';

import About from "../../views/ResetPassword";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Access / ResetPassword',
    component: About,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <About {...args} />;

export const ResetEmailPassword = Template.bind({});
ResetEmailPassword.args = {
    defaultUserId: "sachink@gmail.com",
    userIdType: "email"
};

export const ResetMobilePassword = Template.bind({});
ResetMobilePassword.args = {
    defaultUserId: "9090909090",
    userIdType: "mobile"
};
