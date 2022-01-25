import React from 'react';

import About from "../../views/Login";
import {MemoryRouter} from "react-router-dom";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Access / Login',
    component: About,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <MemoryRouter><About {...args} /></MemoryRouter>;

export const LoginByUserId = Template.bind({});
LoginByUserId.args = {
    injectedState: {
        userId: "petmongrels@gmail.com",
        password: "password"
    }
};

export const InvalidUserId = Template.bind({});
InvalidUserId.args = {
    injectedState: {
        userId: "petmongrels",
        password: "password"
    }
};

export const IncorrectLogin = Template.bind({});
IncorrectLogin.args = {
    injectedState: {
        userId: "petmongrels@gmail.com",
        password: "notAPassword"
    }
};
