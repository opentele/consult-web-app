import React from 'react';

import UserRegister from "../../views/UserRegister";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Access',
    component: UserRegister,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <UserRegister {...args} />;

export const RegisterUser = Template.bind({});

RegisterUser.args = {
    defaultName: "Sachin Kadam",
    defaultEmail: "sachink@gmail.com",
    defaultCountryCode: "91",
    defaultMobile: "8080808080"
};
