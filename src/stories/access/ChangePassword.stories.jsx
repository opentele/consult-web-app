import React from 'react';

import About from "../../views/ChangePassword";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Access / Change Password',
    component: About
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <About {...args} />;

export const ChangePassword = Template.bind({});
ChangePassword.args = {
    defaultCurrentPassword: "password",
    currentPasswordRequired: true,
    defaultPassword: "new-password",
    userId: "sachink@example.com"
};
