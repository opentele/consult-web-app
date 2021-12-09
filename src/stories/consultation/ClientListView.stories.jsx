import React from 'react';
import ClientListView from "../../views/consultation/ClientListView";
import Clients from '../testdata/clients.json';

export default {
    title: 'Consultant and Remote Usher / Client List View',
    component: ClientListView,
};

const Template = (args) => <ClientListView {...args} />;
export const ClientListViewT = Template.bind({});

ClientListViewT.args = {
    clients: Clients
};
