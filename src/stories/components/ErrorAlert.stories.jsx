import React from 'react';

import {MemoryRouter} from "react-router-dom";
import About from "../../components/ErrorAlert";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Components / Error Alert',
    component: About,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <MemoryRouter><About {...args} /></MemoryRouter>;

export const ErrorAlert = Template.bind({});
ErrorAlert.args = {
    title: "Server Error",
    message: "Internal Server Error"
};
