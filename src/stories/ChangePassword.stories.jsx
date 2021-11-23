import React from 'react';

import ChangePassword from "../views/ChangePassword";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Access',
    component: ChangePassword
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <ChangePassword {...args} />;

export const ChangePasswordStory = Template.bind({});
ChangePasswordStory.args = {
    defaultCurrentPassword: "password",
    currentPasswordRequired: true,
    defaultPassword: "new-password",
    userId: "sachink@example.com"
};
