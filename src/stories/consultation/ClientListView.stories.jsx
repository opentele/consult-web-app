import React from 'react';
import About from "../../views/consultation/ClientListView";
import Clients from '../testdata/clients.json';

export default {
    title: 'Consultant and Remote Usher / Client List',
    component: About,
};

const Template = (args) => <About {...args} />;
export const ClientList = Template.bind({});

ClientList.args = {
    clients: Clients
};
