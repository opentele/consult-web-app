import React from 'react';
import ClientRecord from '../testdata/client-record.json';
import About from "../../views/consultation/ClientDashboard";

export default {
    title: 'Consultant and Remote Usher / Client Dashboard',
    component: About,
};

const Template = (args) => <About {...args} />;
export const ClientDashboard = Template.bind({});

ClientDashboard.args = {
    clientRecord: ClientRecord
};
