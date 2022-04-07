import React from 'react';

import About from "../../views/RegisterUser";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Access / Register User',
    component: About,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <About {...args} />;

export const RegisterUser = Template.bind({});

RegisterUser.args = {
    defaultName: "Sachin Kadam",
    defaultEmail: "sachink@gmail.com",
    defaultCountryCode: "91",
    defaultMobile: "8080808080"
};
