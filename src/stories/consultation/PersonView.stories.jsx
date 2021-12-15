import React from 'react';
import About from "../../views/consultation/PersonView";

export default {
    title: 'Consultant and Remote Usher / Client Registration',
    component: About
};

const Template = (args) => <About {...args} />;
export const ClientRegistration = Template.bind({});

ClientRegistration.args = {
};
