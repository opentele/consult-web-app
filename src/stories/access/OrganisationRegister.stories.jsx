import React from 'react';

import About from '../../views/OrganisationRegister';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Access / Organisation Register',
    component: About,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <About {...args} />;

export const RegisterOrganisation = Template.bind({});

RegisterOrganisation.args = {
    defaultName: "Vivek Singh",
    defaultOrgName: "Samanvay",
    defaultEmail: "petmongrels@gmail.com",
    defaultPassword: "password",
    defaultCountryCode: "91",
    defaultMobile: "9090909090"
};
