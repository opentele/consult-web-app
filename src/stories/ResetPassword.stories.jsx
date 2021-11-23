import React from 'react';

import ResetPassword from "../views/ResetPassword";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Access / ResetPassword',
    component: ResetPassword,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <ResetPassword {...args} />;

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
