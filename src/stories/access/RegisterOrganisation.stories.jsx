import React from 'react';

import About from '../../views/RegisterOrganisation';
import { MemoryRouter } from 'react-router-dom'

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Access / Register Organisation',
    component: About,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <MemoryRouter><About {...args} /></MemoryRouter>;

export const RegisterOrganisation = Template.bind({});
RegisterOrganisation.args = {
    injectedState: {
        name: "Vivek Singh",
        orgName: "Samanvay",
        userId: "petmongrels@gmail.com",
        password: "password",
        confirmPassword: "password",
    }
};

export const PasswordMismatch = Template.bind({});
PasswordMismatch.args = {
    injectedState: {
        name: "Vivek Singh",
        orgName: "Samanvay",
        userId: "petmongrels@gmail.com",
        password: "password1",
        confirmPassword: "password2"
    }
};
